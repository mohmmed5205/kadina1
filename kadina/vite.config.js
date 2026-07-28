import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "react-vendor",
              test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/,
              priority: 4,
              includeDependenciesRecursively: false,
            },
            {
              name: "motion-vendor",
              test: /node_modules[\\/]framer-motion[\\/]/,
              priority: 3,
              includeDependenciesRecursively: false,
            },
            {
              name: "swiper-vendor",
              test: /node_modules[\\/]swiper[\\/]/,
              priority: 2,
              includeDependenciesRecursively: false,
            },
            {
              name: "icons-vendor",
              test: /node_modules[\\/](react-icons|lucide-react)[\\/]/,
              priority: 1,
              includeDependenciesRecursively: false,
            },
          ],
        },
      },
    },
  },
});
