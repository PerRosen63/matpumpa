import { Link, useParams } from "react-router-dom";
import { ProductPresentation } from "../components/ProductPresentation";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { TitleSection } from "../style_components/TitleSection";

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

      <section>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Hem</Link>
            </li>
            {selectedProduct?.categories.map((category) => (
              <li key={category.id}>
                <Link to={`/product-category/${category.slug}`}>
                  {category.name}
                </Link>
              </li>
            ))}
            <li>{selectedProduct?.name}</li>
          </ol>
        </nav>
      </section>
      {isProductLoaded && <ProductPresentation></ProductPresentation>}
    </>
  );
};
