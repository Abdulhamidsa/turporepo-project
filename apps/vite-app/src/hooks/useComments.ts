import { useState } from "react";
import { request } from "../../api/request";
import { frontendCommentSchema } from "@repo/zod/validation/post";
import { z } from "zod";
export const useAddComment = (postId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitComment = async (text: string) => {
    if (!text.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = (await request("POST", "/post/comment", { postId, text })) as { post?: { comments: unknown } };
      console.log("Raw API Response:", response);

      // Validate the comments array using the frontend schema
      const commentsValidation = z.array(frontendCommentSchema).safeParse(response.post?.comments);
      if (!commentsValidation.success) {
        console.error("Validation Errors:", commentsValidation.error.errors);
        throw new Error("Invalid API response structure for comments");
      }

      return commentsValidation.data; // Return the updated comments
    } catch (err) {
      console.error("Error adding comment:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { submitComment, isLoading, error };
};
