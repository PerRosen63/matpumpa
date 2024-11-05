// import config from "../config.ts";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { AmountSelector } from "./AmountSelector";
import { TopLevel } from "../models/IProduct";

export const ProductOrderForm = () => {
  const {
    selectedProduct,
    productVariations,
    /* updateProductStock,
    updateVariationStock, */
  } = useContext(AppContext) ?? {
    selectedProduct: null,
    loading: true,
    productVariations: {},
    /* updateProductStock: () => {},
    updateVariationStock: () => {}, */
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
  };

  const handleAddToCart = async (selectedQuantity: number) => {
    if (!selectedProduct) return;

    if (variations.length > 0 && selectedVariationId !== undefined) {
      addToCart(selectedProduct, selectedVariationId, selectedQuantity);
      console.log("selected quantity variations", selectedQuantity);
    } else {
      addToCart(selectedProduct, undefined, selectedQuantity);
      console.log("selected quantity simple", selectedQuantity);
    }
  };

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
                variation.stock_quantity > 0 && (
                  <option key={variation.id} value={variation.id}>
                    {variation.attributes?.map((attr) => `${attr.option} kg`)}{" "}
                    <span>({variation.stock_quantity})</span>
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
              ? selectedProduct?.stock_quantity + " i lager"
              : "Slut i lager")}
        </strong>

        <div>
          Välj antal:
          {/* <div className="flex flex-row gap-2">
            <button className="bg-yellow-custom text-black p-2">-</button>
            <span className="p-2">1</span>
            <button className="bg-yellow-custom text-black p-2">+</button>
          </div> */}
          <AmountSelector
            maxQuantity={
              selectedVariationId
                ? variations.find((v) => v.id === selectedVariationId)
                    ?.stock_quantity || 0
                : selectedProduct?.stock_quantity || 0
            }
            onQuantityChange={(newQuantity) => {
              // Here you can update the quantity in your cart or state
              setSelectedQuantity(newQuantity);
              console.log("New quantity:", newQuantity);
            }}
          />
        </div>

        <button
          disabled={variations.length > 0 && selectedVariationId === undefined}
          className="bg-yellow-custom text-black p-5 m-5"
          onClick={() => handleAddToCart(selectedQuantity)}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};
