import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@repo/ui": "/path-to-your/ui/src",
    },
  },
  base: "/",
  build: {
    outDir: "dist",
  },
});
