import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { TopLevel } from "../models/IProduct";

interface ProductProps {
  baseUrl: string;
  consumerKey: string;
  consumerSecret: string;
}

export function Products({
  baseUrl,
  consumerKey,
  consumerSecret,
}: ProductProps) {
  const [products, setProducts] = useState<TopLevel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `${baseUrl}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
      );
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [baseUrl, consumerKey, consumerSecret]);

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
