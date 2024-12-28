"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Label } from "@repo/ui/components/ui/label";
import { Input } from "@repo/ui/components/ui/input";
import { Bold, Italic, Underline, List, ListOrdered, ImageIcon } from "lucide-react";

interface PostFormProps {
  onPost?: () => void;
}

export function PostForm({ onPost }: PostFormProps) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the post to your backend
    console.log("New post:", { content, image });
    onPost?.();
    setContent("");
    setImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const insertMarkdown = (tag: string) => {
    const textarea = document.getElementById("post-content") as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);
    const newText = `${before}${tag}${selection}${tag}${after}`;
    setContent(newText);
    textarea.focus();
    textarea.setSelectionRange(start + tag.length, end + tag.length);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="post-content">Content</Label>
        <div className="flex space-x-2 mb-2">
          <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("**")}>
            <Bold className="h-4 w-4" />
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("*")}>
            <Italic className="h-4 w-4" />
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("__")}>
            <Underline className="h-4 w-4" />
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("\n- ")}>
            <List className="h-4 w-4" />
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("\n1. ")}>
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
        <Textarea id="post-content" placeholder="What's on your mind?" value={content} onChange={(e) => setContent(e.target.value)} rows={5} className="resize-none" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="post-image">Image</Label>
        <div className="flex items-center space-x-2">
          <Input id="post-image" type="file" accept="image/*" onChange={handleImageChange} className="flex-grow" />
          <Button type="button" size="icon" variant="outline" onClick={() => document.getElementById("post-image")?.click()}>
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
        {image && <p className="text-sm text-gray-500">Selected image: {image.name}</p>}
      </div>
      <div className="flex justify-end">
        <Button type="submit">Post</Button>
      </div>
    </form>
  );
}
