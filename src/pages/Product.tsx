import { Link, useParams } from "react-router-dom";
import { ProductPresentation } from "../components/ProductPresentation";
import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { TitleSection } from "../style_components/TitleSection";
import { ContentSection } from "@/style_components/ContentSection";

export const Product = () => {
  const { id } = useParams();
  const { fetchProduct, selectedProduct, loading } = useContext(AppContext) ?? {
    fetchProduct: () => {},
    selectedProduct: null,
    loading: true,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (
      id &&
      !isNaN(parseInt(id, 10)) &&
      (!selectedProduct || selectedProduct.id !== parseInt(id, 10))
    ) {
      fetchProduct(parseInt(id, 10));
    }
  }, [id, fetchProduct, selectedProduct]);

  return loading ? (
    <div className="loaderText flex flex-col items-center text-center">
      <h4>Ett ögonblick. Vi hämtar produkten...</h4>{" "}
      <div className="pt-4">
        <img
          width="75"
          src="https://mfdm.se/woo/wp-content/uploads/pumpkin.png"
          alt="pumpa"
          className="animate-spin"
        />
      </div>
    </div>
  ) : (
    <>
      <TitleSection>{selectedProduct?.name}</TitleSection>
      <ContentSection>
        <div className="my-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex">
              <li className="breadcrumb-item">
                <Link to="/products/">Alla</Link>
                <span className="mx-2">/</span>
              </li>
              {selectedProduct?.categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/product-category/${category.slug}`}>
                    {category.name}
                  </Link>
                  <span className="mx-2">/</span>
                </li>
              ))}
              <li>{selectedProduct?.name}</li>
            </ol>
          </nav>
        </div>

        <ProductPresentation></ProductPresentation>
      </ContentSection>
    </>
  );
};
