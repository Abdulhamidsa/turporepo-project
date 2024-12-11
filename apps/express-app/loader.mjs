// This function allows you to register a custom loader for handling specific file types.
import { register } from "node:module";

// This function converts a file path to a file URL.
import { pathToFileURL } from "node:url";

// Register a custom loader for handling TypeScript files in ESM (ECMAScript Module) format.
// The 'ts-node/esm' loader will be used to handle TypeScript files.
// 'pathToFileURL(process.cwd() + "/")' converts the current working directory to a file URL.
register("ts-node/esm", pathToFileURL(process.cwd() + "/"));
