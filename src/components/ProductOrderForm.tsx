import { useContext, useEffect, useState } from "react";
import AppContext /* , { CartItem } */ from "../context/AppContext";
import { AmountSelector } from "./AmountSelector";
import { TopLevel } from "../models/IProduct";
import { Button } from "@/style_components/Button";

export const ProductOrderForm = () => {
  const { selectedProduct, productVariations, preliminaryCart } = useContext(
    AppContext
  ) ?? {
    selectedProduct: null,
    loading: true,
    productVariations: {},
  };

  const {
    addToCart,
  }: {
    addToCart: (
      product: TopLevel,
      variationId: number | undefined,
      quantity?: number
    ) => void;
  } = useContext(AppContext) ?? { addToCart: () => {} };

  const [selectedVariationId, setSelectedVariationId] = useState<
    number | undefined
  >(undefined);

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const variations = selectedProduct
    ? productVariations[selectedProduct.id] || []
    : [];

  const handleVariationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedVariationId(parseInt(event.target.value, 10));
    setSelectedQuantity(1);
  };

  const handleAddToCart = async (selectedQuantity: number) => {
    if (!selectedProduct) return;

    if (variations.length > 0 && selectedVariationId !== undefined) {
      addToCart(selectedProduct, selectedVariationId, selectedQuantity);
    } else {
      addToCart(selectedProduct, undefined, selectedQuantity);
    }

    setSelectedQuantity(1);

    // Show the message Lagd i varukorg:
    setShowAddedMessage(true);

    // Hide the message after a delay (e.g., 3 seconds):
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 3000);
  };

  const getAvailableStock = (
    productId: number,
    variationId?: number
  ): number => {
    const baseStock = variationId
      ? variations.find((v) => v.id === variationId)?.stock_quantity || 0
      : selectedProduct?.stock_quantity || 0;

    if (!preliminaryCart) {
      return baseStock; // Preliminary cart is undefined, returning base stock
    }

    const reservedQuantity = preliminaryCart.reduce((total, item) => {
      if (item.product.id === productId && item.variationId === variationId) {
        return total + item.quantity;
      }
      return total;
    }, 0);

    const availableStock = Math.max(baseStock - reservedQuantity, 0);
    return availableStock;
  };

  useEffect(() => {}, [preliminaryCart, selectedProduct]);

  const isAddToCartDisabled =
    (variations.length > 0 && selectedVariationId === undefined) ||
    selectedQuantity === 0 ||
    selectedQuantity >
      getAvailableStock(selectedProduct?.id || 0, selectedVariationId);

  return (
    <>
      {variations.length > 0 && (
        <div className="max-lg:text-center">
          <label
            htmlFor="pumpor"
            className={
              selectedProduct?.stock_status !== "instock"
                ? "opacity-40 block"
                : "block"
            }
          >
            Välj vikt!
          </label>
          <select
            className="mb-2 p-2 bg-yellow-custom text-green-custom border-double border-7 border-orange-custom rounded-xl"
            value={selectedVariationId ?? ""}
            onChange={handleVariationChange}
            id="pumpor"
            disabled={selectedProduct?.stock_status !== "instock"}
          >
            <option className="" value="">
              Välj pumpa:
            </option>
            {variations.map(
              (variation) =>
                variation.stock_quantity > 0 &&
                getAvailableStock(selectedProduct?.id || 0, variation.id) >
                  0 && (
                  <option key={variation.id} value={variation.id}>
                    {variation.attributes?.map((attr) => `${attr.option} kg`)}{" "}
                    <span>
                      (
                      {getAvailableStock(
                        selectedProduct?.id || 0,
                        variation.id
                      )}{" "}
                      st i lager)
                    </span>
                  </option>
                )
            )}
          </select>

          <p>
            {/* Conditionally render price only if available stock > 0: */}
            {selectedVariationId !== undefined &&
            variations.find((v) => v.id === selectedVariationId) &&
            getAvailableStock(selectedProduct?.id || 0, selectedVariationId) >
              0 ? (
              `Pris: ${
                variations.find((v) => v.id === selectedVariationId)?.price
              }:-/st`
            ) : (
              <p>&nbsp;</p>
            )}
          </p>

          <strong>
            {selectedProduct?.stock_status === "instock"
              ? "I lager"
              : "Slut i lager"}
          </strong>
        </div>
      )}

      <div className="max-lg:text-center">
        {/*Simple product price & stock*/}
        <p>
          {!variations.length && selectedProduct?.stock_status === "instock" ? (
            `Pris: ${selectedProduct.price}:-`
          ) : (
            <p>&nbsp;</p>
          )}
        </p>
        <strong>
          {!variations.length &&
            (selectedProduct?.stock_status === "instock"
              ? getAvailableStock(selectedProduct.id) + " st i lager"
              : "Slut i lager")}
        </strong>

        <div>
          <span className="block mb-2">
            {selectedProduct?.stock_status === "instock" ? "Välj antal:" : ""}
          </span>
          <AmountSelector
            maxQuantity={getAvailableStock(
              selectedProduct?.id || 0,
              selectedVariationId
            )}
            onQuantityChange={(newQuantity) => {
              setSelectedQuantity(newQuantity);
            }}
          />
        </div>
        <Button
          disabled={isAddToCartDisabled}
          className="mt-5"
          onClick={() => handleAddToCart(selectedQuantity)}
        >
          Lägg i varukorg
        </Button>

        <div className="max-lg:mt-3 lg:relative">
          {showAddedMessage && (
            <div className="lg:absolute top-3">Lagd i varukorg!</div>
          )}
        </div>
      </div>
    </>
  );
};
