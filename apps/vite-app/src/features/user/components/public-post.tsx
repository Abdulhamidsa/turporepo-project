import { Card, CardContent, CardFooter } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface PublicPostProps {
  post: {
    id: number;
    content: string;
    timestamp: string;
  };
}

export function PublicPost({ post }: PublicPostProps) {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <p>{post.content}</p>
        <p className="text-sm text-gray-500 mt-2">{post.timestamp}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Like
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            Comment
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
