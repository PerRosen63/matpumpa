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
    <section className="flex">
      <article>
        <img
          width="300"
          src={selectedProduct.images[0].src}
          alt="Product banner"
        />
      </article>
      <article>
        <h4>Pris: {selectedProduct.regular_price}:-</h4>
        <h4>Stock: {selectedProduct.stock_quantity}</h4>

        <ProductOrderForm></ProductOrderForm>
      </article>
    </section>
  ) : (
    <div>Product not found</div>
  );
};
