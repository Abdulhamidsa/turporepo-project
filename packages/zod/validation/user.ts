import { z } from "zod";

export const userProfileSchema = z.object({
  _id: z.string().default(""), // Default to an empty string if missing
  mongo_ref: z.string().default(""), // Default
  profileComplete: z.boolean().default(false), // Default to `false`
  bio: z.string().nullable().optional(), // Allow `null` or omit entirely
  age: z.number().nullable().optional(), // Allow `null` or omit entirely
  country: z.string().nullable().optional(), // Allow `null` or omit entirely
  profession: z.string().nullable().optional(), // Allow `null` or omit entirely
  createdAt: z.string().default(new Date().toISOString()), // Default to the current date/time
});

export type UserProfile = z.infer<typeof userProfileSchema>;

// Parse the default profile
export const defaultUserProfile: UserProfile = userProfileSchema.parse({});
