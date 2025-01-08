// import { z } from "zod";

// const userSchema = z.object({
//   _id: z.string(),
//   username: z.string(),
//   profilePicture: z.string().nullable(),
// });

// const commentSchema = z.object({
//   userId: userSchema, // if populated
//   text: z.string(),
//   createdAt: z.string(), // or z.date() if you handle date conversion differently
// });

// export const postSchema = z.object({
//   _id: z.string(),
//   id: z.string(),
//   content: z.string().optional().default(""),
//   image: z.string().nullable(),
//   createdAt: z.string(),
//   updatedAt: z.string(),
//   likedByUser: z.boolean(),
//   likes: z.array(z.string()),
//   likesCount: z.number(),
//   userId: userSchema,
//   comments: z.array(commentSchema), // <-- here's the array of comments
// });

// export const postsArraySchema = z.array(postSchema);

// // Types
// export type UserType = z.infer<typeof userSchema>;
// export type CommentType = z.infer<typeof commentSchema>;
// export type PostType = z.infer<typeof postSchema>;
// src/zod/validation/post.ts

import { z } from "zod";

// Define user schema for userId references

export const userSchema = z.object({
  _id: z.string(),
  username: z.string(),
  // Allow string, null, or undefined
  profilePicture: z.string().nullable().optional(),
});

export const commentSchema = z.object({
  _id: z.string().optional(),
  userId: userSchema,
  text: z.string(),
  createdAt: z.string().optional(),
});

// If your server might omit comments altogether, do optional().default([])
export const postSchema = z.object({
  _id: z.string(),
  content: z.string(),
  image: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  likedByUser: z.boolean().optional(),
  likesCount: z.number().optional(),
  userId: userSchema,
  comments: z.array(commentSchema).optional().default([]),
});

// Finally, an array of these posts
export const postsArraySchema = z.array(postSchema);

// If you want TypeScript types, you can do:
export type PostType = z.infer<typeof postSchema>;
export type CommentType = z.infer<typeof commentSchema>;
export type UserType = z.infer<typeof userSchema>;
