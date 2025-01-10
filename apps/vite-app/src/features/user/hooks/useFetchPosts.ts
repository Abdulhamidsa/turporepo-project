import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import { swrFetcher } from "../../../../api/swrFetcher";
import { PostType } from "@repo/zod/validation/post";
import { request } from "../../../../api/request";
import { ENDPOINTS } from "@repo/api/endpoints";

/**
 * Hook for fetching paginated posts and toggling likes.
 */
export const useFetchPosts = () => {
  const [limit] = useState(10);

  // SWR Infinite for paginated fetching
  const { data, error, size, setSize, mutate, isValidating } = useSWRInfinite<{
    posts: PostType[];
    totalPages: number;
    currentPage: number;
  }>(
    (pageIndex) => `${ENDPOINTS.posts.fetch}?limit=${limit}&page=${pageIndex + 1}`,
    (url) => swrFetcher(url),
    {
      revalidateOnFocus: false,
    }
  );

  // Combine posts from all fetched pages
  const posts = data ? data.flatMap((page) => page.posts).sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()) : [];
  const totalPages = data?.[0]?.totalPages ?? 0;

  /**
   * Toggle like on a post.
   * Optimistically updates the local state before making the API call.
   */
  const toggleLike = async (postId: string) => {
    try {
      // Optimistic update
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

      // Make the API request to toggle like
      await request("POST", ENDPOINTS.posts.like, {
        postId,
      });

      // Revalidate the data after the API call
      mutate();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  /**
   * Load the next page of posts.
   */
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
