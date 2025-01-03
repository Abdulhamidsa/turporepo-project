"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Heart, MessageCircle, Share2, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ui/components/ui/dropdown-menu";

interface PostProps {
  post: {
    id: number;
    content?: string;
    timestamp: string;
  };
  isPublicView: boolean;
}

export function Post({ post, isPublicView }: PostProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(post?.content || "");

  const handleSave = () => {
    // Here you would typically send the updated post to your backend
    console.log("Updated post:", { id: post.id, content });
    setIsEditing(false);
  };
  useEffect(() => {
    if (post) {
      setContent(post.content);
    }
  }, [post]);
  const handleDelete = () => {
    // Here you would typically send a delete request to your backend
    console.log("Deleting post:", post.id);
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        {isEditing ? <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="mb-2" /> : <p>{content}</p>}
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
        {!isPublicView &&
          (isEditing ? (
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
      </CardFooter>
    </Card>
  );
}
