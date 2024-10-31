import { useContext } from "react";
import AppContext from "../context/AppContext";
import { ProductOrderForm } from "./ProductOrderForm";
import parse from "html-react-parser";

export const ProductPresentation = () => {
  const { selectedProduct, loading, wordpressImages } = useContext(
    AppContext
  ) ?? {
    selectedProduct: null,
    loading: true,
    wordpressImages: [],
  };

  return loading ? (
    <div className="loaderText">
      <h2>Just a moment. Fetching product details...</h2>{" "}
    </div>
  ) : selectedProduct ? (
    <section className="flex">
      <article>
        {selectedProduct?.images.map((image, index) => {
          const wpImage = wordpressImages.find(
            (wpImg) => wpImg.id === image.id
          );
          /* if (!wpImage) {
            return null; // or a placeholder image
          } */
          if (wpImage && wpImage.media_details.sizes.medium) {
            return (
              <img
                key={index}
                width="300"
                src={wpImage.media_details.sizes.medium.source_url}
                alt="Product banner"
              />
            );
          } else {
            // Handle the case where wpImage or medium size is not found
            return null; // Or display a placeholder image
          }
        })}
      </article>
      <article>
        <p>{parse(selectedProduct.description)}</p>
        <h4>Pris: {selectedProduct.regular_price}:-</h4>
        <h4>Stock: {selectedProduct.stock_quantity}</h4>

        <ProductOrderForm></ProductOrderForm>
      </article>
    </section>
  ) : (
    <div>Product not found</div>
  );
};
