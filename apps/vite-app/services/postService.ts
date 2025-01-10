import { ENDPOINTS } from "@repo/api/endpoints";
import { request } from "../api/request";
export async function toggleLikePost(postId: string) {
  return request("POST", ENDPOINTS.posts.like, { postId });
}
