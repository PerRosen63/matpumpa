import React, { createContext, useEffect, useState } from "react";
import { TopLevel } from "../models/IProduct";

interface AppContextProps {
  products: TopLevel[];
  loading: boolean;
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

  return (
    <AppContext.Provider value={{ products, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
