// import config from "../config.ts";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

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
    updateProductStock: () => {},
    updateVariationStock: () => {},
  };

  const [selectedVariationId, setSelectedVariationId] = useState<
    number | undefined
  >(undefined);

  const variations = selectedProduct
    ? productVariations[selectedProduct.id] || []
    : [];

  const handleVariationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedVariationId(parseInt(event.target.value, 10));
  };

  const { addToCart } = useContext(AppContext) ?? {
    addToCart: () => {},
  };

  const handleAddToCart = async () => {
    if (!selectedProduct) return;

    if (variations.length > 0 && selectedVariationId !== undefined) {
      addToCart(selectedProduct, selectedVariationId);
    } else {
      addToCart(selectedProduct, undefined);
    }

    /* if (!selectedVariationId) return;

      const selectedVariation = variations.find(
        (v) => v.id === selectedVariationId
      );

      if (!selectedVariation) return;

       const newStockQuantity = selectedVariation.stock_quantity
        ? selectedVariation.stock_quantity - 1
        : 0; // Or handle out-of-stock case differently

      try {
        const response = await fetch(
          `${config.baseUrl}/${selectedProduct.id}/variations/${selectedVariationId}?consumer_key=${config.consumerKey}&consumer_secret=${config.consumerSecret}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              stock_quantity: newStockQuantity,
            }),
          }
        );
        if (response.ok) {
          updateVariationStock(
            selectedProduct.id,
            selectedVariationId,
            newStockQuantity
          );
          console.log("Variation stock updated!");
        } else {
          console.error("Failed variation stock update!");
        }
      } catch (error) {
        console.error("Error updating variation stock quantity:", error);
      }
    } else {
      const newStockQuantity = selectedProduct.stock_quantity
        ? selectedProduct.stock_quantity - 1
        : 0;

      try {
        const response = await fetch(
          `${config.baseUrl}/${selectedProduct.id}?consumer_key=${config.consumerKey}&consumer_secret=${config.consumerSecret}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              stock_quantity: newStockQuantity,
            }),
          }
        );
        if (response.ok) {
          updateProductStock(selectedProduct.id, newStockQuantity);
          console.log("Simple product stock updated!");
        } else {
          console.error("Failed to update simple product stock!");
        }
      } catch (error) {
        console.error("Error updating simple product stock quantity:", error);
      } */
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

        <button
          className="bg-yellow-custom text-black p-5 m-5"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};
