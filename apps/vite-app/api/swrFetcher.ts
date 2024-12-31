import { ZodSchema } from "zod";
import { request } from "./request";
import { AppError } from "./errors";

export async function swrFetcher<T>(url: string, schema?: ZodSchema<T>, defaultValue?: T): Promise<T> {
  try {
    const response = await request<T>("GET", url);

    if (schema) {
      const validationResult = schema.safeParse(response);
      if (!validationResult.success) {
        console.error("Zod Validation Error:", validationResult.error);
        return defaultValue || ({} as T);
      }
      return validationResult.data;
    }

    return response;
  } catch (error) {
    console.error("SWR fetch error:", (error as AppError).message);
    // Return the default value if available
    return defaultValue || ({} as T);
  }
}
