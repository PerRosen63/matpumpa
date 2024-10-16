import React, { createContext, useEffect, useState } from "react";
import { TopLevel } from "../models/IProduct";

interface AppContextProps {
  products: TopLevel[];
  loading: boolean;
  selectedProduct: TopLevel | null;
  fetchProduct: (id: number) => void;
}

const AppContext = createContext<AppContextProps | null>(null);

interface AppProviderProps {
  children: React.ReactNode;
  baseUrl: string;
  consumerKey: string;
  consumerSecret: string;
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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch(
        `${baseUrl}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
      );
      const data = await response.json();
      setProducts(data);
      setLoading(false);
      setHasFetchedProducts(true);
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
      value={{ products, loading, selectedProduct, fetchProduct }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
