import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { Product } from "./pages/Product";
import { Products } from "./pages/Products";
import { NotFound } from "./pages/NotFound";

const basePath = import.meta.env.BASE_PATH || "/"; // Default to "/" if not set

export const router = createBrowserRouter([
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
        path: "products",
        element: <Products></Products>,
      },
      {
        path: "product/:id",
        element: <Product></Product>,
      },
    ],
  },
]);
