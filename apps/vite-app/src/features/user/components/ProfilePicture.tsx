import { useRef, useState } from "react";
import { Camera, Loader } from "lucide-react";
import { uploadToCloudinary } from "../../../../utils/CloudinaryConfige";
import { useUserProfile, useUpdateUserProfile } from "../../user/hooks/use.user.profile";
import { showToast } from "@repo/ui/components/ui/toaster";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@repo/ui/components/ui/dropdown-menu";

interface ProfilePictureEditProps {
  label: string;
  field: "profilePicture" | "coverImage";
}

export default function ProfilePictureEdit({ label, field }: ProfilePictureEditProps) {
  const { userProfile, mutate } = useUserProfile();
  const { updateProfile } = useUpdateUserProfile();
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const [uploadedUrl] = await uploadToCloudinary([file]);

      const updatedProfile = {
        profilePicture: uploadedUrl,
        username: userProfile.username,
        age: userProfile.age,
      };

      await updateProfile(updatedProfile);
      await mutate();

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      showToast(`${label} updated successfully!`);
    } catch (error) {
      console.error("Failed to upload image:", error);
      showToast("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageRemove = async () => {
    if (!userProfile[field]) return;

    setIsUploading(true);
    try {
      const updatedProfile = {
        [field]: null,
        username: userProfile.username,
        age: userProfile.age,
      };

      await updateProfile(updatedProfile);
      await mutate();

      showToast(`${label} removed successfully!`);
    } catch (error) {
      console.error("Failed to remove image:", error);
      showToast("Error removing image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <img src={userProfile[field] || "/placeholder.png"} alt={label} className="w-full h-48 object-cover rounded-lg border border-border shadow-md" />
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted bg-opacity-75 rounded-lg">
          <Loader className="h-10 w-10 text-primary animate-spin" />
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="absolute bottom-2 right-2 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg">
            <Camera className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36 bg-card text-card-foreground rounded-lg shadow-lg">
          <DropdownMenuItem onClick={() => fileInputRef.current?.click()} className="hover:bg-accent hover:text-accent-foreground rounded-md p-2">
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleImageRemove} className="hover:bg-destructive hover:text-destructive-foreground rounded-md p-2">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input id={`${field}-upload`} type="file" className="hidden" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" disabled={isUploading} />
    </div>
  );
}
