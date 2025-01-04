import React from "react";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Label } from "@repo/ui/components/ui/label";
import TagInput from "./TagsInput";
import ImageUploader from "./ImageUploader";
import { AddProjectInput } from "@repo/zod/validation";

interface ProjectFormProps {
  project: AddProjectInput;
  setProject: React.Dispatch<React.SetStateAction<AddProjectInput>>;
  errors: Record<keyof AddProjectInput, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<keyof AddProjectInput, string>>>;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, setProject, errors, setErrors }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (tags: string[]) => {
    setErrors((prev) => ({ ...prev, tags: "" }));
    setProject((prev) => ({ ...prev, tags }));
  };

  const handleMediaChange = (media: string[]) => {
    setErrors((prev) => ({ ...prev, media: "" }));
    setProject((prev) => ({ ...prev, media: media.map((url) => ({ url })) }));
  };

  const handleThumbnailChange = (thumbnail: string[]) => {
    setErrors((prev) => ({ ...prev, thumbnail: "" }));
    setProject((prev) => ({ ...prev, thumbnail: thumbnail.length > 0 ? thumbnail[0] : undefined }));
  };

  return (
    <div className="p-6 rounded-r-lg overflow-y-auto">
      <h3 className="text-xl font-bold text-foreground mb-12">Upload Your Project</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-foreground">
            Project Title
          </Label>
          <Input id="title" name="title" value={project.title || ""} onChange={handleInputChange} className={`bg-input text-foreground border-border ${errors.title ? "border-red-500" : "border-gray-300"}`} />
          {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
        </div>

        <div>
          <Label htmlFor="description" className="text-foreground">
            Description
          </Label>
          <Textarea id="description" name="description" value={project.description || ""} onChange={handleInputChange} className={`bg-input text-foreground border-border ${errors.description ? "border-red-500" : "border-gray-300"}`} rows={4} />
          {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
        </div>

        <div>
          <Label htmlFor="url" className="text-foreground">
            Project URL
          </Label>
          <Input id="url" name="url" value={project.url || ""} onChange={handleInputChange} className={`bg-input text-foreground border-border ${errors.url ? "border-red-500" : "border-gray-300"}`} />
          {errors.url && <p className="text-sm text-destructive mt-1">{errors.url}</p>}
        </div>

        <div>
          <ImageUploader images={project.thumbnail ? [project.thumbnail] : []} setImages={handleThumbnailChange} isThumbnail error={errors.thumbnail} />
        </div>

        <div>
          <ImageUploader images={project.media?.map((media) => media.url) || []} setImages={handleMediaChange} error={errors.media} />
        </div>

        <div>
          <TagInput tags={project.tags || []} setTags={handleTagsChange} error={errors.tags} />
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;