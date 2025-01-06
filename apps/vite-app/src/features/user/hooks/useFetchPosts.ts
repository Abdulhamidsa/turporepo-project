import useSWR from "swr";
import { Post as PostType } from "@repo/data/types/types";
import { swrFetcher } from "../../../../api/swrFetcher";

export const useFetchPosts = () => {
  const { data, error, isLoading, mutate } = useSWR<PostType[]>("http://localhost:4000/api/internal/post", swrFetcher);

  return {
    posts: data,
    error,
    isLoading,
    mutate,
  };
};
