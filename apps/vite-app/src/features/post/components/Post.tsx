import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { Heart } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { toggleLikePost } from "../../../../services/postService";
import { CommentBox } from "./CommentBox";
import { CommentType } from "@repo/zod/validation/post";

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

export function Post({ post, user }: PostProps) {
  const [likedByUser, setLikedByUser] = useState(post.likedByUser);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [comments, setComments] = useState(post.comments || []);

  const [showAllComments, setShowAllComments] = useState(false);
  const COMMENTS_TO_DISPLAY = 2;

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
    setShowAllComments(true);
  };

  const visibleComments = showAllComments ? comments : comments.slice(0, COMMENTS_TO_DISPLAY);

  const userProfilePic = user.profilePicture || "/path/to/placeholder.png";

  return (
    <Card className="space-y-2 w-full max-w-[500px] m-auto bg-card text-card-foreground p-4 rounded-[var(--radius)]">
      <CardHeader className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={userProfilePic} />
          <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="leading-tight">
          <h4 className="font-bold text-foreground">{user.username}</h4>
          <p className="text-sm text-muted-foreground">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </CardHeader>

      <CardContent>
        <p className="mb-2 text-foreground">{post.content}</p>
        {post.image && (
          <div className="max-w-xs">
            <img src={post.image} alt="Post" className="rounded-[var(--radius)] w-full" />
          </div>
        )}

        <div className="mt-4">
          <h5 className="font-semibold mb-2 text-foreground">Comments</h5>
          {comments.length > 0 ? (
            <>
              {visibleComments.map((cmt) => (
                <div key={cmt._id} className="mb-2 rounded-[var(--radius)] bg-muted px-3 py-2 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={cmt.userId?.profilePicture || "/path/to/placeholder.png"} />
                      <AvatarFallback>{cmt.userId?.username ? cmt.userId.username.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                    </Avatar>
                    <strong className="text-sm">{cmt.userId?.username ?? "MysteriousUser"}</strong>
                  </div>
                  <span className="text-muted-foreground text-sm mt-1">{cmt.text}</span>
                  <div className="text-xs text-muted-foreground mt-1">{cmt.createdAt ? new Date(cmt.createdAt).toLocaleString() : "Unknown date"}</div>
                </div>
              ))}

              {comments.length > COMMENTS_TO_DISPLAY && (
                <Button variant="ghost" className="text-sm text-accent hover:text-accent-foreground" onClick={() => setShowAllComments(!showAllComments)}>
                  {showAllComments ? "Show Less" : `View All (${comments.length})`}
                </Button>
              )}
            </>
          ) : (
            <p className="italic text-sm text-muted-foreground">No comments yet, boss. Be the first to drop some love!</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        <Button onClick={handleLikeClick} className="flex items-center text-primary-foreground">
          <Heart className={likedByUser ? "text-primary mr-2" : "mr-2"} />
          {likesCount} {likedByUser ? "Unlike" : "Like"}
        </Button>

        <CommentBox postId={post._id} onCommentAdded={handleCommentAdded} />
      </CardFooter>
    </Card>
  );
}
