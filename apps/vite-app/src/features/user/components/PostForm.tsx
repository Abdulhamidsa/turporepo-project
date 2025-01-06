"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { ImagePlus, X } from "lucide-react";
import { useUserProfile } from "../hooks/use.user.profile";
import { uploadToCloudinary } from "../../../../utils/CloudinaryConfige";
import { usePostSubmit } from "../../../hooks/useCreatePost";
import { showToast } from "@repo/ui/components/ui/toaster";
import { useFetchPosts } from "../hooks/useFetchPosts";

export function PostForm({ onClose }: { onClose: () => void }) {
  const { userProfile } = useUserProfile();
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { trigger, isMutating, error } = usePostSubmit();
  const { mutate: MutateFetchPosts } = useFetchPosts();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!content && !image) {
      showToast("At least a text or an image is required.", "error");
      return;
    }
    try {
      let imageUrl: string = "";
      // Upload image if provided
      if (image) {
        const urls = await uploadToCloudinary([image]);
        imageUrl = urls[0];
      }
      // Prepare payload
      const payload = {
        content,
        image: imageUrl,
      };
      // Trigger the mutation
      await trigger(payload);
      showToast("Post uploaded successfully!", "success");
      setContent("");
      onClose();
      setImage(null);
      setImagePreview(null);
      await MutateFetchPosts();
    } catch (err) {
      console.error("Error uploading post:", err);
      showToast("Failed to upload post.", "error");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex justify-between items-center p-4">
        <h3 className="text-lg font-semibold">Create Post</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src={userProfile.profilePicture ?? "/placeholder.png"} alt="Your Name" />
            <AvatarFallback>{userProfile.username}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm">{userProfile.username}</span>
        </div>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?" className="w-full h-20 border border-gray-300 rounded-md p-2 text-sm" />
        <div className="relative mt-4">
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
          <label htmlFor="image-upload" className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition-colors duration-300">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="rounded-md max-h-full object-contain" />
            ) : (
              <div className="flex flex-col items-center">
                <ImagePlus className="h-6 w-6 text-gray-400" />
                <span className="mt-1 text-xs text-gray-500">Add an image</span>
              </div>
            )}
          </label>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-4">
        <Button onClick={handleSubmit} disabled={isMutating}>
          {isMutating ? "Uploading..." : "Post"}
        </Button>
      </CardFooter>
      {error && <p className="text-center text-sm text-red-500 mt-2">{error.message}</p>}
    </Card>
  );
}
