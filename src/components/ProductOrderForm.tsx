import config from "../config.ts";
import { useContext } from "react";
import AppContext from "../context/AppContext";

export const ProductOrderForm = () => {
  const { selectedProduct, fetchProduct } = useContext(AppContext) ?? {
    selectedProduct: null,
    fetchProduct: () => {},
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
      <button onClick={handleAddToCart}>Add to Cart</button>
      <strong>
        {selectedProduct?.stock_status === "instock"
          ? "In stock"
          : "Out of stock"}
      </strong>
    </>
  );
};
