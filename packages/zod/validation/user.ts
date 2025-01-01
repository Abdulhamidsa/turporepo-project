import { z } from "zod";

export const userProfileSchema = z.object({
  _id: z.string().default(""), // Default to an empty string if missing
  username: z.string().nullable().optional(), // Allow `null` or omit entirely
  mongo_ref: z.string().default(""), // Default
  profileComplete: z.boolean().default(false), // Default to `false`
  bio: z.string().nullable().optional(), // Allow `null` or omit entirely
  age: z.number().nullable().optional(), // Allow `null` or omit entirely
  country: z.string().nullable().optional(), // Allow `null` or omit entirely
  profession: z.string().nullable().optional(), // Allow `null` or omit entirely
  createdAt: z.string().default(new Date().toISOString()), // Default to the current date/time
  profilePicture: z.string().nullable().optional(), // Allow `null` or omit entirely
  coverImage: z.string().nullable().optional(), // Allow `null` or omit entirely
});
export type UserProfile = z.infer<typeof userProfileSchema>;
// Parse the default profile
export const defaultUserProfile: UserProfile = userProfileSchema.parse({});

/////////////////////////////7

export const userAuthSchema = z.object({
  username: z.string().min(3).optional(),
  friendlyId: z.string().min(3).optional(),
});

export type UserAuth = z.infer<typeof userAuthSchema>;

// Parse the default user auth
export const defaultUserAuth: UserAuth = userAuthSchema.parse({});

export const UserProfileSchema = z.object({
  username: z.string().min(3).optional(),
  age: z.number().optional(),
  bio: z.string().optional(),
  profilePicture: z.string().optional(),
  coverImage: z.string().optional(),
  country: z.string().optional(),
  profession: z.string().optional(),
});
