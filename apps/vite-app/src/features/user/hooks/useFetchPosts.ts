// src/hooks/useFetchPosts.ts
import useSWR from "swr";
import { swrFetcher } from "../../../../api/swrFetcher";
import axios from "axios";
import { PostType } from "@repo/zod/validation/post";

export const useFetchPosts = () => {
  const { data, error, isLoading, mutate } = useSWR<PostType[]>("https://cre8ify-backend-production.up.railway.app/api/post", swrFetcher);

  const toggleLike = async (postId: string) => {
    try {
      mutate(
        (currentPosts) =>
          currentPosts?.map((post) =>
            post._id === postId
              ? { ...post, likedByUser: !post.likedByUser } // Toggle like status
              : post
          ),
        false // Do not revalidate yet
      );

      // Call the API to toggle like
      await axios.post("https://cre8ify-backend-production.up.railway.app/api/post/like", { postId });

      // Revalidate to ensure accuracy
      mutate();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return {
    posts: data,
    error,
    isLoading,
    mutate,
    toggleLike,
  };
};
