import { useContext } from "react";
import AppContext from "../context/AppContext";
import config from "../config.ts";

export const ProductPresentation = () => {
  const { selectedProduct, loading, fetchProduct } = useContext(AppContext) ?? {
    selectedProduct: null,
    loading: true,
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

  return loading ? (
    <div className="loaderText">
      <h2>Just a moment. Fetching product details...</h2>{" "}
    </div>
  ) : selectedProduct ? (
    <div className="product-presentation">
      <h2>{selectedProduct.name}</h2>
      <h4>Original Price: {selectedProduct.regular_price}</h4>
      <h4>Stock: {selectedProduct.stock_quantity}</h4>
      <img
        width="300"
        src={selectedProduct.images[0].src}
        alt="Product banner"
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
      <strong>
        {selectedProduct.stock_status === "instock"
          ? "In stock"
          : "Out of stock"}
      </strong>
    </div>
  ) : (
    <div>Product not found</div>
  );
};
