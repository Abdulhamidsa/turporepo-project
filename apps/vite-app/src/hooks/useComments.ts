// src/hooks/useComments.ts

import { PostType } from "@repo/zod/validation/post";
import { usePosts } from "./usePosts";
import { request } from "../../api/request";

export const useAddComment = () => {
  const { mutate } = usePosts(); // optional if you want to re-fetch all posts

  const addComment = async (postId: string, text: string) => {
    // This calls POST /posts/comment
    // The server presumably returns the updated Post object
    const updatedPost = await request<PostType>(
      "POST",
      "/posts/comment",
      { postId, text }
      // postSchema or something
    );
    // Revalidate
    mutate();
    return updatedPost;
  };

  return { addComment };
};
