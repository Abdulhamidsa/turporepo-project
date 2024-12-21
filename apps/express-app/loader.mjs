import { registerAndCreateEsmHooks } from "ts-node/esm";

// Create ESM hooks for TypeScript support
const { resolve, getFormat, transformSource } = registerAndCreateEsmHooks({
  experimentalSpecifierResolution: "node",
  transpileOnly: true, // Skips type-checking for faster development
});

// Export hooks
export { resolve, getFormat, transformSource };
