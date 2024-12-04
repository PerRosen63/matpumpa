import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import config from "./config.ts";
import { AppProvider } from "./context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider
      apiBaseUrl={config.apiBaseUrl}
      baseUrl={config.baseUrl}
      consumerKey={config.consumerKey}
      consumerSecret={config.consumerSecret}
      categoriesFetched={false}
    >
      <App></App>
    </AppProvider>
  </StrictMode>
);
