import React, { useRef, useEffect } from "react";
import { useFetchPosts } from "../../user/hooks/useFetchPosts";
import { PostFeed } from "./PostFeed";

const PostList: React.FC = () => {
  const { posts, isLoading, error, loadMore, isReachingEnd, isValidating } = useFetchPosts();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentLoader = loaderRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isValidating && !isReachingEnd) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMore, isReachingEnd, isValidating]);

  if (isLoading && posts.length === 0) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error loading posts: {String(error)}</div>;
  }

  return (
    <div className="space-y-14">
      {posts.map((post) => (
        <PostFeed
          key={post._id}
          post={{
            _id: post._id,
            content: post.content,
            image: post.image ?? null,
            createdAt: post.createdAt ?? "",
            likedByUser: post.likedByUser ?? false,
            likesCount: post.likesCount ?? 0,
            comments: post.comments ?? [],
          }}
          user={{
            _id: post.userId._id,
            username: post.userId.username,
            profilePicture: post.userId.profilePicture ?? "",
          }}
        />
      ))}

      {!isReachingEnd && (
        <div ref={loaderRef} className="text-center py-4">
          {isValidating ? "Loading more..." : ""}
        </div>
      )}
    </div>
  );
};

export default PostList;
