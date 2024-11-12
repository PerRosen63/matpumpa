// import config from "../config.ts";
import { useContext, useEffect, useState } from "react";
import AppContext /* , { CartItem } */ from "../context/AppContext";
import { AmountSelector } from "./AmountSelector";
import { TopLevel } from "../models/IProduct";

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
    selectedQuantity >
      getAvailableStock(selectedProduct?.id || 0, selectedVariationId);

  return (
    <>
      {variations.length > 0 && (
        <div>
          <select
            className="bg-green-custom"
            value={selectedVariationId ?? ""}
            onChange={handleVariationChange}
          >
            <option value="">Välj pumpa:</option>
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
            Pris:{" "}
            {selectedVariationId !== undefined &&
              variations.find((v) => v.id === selectedVariationId)?.price +
                `:-`}
          </p>

          <strong>
            {selectedProduct?.stock_status === "instock"
              ? "I lager"
              : "Slut i lager"}
          </strong>
        </div>
      )}

      <div>
        <strong>
          {!variations.length &&
            (selectedProduct?.stock_status === "instock"
              ? // ? selectedProduct?.stock_quantity + " i lager"
                getAvailableStock(selectedProduct.id) + " i lager"
              : "Slut i lager")}
        </strong>
        <div>
          Välj antal:
          <AmountSelector
            /* maxQuantity={
              selectedVariationId
                ? variations.find((v) => v.id === selectedVariationId)
                    ?.stock_quantity || 0
                : selectedProduct?.stock_quantity || 0
            } */
            maxQuantity={getAvailableStock(
              selectedProduct?.id || 0,
              selectedVariationId
            )}
            onQuantityChange={(newQuantity) => {
              // Here you can update the quantity in your cart or state
              setSelectedQuantity(newQuantity);
              // console.log("New quantity:", newQuantity);
            }}
          />
        </div>
        <button
          disabled={isAddToCartDisabled}
          className="bg-yellow-custom text-black p-5 m-5"
          onClick={() => handleAddToCart(selectedQuantity)}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};
