// import config from "../config.ts";
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

  const [showAddedMessage, setShowAddedMessage] = useState(false); // New state

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
    // console.log("handleAddToCart called!");
    if (!selectedProduct) return;

    if (variations.length > 0 && selectedVariationId !== undefined) {
      addToCart(selectedProduct, selectedVariationId, selectedQuantity);
      // console.log("selected quantity variations", selectedQuantity);
    } else {
      addToCart(selectedProduct, undefined, selectedQuantity);
      // console.log("selected quantity simple", selectedQuantity);
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
    // console.log("Calculating available stock for:", productId, variationId); // Debug log

    const baseStock = variationId
      ? variations.find((v) => v.id === variationId)?.stock_quantity || 0
      : selectedProduct?.stock_quantity || 0;

    // console.log("Base stock:", baseStock); // Debug log

    if (!preliminaryCart) {
      // console.log("Preliminary cart is undefined, returning base stock"); // Debug log

      return baseStock; // Undefined
    }

    const reservedQuantity = preliminaryCart.reduce((total, item) => {
      if (item.product.id === productId && item.variationId === variationId) {
        return total + item.quantity;
      }
      return total;
    }, 0);

    // console.log("Reserved quantity:", reservedQuantity); // Debug log

    const availableStock = Math.max(baseStock - reservedQuantity, 0);
    // console.log("Available stock:", availableStock); // Debug log
    return availableStock;
  };

  useEffect(() => {
    // console.log("preliminaryCart-useEffect", preliminaryCart);
  }, [preliminaryCart, selectedProduct]);

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
                      )}
                      )
                    </span>
                  </option>
                )
            )}
          </select>

          <p>
            {selectedVariationId !== undefined &&
            variations.find((v) => v.id === selectedVariationId) ? ( // Check if a variation is found
              `Pris: ${
                variations.find((v) => v.id === selectedVariationId)?.price
              }:-`
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
        <strong>
          {!variations.length &&
            (selectedProduct?.stock_status === "instock"
              ? getAvailableStock(selectedProduct.id) + " i lager"
              : "Slut i lager")}
        </strong>
        <div>
          <span className="block mb-2">
            {!variations.length &&
              (selectedProduct?.stock_status === "instock"
                ? getAvailableStock(selectedProduct.id) + "Välj antal:"
                : "")}
          </span>
          <AmountSelector
            maxQuantity={getAvailableStock(
              selectedProduct?.id || 0,
              selectedVariationId
            )}
            onQuantityChange={(newQuantity) => {
              setSelectedQuantity(newQuantity);
              // console.log("New quantity:", newQuantity);
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
