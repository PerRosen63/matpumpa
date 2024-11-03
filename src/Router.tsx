import { createHashRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { Product } from "./pages/Product";
import { Products } from "./pages/Products";
import { NotFound } from "./pages/NotFound";
import { About } from "./pages/About";
import { Growing } from "./pages/Growing";
import { CartPage } from "./pages/CartPage";

const basePath = import.meta.env.BASE_PATH || "/"; // Default to "/" if not set

export const router = createHashRouter([
  {
    path: basePath,
    element: <Layout></Layout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "growing",
        element: <Growing></Growing>,
      },
      {
        path: "products",
        element: <Products></Products>,
      },
      {
        path: "product-category/:categorySlug", // Dynamic route for categories
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <Product></Product>,
      },
      {
        path: "cart",
        element: <CartPage></CartPage>,
      },
    ],
  },
]);
