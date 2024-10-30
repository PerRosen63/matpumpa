import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useMemo } from "react";
import AppContext from "../context/AppContext";
import React from "react";

export function Products() {
  const { products, categories, loading, categoriesFetched } = useContext(
    AppContext
  ) ?? {
    products: [],
    categories: [],
    loading: true,
    categoriesFetched: false,
  };

  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const selectedCategoryObject = useMemo(() => {
    if (!categorySlug) {
      return null;
    }
    return categories.find(
      (category) =>
        category.name.toLowerCase().replace(/\s+/g, "-") === categorySlug
    );
  }, [categories, categorySlug]);

  const selectedCategoryId = selectedCategoryObject?.id || null;

  const handleCategoryChange = (categoryId: number | null) => {
    if (categoryId) {
      const category = categories.find((cat) => cat.id === categoryId);
      if (category) {
        const categorySlug = category.name.toLowerCase().replace(/\s+/g, "-");
        navigate(`/product-category/${categorySlug}`);
      }
    } else {
      navigate("/products");
    }
  };

  // Filter products based on category ID from route
  const filteredProducts = useMemo(() => {
    if (selectedCategoryId) {
      return products.filter((product) =>
        product.categories.some(
          (category) => category.id === selectedCategoryId
        )
      );
    } else {
      return products;
    }
  }, [products, selectedCategoryId]);

  const defaultCategoryObject = useMemo(() => {
    if (!categoriesFetched) {
      return null;
    }
    const category = categories.find((category) => category.id === 15);
    console.log("Default category description:", category?.description); // Log only once
    return category;
  }, [categoriesFetched, categories]); // Recalculate only if 'categories' changes

  return (
    <>
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {selectedCategoryObject && (
            <li className="breadcrumb-item active" aria-current="page">
              {selectedCategoryObject.name}
            </li>
          )}
        </ol>
      </nav>
      <div>
        {/* Filter Buttons */}
        <label>
          <input
            type="radio"
            name="categories"
            value="" // Represents "All Categories"
            checked={!selectedCategoryId}
            onChange={() => handleCategoryChange(null)}
          />
          All Categories
        </label>
        <label>
          <input
            type="radio"
            name="categories"
            value="22" // Replace with actual category ID
            checked={selectedCategoryId === 22}
            onChange={() => handleCategoryChange(22)}
          />
          Category 1
        </label>
        <label>
          <input
            type="radio"
            name="categories"
            value="23" // Replace with actual category ID
            checked={selectedCategoryId === 23}
            onChange={() => handleCategoryChange(23)}
          />
          Category 2
        </label>
        <label>
          <input
            type="radio"
            name="categories"
            value="24" // Replace with actual category ID
            checked={selectedCategoryId === 24}
            onChange={() => handleCategoryChange(24)}
          />
          Category 3
        </label>

        {/* Reset Button (Optional) */}
        {/* <button onClick={() => handleCategoryChange(null)}>Reset</button> */}
      </div>

      {selectedCategoryObject ? (
        <div>
          {selectedCategoryObject.description
            .split("\r\n\r\n")
            .map((line, index) => (
              <React.Fragment key={index}>
                <p>{line}</p>
              </React.Fragment>
            ))}
        </div>
      ) : (
        <p>{defaultCategoryObject?.description}</p>
      )}

      {loading ? (
        <div className="loaderText">
          <h2>Just a moment. Fetching products...</h2>{" "}
        </div>
      ) : (
        <ul>
          {products ? (
            filteredProducts.map((product) => (
              <li key={product.id}>
                <Link to={`/product/${product.id}`}>
                  {product.images?.length > 0 && (
                    <img
                      width="300"
                      src={product.images[0].src}
                      alt="Product banner"
                    />
                  )}
                  <h2>{product.name}</h2>
                  Categories:{" "}
                  <ul>
                    {product.categories.map((category) => (
                      <li key={category.id}>
                        {category.name} {category.id}
                      </li>
                    ))}
                  </ul>
                  <p>Sale price: {product.sale_price}</p>
                  <strong>
                    {product.stock_status === "instock"
                      ? "In stock"
                      : "Out of stock"}
                  </strong>
                </Link>
              </li>
            ))
          ) : (
            <li>No products found</li>
          )}
        </ul>
      )}
    </>
  );
}

export default Products;
