import React, { createContext, useEffect, useMemo, useState } from "react";
import { TopLevel } from "../models/IProduct";

interface Category {
  id: number;
  name: string;
  description: string; // Add description property
}

interface AppContextProps {
  products: TopLevel[];
  categories: Category[];
  loading: boolean;
  selectedProduct: TopLevel | null;
  fetchProduct: (id: number) => void;
  categoriesFetched: boolean;
}

const AppContext = createContext<AppContextProps | null>(null);

interface AppProviderProps {
  children: React.ReactNode;
  baseUrl: string;
  consumerKey: string;
  consumerSecret: string;
  categoriesFetched: boolean;
}

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  baseUrl,
  consumerKey,
  consumerSecret,
}) => {
  const [products, setProducts] = useState<TopLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<TopLevel | null>(null);
  const [hasFetchedProducts, setHasFetchedProducts] = useState(false); // Track initial fetch
  const [categories, setCategories] = useState<Category[]>([]);

  const memoizedCategories = useMemo(() => categories, [categories]);

  const [categoriesFetched, setCategoriesFetched] = useState(false); // Initialize as false

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const productsResponse = await fetch(
          `${baseUrl}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
        );
        const productsData = await productsResponse.json();
        setProducts(productsData);

        const categoriesResponse = await fetch(
          `${baseUrl}/categories?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
        );

        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
        setCategoriesFetched(true); // Set the flag to true AFTER fetching categories
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setHasFetchedProducts(true);
      }
    };

    if (!hasFetchedProducts) {
      fetchProducts();
    }
  }, [baseUrl, consumerKey, consumerSecret, hasFetchedProducts]);

  const fetchProduct = async (id: number) => {
    // Check if the product is already in the products array
    const existingProduct = products.find((product) => product.id === id);
    if (existingProduct) {
      setSelectedProduct(existingProduct);
      return;
    }
    setLoading(true);
    const response = await fetch(
      `${baseUrl}/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
    );
    const data = await response.json();
    setSelectedProduct(data);
    setLoading(false);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        categories: memoizedCategories,
        loading,
        selectedProduct,
        fetchProduct,
        categoriesFetched,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
