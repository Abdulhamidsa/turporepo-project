import React from "react";
import { useFetchPosts } from "../../user/hooks/useFetchPosts";
import { Post } from "./Post";

const PostList: React.FC = () => {
  const { posts, isLoading, error } = useFetchPosts();

  if (isLoading) {
    return <div className="text-primary">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-destructive">Error loading posts: {error}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="text-muted-foreground">No posts available.</div>;
  }

  return (
    <div className="space-y-14">
      {Array.isArray(posts) &&
        posts.length > 0 &&
        posts.map((post) => (
          <Post
            key={post.id}
            post={{
              _id: post.id,
              content: post.content,
              image: post.image,
              createdAt: post.createdAt,
            }}
            user={{
              _id: post.userId._id,
              username: post.userId.username,
              profilePicture: post.userId.profilePicture,
            }}
          />
        ))}
    </div>
  );
};

export default PostList;
