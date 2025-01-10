// import { request } from "./request";
// import { ZodSchema } from "zod";

// export async function swrFetcher<T>(url: string, schema?: ZodSchema<T>, defaultValue?: T): Promise<T> {
//   try {
//     const response = await request<T>("GET", url);

//     if (schema) {
//       const validationResult = schema.safeParse(response);
//       if (!validationResult.success) {
//         console.error("Zod Validation Error:", validationResult.error);
//         return defaultValue || ({} as T);
//       }
//       return validationResult.data;
//     }

//     return response;
//   } catch (error) {
//     console.error("SWR fetch error:", error);
//     return defaultValue || ({} as T);
//   }
// }

// src/utils/swrFetcher.ts
import { ZodSchema } from "zod";
import { request } from "./request";
import { getErrorMessage } from "../utils/getErrorMessage";

/**
 * SWR Fetcher with schema validation and defaults.
 */
export async function swrFetcher<T>(url: string, schema?: ZodSchema<T>, defaultValue?: T): Promise<T> {
  try {
    const response = await request<T>("GET", url);

    if (schema) {
      // Validate the response with Zod and apply defaults
      const parsed = schema.safeParse(response);
      if (!parsed.success) {
        console.error("Validation Error:", parsed.error);
        return defaultValue || ({} as T);
      }
      return parsed.data;
    }

    return response;
  } catch (error) {
    console.error("SWR Fetch Error:", getErrorMessage(error));
    return defaultValue || ({} as T);
  }
}
