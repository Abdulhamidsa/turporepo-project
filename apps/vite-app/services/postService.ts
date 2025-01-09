import { request } from "../api/request";
export async function toggleLikePost(postId: string) {
  return request("POST", "/post/like", { postId });
}
