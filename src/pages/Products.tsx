import { Link } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppContext";

export function Products() {
  const { products, loading } = useContext(AppContext) ?? {
    products: [],
    loading: true,
  };

  return loading ? (
    <div className="loaderText">
      <h2>Just a moment. Fetching products...</h2>{" "}
    </div>
  ) : (
    <ul>
      {products ? (
        products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              {product.images?.length > 0 && (
                <img src={product.images[0].src} alt="Product banner" />
              )}
              <h2>{product.name}</h2>
              <p>Sale price: {product.sale_price}</p>
              <strong>
                {product.stock_status === "instock"
                  ? "In stock"
                  : "Out of stock"}
              </strong>
              <button>Add to Cart</button>
            </Link>
          </li>
        ))
      ) : (
        <li>No products found</li>
      )}
    </ul>
  );
}

export default Products;
