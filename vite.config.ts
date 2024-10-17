import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === "production" ? "/matpumpa/" : "/", // Set base for production
    define: {
      "meta.env.BASE_PATH": JSON.stringify(
        mode === "production" ? "/matpumpa/" : "/"
      ),
    },
  };
});
