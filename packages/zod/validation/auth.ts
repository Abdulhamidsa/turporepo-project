import { z } from "zod";

// Signin schema
export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

// Signup schema
export const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/^(?=.*[A-Z])|(?=.*\d)/, "Password must contain at least one uppercase letter or a number"),
    confirmPassword: z.string().min(6, "Password confirmation must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
