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

const initialProject: AddProjectInput = {
  title: "",
  description: "",
  url: "",
  media: [],
  thumbnail: "/placeholder.png",
  tags: [],
};

export default function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
  const [project, setProject] = useState<AddProjectInput>(initialProject);
  const [loading, setLoading] = useState(false);
  const { createProject } = useCreateProject();
  const [errors, setErrors] = useState<Record<keyof AddProjectInput, string>>({
    title: "",
    description: "",
    url: "",
    thumbnail: "",
    tags: "",
    media: "",
  });

  /**
   * Handles the save project action
   */
  const saveProject = async () => {
    if (loading) return;

    setLoading(true);
    try {
      // Validate the project with Zod
      const validatedProject = addProjectSchema.parse(project);

      // Call the create project function
      await createProject(validatedProject);

      showToast("Project uploaded successfully!", "success");

      // Reset the form and close the modal
      setProject(initialProject);
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
    <CustomModal size="3xl" height="90%" isOpen={isOpen} onClose={onClose}>
      <div className="grid md:grid-cols-2 gap-4 h-[500px]">
        <ProjectPreview project={project} />
        <ProjectForm project={project} setProject={setProject} errors={errors} setErrors={setErrors} />
        <div className="md:col-span-2 p-6">
          <SaveButton onClick={saveProject} loading={loading} />
        </div>
      </div>
    </CustomModal>
  );
}
