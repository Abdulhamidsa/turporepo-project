import React from "react";
import { useFetchPosts } from "../../user/hooks/useFetchPosts"; // your custom hook
import { Post } from "./Post";

const PostList: React.FC = () => {
  const { posts, isLoading, error } = useFetchPosts();

  if (isLoading) {
    return <div className="text-primary">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-destructive">Error loading posts: {String(error)}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="text-muted-foreground">No posts available.</div>;
  }

  return (
    <div className="space-y-14">
      {posts.map((post) => (
        <Post
          key={post._id}
          post={{
            _id: post._id || "",
            content: post.content,
            image: post.image ?? null,
            createdAt: post.createdAt || "",
            likedByUser: post.likedByUser ?? false,
            likesCount: post.likesCount ?? 0,
            // If your schema includes comments:
            comments: post.comments || [],
          }}
          user={{
            _id: post.userId._id,
            username: post.userId.username,
            profilePicture: post.userId.profilePicture || "",
          }}
        />
      ))}
    </div>
  );
};

export default PostList;
