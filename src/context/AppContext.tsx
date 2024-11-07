import React, { createContext, useEffect, useMemo, useState } from "react";
import { TopLevel } from "../models/IProduct";

interface Category {
  id: number;
  name: string;
  description: string; // Add description property
}

interface ImageSizes {
  thumbnail: {
    source_url: string;
  };
  medium: {
    source_url: string;
  };
  large: {
    source_url: string;
  };
}

interface WordPressImage {
  id: number;
  media_details: {
    sizes: ImageSizes;
  };
}

export interface Variation {
  id: number;
  price: string;
  stock_quantity: number;
  weight: string;
  attributes: { name: string; option: string }[];
}

export interface CartItem {
  product: TopLevel;
  variationId: number | undefined;
  quantity: number;
}

interface AppContextProps {
  products: TopLevel[];
  categories: Category[];
  loading: boolean;
  selectedProduct: TopLevel | null;
  fetchProduct: (id: number) => void;
  categoriesFetched: boolean;
  wordpressImages: WordPressImage[];
  productVariations: { [productId: number]: Variation[] };
  updateProductStock: (productId: number, newStockQuantity: number) => void;
  updateVariationStock: (
    productId: number,
    variationId: number,
    newStockQuantity: number
  ) => void;
  cart: CartItem[];
  addToCart: (product: TopLevel, variationId: number | undefined) => void;
  removeFromCart: (productId: number, variationId?: number) => void;
  clearCart: () => void;
  updateCartItemQuantity: (
    productId: number,
    variationId: number | undefined,
    newQuantity: number
  ) => void;
  preliminaryCart: CartItem[];
  amountTotal: number;
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
  const [productVariations, setProductVariations] = useState<{
    [productId: number]: Variation[];
  }>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [preliminaryCart, setPreliminaryCart] = useState<CartItem[]>([]);

  const addToCart = (
    product: TopLevel,
    variationId: number | undefined,
    quantity: number = 1
  ) => {
    setPreliminaryCart((prevCart) => {
      const existingCartItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id && item.variationId === variationId
      );

      if (existingCartItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingCartItemIndex] = {
          ...updatedCart[existingCartItemIndex],
          quantity: updatedCart[existingCartItemIndex].quantity + quantity,
        };
        return updatedCart;
      } else {
        return [...prevCart, { product, variationId, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number, variationId?: number) => {
    setPreliminaryCart((prevCart) =>
      prevCart.filter(
        (item) =>
          item.product.id !== productId || item.variationId !== variationId
      )
    );
  };

  const clearCart = () => {
    setPreliminaryCart([]);
  };

  // Function to update product stock in the context
  const updateProductStock = (productId: number, newStockQuantity: number) => {
    // Update the products array in the context
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, stock_quantity: newStockQuantity }
          : product
      )
    );

    // Update the selectedProduct if it matches the updated product
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct((prevProduct) =>
        prevProduct
          ? { ...prevProduct, stock_quantity: newStockQuantity }
          : null
      );
    }
  };

  // Function to update variation stock in the context
  const updateVariationStock = (
    productId: number,
    variationId: number,
    newStockQuantity: number
  ) => {
    setProductVariations((prevVariations) => {
      const updatedVariations = { ...prevVariations };

      if (updatedVariations[productId]) {
        updatedVariations[productId] = updatedVariations[productId].map(
          (variation) =>
            variation.id === variationId
              ? { ...variation, stock_quantity: newStockQuantity }
              : variation
        );
      }

      return updatedVariations;
    });
  };

  const updateCartItemQuantity = (
    productId: number,
    variationId: number | undefined,
    newQuantity: number
  ) => {
    setPreliminaryCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && item.variationId === variationId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const amountTotal = preliminaryCart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

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
    setLoading(true);
    try {
      // Check if the product is already in the products array
      const existingProduct = products.find((product) => product.id === id);
      if (existingProduct) {
        setSelectedProduct(existingProduct);

        if (productVariations[id]) {
          return;
        }
      }

      const response = await fetch(
        `${baseUrl}/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
      );
      const data = await response.json();
      setSelectedProduct(data);

      const variationsResponse = await fetch(
        `${baseUrl}/${id}/variations?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
      );
      const variationsData: Variation[] = await variationsResponse.json();

      setProductVariations((prevVariations) => ({
        ...prevVariations,
        [id]: variationsData,
      }));
    } catch (error) {
      console.error("Error fetching product variations:", error);
    } finally {
      setLoading(false);
    }
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
        productVariations,
        updateProductStock,
        updateVariationStock,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItemQuantity,
        preliminaryCart,
        amountTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
