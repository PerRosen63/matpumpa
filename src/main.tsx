import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <App
              baseUrl={import.meta.env.VITE_BASE_URL}
              consumerKey={import.meta.env.VITE_CONSUMER_KEY}
              consumerSecret={import.meta.env.VITE_CONSUMER_SECRET}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
