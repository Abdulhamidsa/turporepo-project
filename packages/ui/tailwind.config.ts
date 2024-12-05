// packages/ui/tailwind.config.ts
import { Config } from "tailwindcss";
const sharedConfig: Config = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#1da1f2",
      },
    },
  },
  plugins: [],
};

export default sharedConfig;
