import { Link, useParams } from "react-router-dom";
import { ProductPresentation } from "../components/ProductPresentation";
import { useContext, useEffect, useState } from "react";
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

  const [isProductLoaded, setIsProductLoaded] = useState(false);

  useEffect(() => {
    if (
      id &&
      !isNaN(parseInt(id, 10)) &&
      (!selectedProduct || selectedProduct.id !== parseInt(id, 10))
    ) {
      fetchProduct(parseInt(id, 10));
    }
  }, [id, fetchProduct, selectedProduct]);

  useEffect(() => {
    if (!loading) {
      setIsProductLoaded(true);
    }
  }, [loading]);

  return (
    <>
      <TitleSection>{selectedProduct?.name}</TitleSection>
      <ContentSection>
        <div className="my-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex">
              <li className="breadcrumb-item">
                <Link to="/products/">Alla</Link>
              </li>
              <span className="mx-2">/</span>
              {selectedProduct?.categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/product-category/${category.slug}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
              <span className="mx-2">/</span>
              <li>{selectedProduct?.name}</li>
            </ol>
          </nav>
        </div>

        {isProductLoaded && <ProductPresentation></ProductPresentation>}
      </ContentSection>
    </>
  );
};
