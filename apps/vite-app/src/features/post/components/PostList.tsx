import { useFetchPosts } from "../../user/hooks/useFetchPosts";
import { Post } from "./Post";

export function PostList() {
  const { posts, error, isLoading } = useFetchPosts();

  // Handle errors
  if (error) {
    return <div className="text-center text-destructive">Failed to load posts.</div>;
  }

  // Show loading spinner
  if (isLoading) {
    return <div className="flex justify-center items-center h-40">{/* Loading spinner */}</div>;
  }

  return (
    <div className="space-y-14">
      {posts?.map((post) => (
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
}
