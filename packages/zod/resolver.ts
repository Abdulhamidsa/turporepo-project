import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const createZodResolver = <T extends z.ZodTypeAny>(schema: T) => zodResolver(schema);

import { signInSchema } from "./validation/auth";
export const signInResolver = createZodResolver(signInSchema);

import { projectSchema } from "./validation/user";
export const projectResolver = createZodResolver(projectSchema);
