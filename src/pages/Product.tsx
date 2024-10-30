import { Link, useParams } from "react-router-dom";
import { ProductPresentation } from "../components/productPresentation";
import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";

export const Product = () => {
  const { id } = useParams();
  const { fetchProduct, selectedProduct } = useContext(AppContext) ?? {
    fetchProduct: () => {},
    selectedProduct: null,
  };

  useEffect(() => {
    if (
      id &&
      !isNaN(parseInt(id, 10)) &&
      (!selectedProduct || selectedProduct.id !== parseInt(id, 10))
    ) {
      fetchProduct(parseInt(id, 10));
    }
  }, [id, fetchProduct, selectedProduct]);

  return (
    <>
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

      <ProductPresentation></ProductPresentation>
    </>
  );
};
