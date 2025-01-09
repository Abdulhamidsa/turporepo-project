import { z } from "zod";

// User schema for userId references
export const userSchema = z.object({
  _id: z.string(),
  username: z.string(),
  profilePicture: z.string().nullable().optional(),
});

// Comment schema

export const commentSchema = z.object({
  _id: z.string().optional(), // Optional comment ID
  userId: userSchema, // Reference to `userSchema`
  text: z.string(), // Required comment text
  createdAt: z.string().optional(), // Optional timestamp
});

// Post schema
export const postSchema = z.object({
  _id: z.string(), // Post ID
  content: z.string().optional().default(""), // Optional content with default
  image: z.string().nullable().optional(), // Nullable/optional image
  createdAt: z.string().optional(), // Optional creation timestamp
  updatedAt: z.string().optional(), // Optional updated timestamp
  likedByUser: z.boolean().optional(), // Optional boolean
  likesCount: z.number().optional(), // Optional like count
  userId: userSchema, // Reference to user schema
  comments: z.array(commentSchema).optional().default([]), // Optional comments
});

// Array of posts schema
export const postsArraySchema = z.array(postSchema);

// TypeScript types inferred from schemas
export type PostType = z.infer<typeof postSchema>;
export type CommentType = z.infer<typeof commentSchema>;
export type UserType = z.infer<typeof userSchema>;

// Define the schema for a frontend comment
export const frontendCommentSchema = z.object({
  _id: z.string().optional(), // Optional if the API doesn’t always return it
  userId: z
    .object({
      _id: z.string(),
      username: z.string(),
    })
    .optional(), // Optional to handle cases where userId might be missing
  text: z.string(), // Required comment text
  createdAt: z.string().optional(), // Optional creation date
});

// Schema for adding a comment
export const frontendAddCommentSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
  text: z.string().min(1, "Comment text cannot be empty"),
});

// Types inferred from schemas
export type FrontendCommentType = z.infer<typeof frontendCommentSchema>;
export type AddCommentInput = z.infer<typeof frontendAddCommentSchema>;
