import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App, { AppProps } from "./App.tsx";
import "./index.css";
import config from "./config.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App
      baseUrl={config.baseUrl}
      consumerKey={config.consumerKey}
      consumerSecret={config.consumerSecret}
    />
  </StrictMode>
);
