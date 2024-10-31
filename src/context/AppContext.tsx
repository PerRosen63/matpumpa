import React, { createContext, useEffect, useMemo, useState } from "react";
import { TopLevel } from "../models/IProduct";

interface Category {
  id: number;
  name: string;
  description: string; // Add description property
}

interface ImageSizes {
  thumbnail: string;
  medium: string;
  large: string;
}

interface WordPressImage {
  id: number;
  media_details: {
    sizes: ImageSizes;
  };
}

interface AppContextProps {
  products: TopLevel[];
  categories: Category[];
  loading: boolean;
  selectedProduct: TopLevel | null;
  fetchProduct: (id: number) => void;
  categoriesFetched: boolean;
  wordpressImages: WordPressImage[];
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
  const [wordpressImages, setWordpressImages] = useState<WordPressImage[]>([]);

  const wpBaseUrl = "https://mfdm.se/woo/wp-json";

  useEffect(() => {
    const fetchAllImages = async () => {
      let allImages: WordPressImage[] = [];
      let currentPage = 1;
      let totalPages = 1; // Initialize to 1 to enter the loop

      while (currentPage <= totalPages) {
        try {
          const response = await fetch(
            `${wpBaseUrl}/wp/v2/media?per_page=100&page=${currentPage}`
          );
          const data: WordPressImage[] = await response.json();

          // Get total pages from response headers
          totalPages = parseInt(
            response.headers.get("X-WP-TotalPages") || "1",
            10
          );

          allImages = [...allImages, ...data]; // Add current page's images
          currentPage++;
        } catch (error) {
          console.error("Error fetching images:", error);
          break; // Exit the loop on error
        }
      }

      setWordpressImages(allImages);
    };
    fetchAllImages();

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

        /*         const imagesResponse = await fetch(`${wpBaseUrl}/wp/v2/media`);
        const imagesData = await imagesResponse.json();
        setWordpressImages(imagesData);
        console.log(imagesData); */
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
        wordpressImages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
