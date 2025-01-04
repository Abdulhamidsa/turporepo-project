import { addProjectSchema, AddProjectInput } from "@repo/zod/validation"; // Adjust path as needed
import { request } from "../../api/request"; // Assuming request.ts is in the api folder

export const useCreateProject = () => {
  const urlCreate = "/internal/project";

  /**
   * Creates a new project and validates the response
   * @param project - The project data to create
   */
  const createProject = async (project: AddProjectInput): Promise<AddProjectInput> => {
    const payload = addProjectSchema.parse(project); // Validate input before sending

    const newProject = await request<AddProjectInput>("POST", urlCreate, payload, addProjectSchema);

    return newProject;
  };

  return { createProject };
};
