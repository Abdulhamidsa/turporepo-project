import useSWR from "swr";
import { Post as PostType } from "@repo/data/types/types";
import { swrFetcher } from "../../../../api/swrFetcher";

export const useFetchPosts = () => {
  const { data, error, isLoading, mutate } = useSWR<PostType[]>("https://cre8ify-backend-production.up.railway.app/api/post?limit=50", swrFetcher);

  return {
    posts: data,
    error,
    isLoading,
    mutate,
  };
};
