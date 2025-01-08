// src/api/postApi.ts
import axios from "axios";

export const toggleLikePost = async (postId: string) => {
  await axios.post("http://localhost:4000/api/post/like", { postId });
};
