// import { z } from "zod";

// export const projectSchema = z.object({
//   id: z.string().optional(),
//   title: z.string().min(1, "Title is required."),
//   description: z.string().min(1, "Description is required."),
//   url: z.string().url("Invalid URL format."),
//   media: z.array(z.object({ url: z.string().url("Invalid URL format") })).min(1, "At least one image is required."),
//   thumbnail: z.string().url("Invalid thumbnail URL."),
//   tags: z.array(z.string()).optional(), // Array of Tag IDs as strings
// });

// // Infer the TypeScript type from the schema
// export type ProjectType = z.infer<typeof projectSchema>;

import { z } from "zod";

// Define tag schema to match backend response
// const tagSchema = z.object({
//   id: z.string(),
//   name: z.string(),
// });

export const addProjectSchema = z.object({
  title: z.string().min(1, "Title is required."), // Required title
  description: z.string().min(1, "Description is required."), // Required description
  url: z.union([z.string().url("Invalid URL format."), z.literal("")]).optional(),
  thumbnail: z.string().url("Invalid thumbnail URL."), // Now required
  media: z
    .array(
      z.object({
        url: z.string().url("Invalid media URL."), // Each media must have a valid URL
      })
    )
    .optional(), // Media is now optional
  tags: z.array(z.string()), // Array of Tag IDs as strings
});

export type AddProjectInput = z.infer<typeof addProjectSchema>;

export const fetchedProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  url: z.union([z.string().url("Invalid URL format."), z.literal("")]).optional(),
  media: z
    .array(
      z.object({
        url: z.string().url("Invalid URL format."),
      })
    )
    .min(1, "At least one image is required."),
  thumbnail: z.string().url("Invalid thumbnail URL."),
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export type FetchedProjectType = z.infer<typeof fetchedProjectSchema>;
