import { useState } from "react";
import CustomModal from "../../../../../../packages/ui/src/components/CustomModal";
import { showToast } from "@repo/ui/components/ui/toaster";
import { getErrorMessage } from "../../../../api/errors";
import ProjectPreview from "./ProjectPreview";
import ProjectForm from "./ProjectForm";
import SaveButton from "./SaveButton";
import { addProjectSchema, AddProjectInput } from "@repo/zod/validation"; // Use Zod schema and types
import { useCreateProject } from "../../../hooks/useCreateProject"; // Adjust the import path
import { ZodError } from "zod";
import { AddProjectModalProps } from "@repo/data/types/types";
import { uploadToCloudinary } from "../../../../utils/CloudinaryConfige";
import { useUserProjects } from "../../user/hooks/use.user.profile";

const initialProject: AddProjectInput = {
  title: "",
  description: "",
  url: "",
  media: [],
  thumbnail: "",
  tags: [],
};

export default function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
  const [project, setProject] = useState<AddProjectInput>(initialProject);
  const [loading, setLoading] = useState(false);
  const { createProject } = useCreateProject();
  const { mutate: mutateProjects } = useUserProjects();
  const [errors, setErrors] = useState<Record<keyof AddProjectInput, string>>({
    title: "",
    description: "",
    url: "",
    thumbnail: "",
    tags: "",
    media: "",
  });

  // States for pending files
  const [pendingThumbnail, setPendingThumbnail] = useState<File | null>(null);
  const [pendingMedia, setPendingMedia] = useState<File[]>([]);

  /**
   * Handles the save project action
   */
  const saveProject = async () => {
    if (loading) return;

    setLoading(true);
    try {
      // Step 1: Upload thumbnail if pending
      let thumbnailUrl = project.thumbnail;
      if (pendingThumbnail) {
        const [uploadedThumbnail] = await uploadToCloudinary([pendingThumbnail]);
        thumbnailUrl = uploadedThumbnail;
      }

      // Step 2: Upload media if any pending
      let mediaUrls = project.media.map((m) => m.url);
      if (pendingMedia.length > 0) {
        const uploadedMedia = await uploadToCloudinary(pendingMedia);
        mediaUrls = [...mediaUrls, ...uploadedMedia];
      }

      // Step 3: Prepare the final project data with uploaded URLs
      const finalProject: AddProjectInput = {
        ...project,
        thumbnail: thumbnailUrl,
        media: mediaUrls.map((url) => ({ url })),
      };

      // Step 4: Validate the final project with Zod
      const validatedProject = addProjectSchema.parse(finalProject);

      // Step 5: Call the create project mutation
      await createProject(validatedProject);

      // Step 6: Update the projects list by calling mutate
      mutateProjects(); // This will revalidate the projects list

      showToast("Project uploaded successfully!", "success");

      // Reset the form and close the modal
      setProject(initialProject);
      setPendingThumbnail(null);
      setPendingMedia([]);
      setErrors({
        title: "",
        description: "",
        url: "",
        thumbnail: "",
        tags: "",
        media: "",
      });
      onClose();
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors
        const fieldErrors = error.errors.reduce(
          (acc, curr) => {
            const field = curr.path[0] as keyof AddProjectInput;
            acc[field] = curr.message;
            return acc;
          },
          {} as Record<keyof AddProjectInput, string>
        );

        setErrors((prev) => ({ ...prev, ...fieldErrors }));
      } else {
        // Handle other errors
        showToast(getErrorMessage(error), "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal size="3xl" width="800px" isOpen={isOpen} onClose={onClose}>
      <div className="grid md:grid-cols-2 gap-4 h-[450px] m-auto">
        {/* Pass pending thumbnail and media to ProjectPreview */}
        <div className="hidden md:block">
          <ProjectPreview project={project} pendingThumbnail={pendingThumbnail} pendingMedia={pendingMedia} />
        </div>{" "}
        <ProjectForm project={project} setProject={setProject} errors={errors} setErrors={setErrors} pendingThumbnail={pendingThumbnail} setPendingThumbnail={setPendingThumbnail} pendingMedia={pendingMedia} setPendingMedia={setPendingMedia} />
        <div className="">
          <SaveButton onClick={saveProject} loading={loading} />
        </div>
      </div>
    </CustomModal>
  );
}
