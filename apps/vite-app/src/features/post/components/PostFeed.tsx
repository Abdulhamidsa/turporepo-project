import { useState, useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { Heart, MessageCircle } from "lucide-react";
import { toggleLikePost } from "../../../../services/postService";
import { CommentBox } from "./CommentBox";
import { CommentType } from "@repo/zod/validation/post";
import { timeAgo } from "@repo/utils/timeCalculation";

type PostProps = {
  post: {
    _id: string;
    content: string;
    image: string | null;
    createdAt: string;
    likedByUser: boolean;
    likesCount: number;
    comments: CommentType[];
  };
  user: { _id: string; username: string; profilePicture: string };
};

export function PostFeed({ post, user }: PostProps) {
  const [likedByUser, setLikedByUser] = useState(post.likedByUser);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [comments, setComments] = useState<CommentType[]>(post.comments);
  const [showComments, setShowComments] = useState(false);
  const [highlightedCommentId, setHighlightedCommentId] = useState<string | null>(null);
  const lastCommentRef = useRef<HTMLDivElement | null>(null);

  const handleLikeClick = async () => {
    try {
      await toggleLikePost(post._id);
      setLikedByUser(!likedByUser);
      setLikesCount((prev) => (likedByUser ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };
  const handleCommentAdded = (updatedComments: CommentType[]) => {
    setComments(updatedComments);
    // Get the last added comment ID
    const lastComment = updatedComments[updatedComments.length - 1];
    setHighlightedCommentId(lastComment.userId._id + "-" + lastComment.createdAt);
    // Remove highlight after 3 seconds
    setTimeout(() => setHighlightedCommentId(null), 3000);
    // Scroll to the last comment after adding
    setTimeout(() => {
      if (lastCommentRef.current) {
        lastCommentRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 100);
  };

  return (
    <Card className="space-y-4 w-full max-w-100% min-h-[200px] m-auto bg-card text-card-foreground p-4 rounded-[var(--radius)] shadow-md">
      {/* Post Header */}
      <CardHeader className="flex items-start flex-row space-x-4">
        <Avatar className="flex-shrink-0">
          <AvatarImage src={user.profilePicture || "/path/to/placeholder.png"} />
          <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="leading-tight flex-grow">
          <h4 className="font-bold text-foreground">{user.username}</h4>
          <p className="text-sm text-muted-foreground">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </CardHeader>

      {/* Post Content */}
      <CardContent className="space-y-4 border-b border-muted pb-4">
        <p className="text-foreground">{post.content}s</p>
        {post.image && (
          <div className="rounded-[var(--radius)] overflow-hidden">
            <img src={post.image} alt="Post" className="w-full" />
          </div>
        )}
      </CardContent>

      {/* Like and Comment Icon Section */}
      <CardFooter className="flex items-center justify-between space-x-4">
        <div className={`flex items-center space-x-2 cursor-pointer transition-transform duration-300 ${likedByUser ? "text-primary scale-110" : "text-muted-foreground"}`} onClick={handleLikeClick}>
          <Heart className="w-6 h-6" />
          <span className="text-base font-medium">{likesCount}</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer text-muted-foreground hover:text-primary" onClick={() => setShowComments(!showComments)}>
          <MessageCircle className="w-6 h-6" />
          <span className="text-base font-medium">{comments.length}</span>
        </div>
      </CardFooter>

      {/* Comments Section with Animation */}
      <div className={`transition-all duration-500 overflow-hidden ${showComments ? "max-h-[300px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
        {/* Add Comment Input */}
        <CommentBox postId={post._id} onCommentAdded={handleCommentAdded} />

        {/* Comments Container */}
        <div className="mt-4 max-h-60 overflow-y-auto space-y-4 rounded-lg p-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted">
          {comments.length > 0 ? (
            comments.map((cmt, index) => (
              <div
                key={`${cmt.userId._id}-${cmt.createdAt}-${index}`}
                ref={index === comments.length - 1 ? lastCommentRef : null}
                className={`border border-border rounded-md p-3 bg-card transition-all duration-300 ${highlightedCommentId === `${cmt.userId._id}-${cmt.createdAt}` ? "ring-2 ring-primary" : ""}`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={cmt.userId.profilePicture || "/placeholder.png"} />
                    <AvatarFallback>{cmt.userId?.username.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <strong className="text-sm text-foreground">{cmt.userId?.username ?? "Anonymous"}</strong>
                    <span className="text-xs text-muted-foreground">{timeAgo(cmt.createdAt ?? "")}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{cmt.text}</p>
              </div>
            ))
          ) : (
            <p className="italic text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </Card>
  );
}
