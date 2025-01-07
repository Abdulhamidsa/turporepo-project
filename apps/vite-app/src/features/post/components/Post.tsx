import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";

type PostProps = {
  post: {
    _id: string;
    content: string;
    image: string | null;
    createdAt: string;
  };
  user: {
    _id: string;
    username: string;
    profilePicture: string;
  };
};

export function Post({ post, user }: PostProps) {
  return (
    <Card className="bg-card border border-border rounded-md shadow-md max-w-md mx-auto">
      <CardHeader className="px-4 py-3 flex items-center">
        <Avatar className="w-10 h-10 mr-3">
          <AvatarImage src={user?.profilePicture} alt={user?.username} />
          <AvatarFallback>{user?.username?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-card-foreground leading-tight">{user?.username || "Unknown User"}</p>
          <p className="text-xs text-muted-foreground leading-tight">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </CardHeader>

      <CardContent className="px-4 py-2">
        <p className="text-muted-foreground text-sm mb-3">{post.content}</p>
        {post.image && (
          <div className="relative w-full max-h-64 overflow-hidden rounded-md">
            <img src={post.image} alt="Post image" className="w-full h-auto object-cover rounded-md" />
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 py-2 border-t border-border">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex items-center text-muted-foreground hover:text-primary text-xs">
            <Heart className="w-4 h-4 mr-1" />
            Like
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center text-muted-foreground hover:text-primary text-xs">
            <MessageCircle className="w-4 h-4 mr-1" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center text-muted-foreground hover:text-primary text-xs">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
