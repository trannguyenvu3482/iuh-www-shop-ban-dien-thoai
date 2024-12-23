import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    server: { https: true },
    port: 3000,
  },
  optimizeDeps: {
    include: ["swiper/react", "swiper"],
  },
  build: {
    outDir: "dist",
  },
  preview: {
    port: 3000,
  },
  base: "./",
});
