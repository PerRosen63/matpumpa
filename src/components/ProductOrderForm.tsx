import config from "../config.ts";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

export const ProductOrderForm = () => {
  const { selectedProduct, fetchProduct, productVariations } = useContext(
    AppContext
  ) ?? {
    selectedProduct: null,
    fetchProduct: () => {},
    productVariations: {},
  };

  const [selectedVariationId, setSelectedVariationId] = useState<number | null>(
    null
  );

  const variations = selectedProduct
    ? productVariations[selectedProduct.id]
    : [];

  const handleVariationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedVariationId(parseInt(event.target.value, 10));
  };

  const handleAddToCart = async () => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(
        `${config.baseUrl}/${selectedProduct.id}?consumer_key=${config.consumerKey}&consumer_secret=${config.consumerSecret}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stock_quantity: selectedProduct.stock_quantity
              ? selectedProduct.stock_quantity - 1
              : null,
          }),
        }
      );
      if (response.ok) {
        fetchProduct(selectedProduct.id);
        console.log("Stock updated!");
      } else {
        console.error("Failed stock update!");
      }
    } catch (error) {
      console.error("Error updating stock quantity:", error);
    }
  };

  return (
    <>
      <div>
        <select
          value={selectedVariationId || ""}
          onChange={handleVariationChange}
        >
          <option value="">Välj pumpa:</option>
          {variations.map((variation) => (
            <option key={variation.id} value={variation.id}>
              {variation.attributes.map(
                (attr) => `${attr.name}: ${attr.option}`
              )}
            </option>
          ))}
        </select>
      </div>
      <div>
        {selectedProduct && (
          <>
            <p className="font-bold">Pris: {selectedProduct.regular_price}:-</p>
            <p className="font-bold">Stock: {selectedProduct.stock_quantity}</p>
          </>
        )}
        <button onClick={handleAddToCart}>Add to Cart</button>
        <strong>
          {selectedProduct?.stock_status === "instock"
            ? "I lager"
            : "Slut i lager"}
        </strong>
      </div>
    </>
  );
};
