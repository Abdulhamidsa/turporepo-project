import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import { swrFetcher } from "../../../../api/swrFetcher";
import { PostType } from "@repo/zod/validation/post";
import axios from "axios";

export const useFetchPosts = () => {
  const [limit] = useState(10); // Customize the limit as needed

  // Use SWR Infinite for dynamic page fetching
  const { data, error, size, setSize, mutate, isValidating } = useSWRInfinite<{
    posts: PostType[];
    totalPages: number;
    currentPage: number;
  }>(
    (pageIndex) => `http://localhost:4000/api/post?limit=${limit}&page=${pageIndex + 1}`, // Fetch the next page
    swrFetcher,
    {
      revalidateOnFocus: false, // Avoid refetching when the user refocuses the tab
    }
  );

  // Combine posts from all fetched pages
  const posts = data ? data.flatMap((page) => page.posts) : [];
  const totalPages = data?.[0]?.totalPages ?? 0;

  const toggleLike = async (postId: string) => {
    try {
      mutate(
        (currentData) =>
          currentData
            ? currentData.map((page) => ({
                ...page,
                posts: page.posts.map((post) =>
                  post._id === postId
                    ? {
                        ...post,
                        likedByUser: !post.likedByUser,
                        likesCount: post.likedByUser ? (post.likesCount ?? 0) - 1 : (post.likesCount ?? 0) + 1,
                      }
                    : post
                ),
              }))
            : currentData,
        false // Don't revalidate yet
      );
      await axios.post("http://localhost:4000/api/post/like", { postId });
      mutate();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const loadMore = () => {
    if (size < totalPages) {
      setSize(size + 1);
    }
  };

  const isReachingEnd = size >= totalPages;

  return {
    posts,
    isLoading: !data && !error,
    error,
    toggleLike,
    loadMore,
    isReachingEnd,
    isValidating,
    totalPages,
    currentPage: size,
    mutate,
  };
};
