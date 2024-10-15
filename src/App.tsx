import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import "./App.css";

interface AppProps {
  baseUrl: string;
  consumerKey: string;
  consumerSecret: string;
}

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
