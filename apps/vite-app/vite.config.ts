import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@repo/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@repo/lib/utils": path.resolve(__dirname, "../../packages/ui/src/lib/utils.ts"),
    },
  },
});
