export default function Feed({ posts }: { posts: Array<{ id: number; user: string; content: string }> }) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-card p-4 rounded-lg shadow">
          <p className="text-muted-foreground">@{post.user}</p>
          <p className="mt-2">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
