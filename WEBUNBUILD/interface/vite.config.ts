import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    chunkSizeWarningLimit: 10000,
    outDir: "build",
  },
  resolve: {
    alias: {
      "@assets": `${resolve(__dirname, "./src/assets/")}`,
      "@utils": `${resolve(__dirname, "./src/utils/")}`,
      "@icons": `${resolve(__dirname, "./src/assets/icons/")}`,
      "@hooks": `${resolve(__dirname, "./src/hook/")}`,
      "@components": `${resolve(__dirname, "./src/dev/")}`,
      "@": resolve(__dirname, "./src/"),
    },
  },
});