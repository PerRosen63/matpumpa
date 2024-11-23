import { useContext } from "react";
import AppContext from "../context/AppContext";
import { ProductOrderForm } from "./ProductOrderForm";
import parse from "html-react-parser";

export const ProductPresentation = () => {
  const { selectedProduct, wordpressImages } = useContext(AppContext) ?? {
    selectedProduct: null,
    wordpressImages: [],
  };

  return selectedProduct ? (
    <div id="productWrapper" className="flex gap-8 max-lg:flex-col">
      <article className="lg:w-1/2">
        <div>
          {wordpressImages.find(
            (wpImg) => wpImg.id === selectedProduct.images[0].id
          )?.media_details.sizes.large && ( // Check if large size exists
            <div className="flex">
              <img
                width="1100"
                src={
                  wordpressImages.find(
                    (wpImg) => wpImg.id === selectedProduct.images[0].id
                  )?.media_details.sizes.large.source_url
                }
                alt={selectedProduct.images[0].alt}
              />
            </div>
          )}
          {/* If medium size is not available use the default */}
          {!wordpressImages.find(
            (wpImg) => wpImg.id === selectedProduct.images[0].id
          )?.media_details.sizes.large && (
            <img
              width="1100"
              src={selectedProduct.images[0].src}
              alt={selectedProduct.images[0].alt}
            />
          )}
        </div>
        {selectedProduct?.images.length > 1 && (
          <div className="grid grid-cols-4">
            {selectedProduct?.images.map((image, index) => {
              const wpImage = wordpressImages.find(
                (wpImg) => wpImg.id === image.id
              );
              if (wpImage && wpImage.media_details.sizes.thumbnail) {
                return (
                  <img
                    key={index}
                    width="600"
                    src={wpImage.media_details.sizes.thumbnail.source_url}
                    alt={wpImage.alt_text}
                  />
                );
              } else {
                // Handle the case where wpImage or medium size is not found
                return null; // Or display a placeholder image
              }
            })}
          </div>
        )}
      </article>
      <article className="lg:w-1/2 flex flex-col justify-between">
        <p className="max-lg:text-center">
          {parse(selectedProduct.description)}
        </p>

        <ProductOrderForm></ProductOrderForm>
      </article>
    </div>
  ) : (
    <div>Product not found</div>
  );
};
