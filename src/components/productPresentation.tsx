import { useContext } from "react";
import AppContext from "../context/AppContext";
import { ProductOrderForm } from "./ProductOrderForm";

export const ProductPresentation = () => {
  const { selectedProduct, loading } = useContext(AppContext) ?? {
    selectedProduct: null,
    loading: true,
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
      <ProductOrderForm></ProductOrderForm>
    </div>
  ) : (
    <div>Product not found</div>
  );
};
