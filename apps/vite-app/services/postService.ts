// services/postService.ts

import { PostType } from "@repo/zod/validation/post";
import { request } from "../api/request";

interface AddCommentResponse {
  success: boolean;
  data: {
    post: PostType; // The updated post with new comments
  };
}

// POST /post/comment, returns updated post with new comments
export async function addComment(postId: string, text: string): Promise<AddCommentResponse> {
  return request<AddCommentResponse>("POST", "/post/comment", { postId, text });
}

// Toggle like remains the same
export async function toggleLikePost(postId: string) {
  return request("POST", "/post/like", { postId });
}
