import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
  server: {
    proxy: {
      "/api/auth": {
        target: "http://localhost:5000", // API runs on port 5000
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, "/auth"),
      },
    },
  },
});
