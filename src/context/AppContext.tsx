import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TopLevel } from "../models/IProduct";
// import { error } from "console";

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
  alt_text: string;
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

export interface Order {
  id: number;
  total: string;
  line_items: {
    name: string;
    product_id: number;
    quantity: number;
    price: number;
    total: string;
    variation_id: number;
    image: {
      id: string;
      src: string;
    };
  }[];
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
  createOrder: () => Promise<void> | null;
  isOrderCreating: boolean;
  orderId: number | null;
  orders: Order[];
  fetchOrders: () => Promise<void>;
  // fetchOrder: (id: number) => void;
  // selectedOrder: Order | null;
  // hasFetchedOrders: boolean;
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
  const [preliminaryCart, setPreliminaryCart] = useState<CartItem[]>([]);
  const [isOrderCreating, setIsOrderCreating] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]); // Initialize as an empty array
  // const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  // const [hasFetchedOrders, setHasFetchedOrders] = useState(false);

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
              ? {
                  ...variation,
                  stock_quantity: newStockQuantity,
                }
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

  const fetchProductRef = useRef<
    (id: number, forceRefetch?: boolean) => Promise<void>
  >(() => Promise.resolve());

  const wpBaseUrl = "https://mfdm.se/woo/wp-json";

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch(
        `${baseUrl}/orders?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching orders: ${response.status}`);
      }
      const data: Order[] = await response.json();
      setOrders(data);
      // setHasFetchedOrders(true);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  }, [baseUrl, consumerKey, consumerSecret]);

  /* const fetchOrder = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/orders/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
      );

      const data = await response.json();

      setSelectedOrder(data);

      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }; */

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
          `${baseUrl}/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
        );
        const productsData = await productsResponse.json();
        setProducts(productsData);

        const categoriesResponse = await fetch(
          `${baseUrl}/products/categories?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
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

    fetchOrders();
  }, [baseUrl, consumerKey, consumerSecret, hasFetchedProducts, fetchOrders]);

  const fetchProduct = async (id: number, forceRefetch = false) => {
    setLoading(true);

    console.log(`Fetching product ${id} (forceRefetch: ${forceRefetch})...`); // Log before fetching

    try {
      // Check if the product is already in the products array AND forceRefetch is false
      const existingProduct = products.find((product) => product.id === id);
      if (existingProduct && !forceRefetch) {
        setSelectedProduct(existingProduct);

        if (productVariations[id]) {
          return;
        }
      }

      const response = await fetch(
        `${baseUrl}/products/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
      );
      console.log(`Product ${id} fetched successfully.`); // Log after successful fetch

      const data = await response.json();

      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === id ? data : product))
      );

      setSelectedProduct(data);

      console.log("Product data", data);

      const variationsResponse = await fetch(
        `${baseUrl}/products/${id}/variations?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
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
      console.log(`Fetching product ${id} completed.`); // Log after fetch completes (success or error)
    }
  };

  fetchProductRef.current = fetchProduct;

  const createOrder = async () => {
    try {
      setIsOrderCreating(true);
      const response = await fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(`${consumerKey}:${consumerSecret}`),
        },
        body: JSON.stringify({
          payment_method: "cod",
          payment_method_title: "Cash on delivery",
          set_paid: true,
          billing: {
            first_name: "Guest", // Or any placeholder
            last_name: "Customer",
          },
          line_items: preliminaryCart.map((item) => ({
            product_id: item.product.id,
            variation_id: item.variationId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Order created successfully", data);
        setOrderId(data.id);

        clearCart();

        console.log("Re-fetching product data after order...");
        preliminaryCart.forEach((item) => {
          fetchProductRef.current(item.product.id, true); // Force re-fetch for each product
        });

        return data;
      } else {
        console.error("Error creating order", data);
        throw new Error("Error creating order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    } finally {
      setIsOrderCreating(false);
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
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItemQuantity,
        preliminaryCart,
        amountTotal,
        createOrder,
        isOrderCreating,
        orderId,
        orders,
        fetchOrders,
        // fetchOrder,
        // selectedOrder,
        // hasFetchedOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
