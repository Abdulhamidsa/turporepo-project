import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import { request, getErrorMessage } from "../../../utils/axiosConfige";
import imageCompression from "browser-image-compression";

export const ProjectUploadForm = () => {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]); // Dynamic tags state

  // Compress image function
  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 0.3, // Compress to 0.3 MB
      maxWidthOrHeight: 800, // Resize images larger than 800px
      useWebWorker: true, // Use Web Workers for better performance
    };
    return await imageCompression(file, options);
  };

  // Upload files to Cloudinary
  const uploadFilesToCloudinary = async (files: File[]): Promise<string[]> => {
    return await Promise.all(
      files.map(async (file) => {
        const compressedFile = await compressImage(file);
        const formData = new FormData();
        formData.append("file", compressedFile);
        formData.append("upload_preset", "portfoliohub");

        const response = await fetch("https://api.cloudinary.com/v1_1/dtaceicn1/image/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("File upload failed");
        }

        const data = await response.json();
        return data.secure_url;
      })
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: "projectImage" | "projectThumbnail") => {
    const files = e.target.files;
    if (files) {
      if (fieldName === "projectImage") {
        setValue("projectImage", Array.from(files), { shouldValidate: false });
      } else if (fieldName === "projectThumbnail") {
        setValue("projectThumbnail", files[0], { shouldValidate: false });
      }
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    if (e.key === "Enter" && value) {
      e.preventDefault();
      if (tags.length < 5 && !tags.includes(value)) {
        setTags((prevTags) => [...prevTags, value]);
        e.currentTarget.value = ""; // Clear input field
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const onSubmit = async () => {
    if (loading) return; // Prevent multiple calls
    setLoading(true);

    try {
      const formData = getValues();

      // Upload images in parallel
      const uploadedImageUrls = await uploadFilesToCloudinary(formData.projectImage);
      const uploadedThumbnailUrl = formData.projectThumbnail ? await uploadFilesToCloudinary([formData.projectThumbnail]) : null;

      const payload = {
        title: formData.title,
        description: formData.description,
        projectUrl: formData.projectUrl,
        projectImage: uploadedImageUrls.map((url) => ({ url })),
        projectThumbnail: uploadedThumbnailUrl ? uploadedThumbnailUrl[0] : null,
        tags,
      };

      await request("POST", "/internal/project", payload);
      setResponseMessage("Project uploaded successfully!");
      reset();
      setTags([]);
    } catch (error) {
      setResponseMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-card text-card-foreground rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Upload Your Project</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="title">Project Title</Label>
          <Input id="title" placeholder="Enter project title" {...register("title")} className="bg-input text-foreground" />
        </div>

        <div>
          <Label htmlFor="description">Project Description</Label>
          <textarea id="description" rows={3} placeholder="Write a brief description of your project" {...register("description")} className="w-full px-4 py-2 bg-input text-foreground border rounded-md focus:outline-none focus:ring focus:ring-ring" />
        </div>

        <div>
          <Label htmlFor="projectUrl">Project URL</Label>
          <Input id="projectUrl" placeholder="Enter the project URL" {...register("projectUrl")} className="bg-input text-foreground" />
        </div>

        <div>
          <Label htmlFor="tags">Tags</Label>
          <Input id="tags" placeholder="Add a tag and press Enter" onKeyDown={handleAddTag} className="bg-input text-foreground" />
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="inline-flex items-center px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                #{tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2 text-primary-foreground hover:text-destructive-foreground">
                  &times;
                </button>
              </span>
            ))}
          </div>
          <small className="text-muted-foreground">You can add up to 5 tags.</small>
        </div>

        <div>
          <Label htmlFor="projectImage">Upload Project Images</Label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileChange(e, "projectImage")}
            className="block w-full text-sm text-muted-foreground bg-input file:mr-4 file:py-2 file:px-4 file:border file:border-border file:rounded-md file:bg-muted file:text-muted-foreground"
          />
        </div>

        <div>
          <Label htmlFor="projectThumbnail">Upload Project Thumbnail</Label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "projectThumbnail")}
            className="block w-full text-sm text-muted-foreground bg-input file:mr-4 file:py-2 file:px-4 file:border file:border-border file:rounded-md file:bg-muted file:text-muted-foreground"
          />
        </div>

        <Button type="submit" disabled={loading} className={`w-full ${loading ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"}`}>
          {loading ? "Uploading..." : "Upload Project"}
        </Button>
      </form>

      {responseMessage && <p className={`mt-4 text-center ${responseMessage.includes("successfully") ? "text-accent-foreground" : "text-destructive-foreground"}`}>{responseMessage}</p>}
    </div>
  );
};
