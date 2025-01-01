import { z } from "zod";

export const userProfileSchema = z.object({
  username: z.string().nullable().optional(),
  profileComplete: z.boolean().optional(),
  bio: z.string().nullable().optional(),
  birthYear: z.number().nullable().optional(),
  country: z.string().nullable().optional(),
  profession: z.string().optional(),
  profilePicture: z.string().optional(),
  coverImage: z.string().optional(),
  createdAt: z.string().optional(),
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

// export const UserProfileSchema = z.object({
//   username: z.string().min(3).optional(),
//   age: z.number().optional(),
//   bio: z.string().optional(),
//   profilePicture: z.string().optional(),
//   coverImage: z.string().optional(),
//   country: z.string().optional(),
//   profession: z.string().optional(),
// });
