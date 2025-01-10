import { ENDPOINTS } from "@repo/api/endpoints";
import { request } from "../../api/request";

export const useDeleteProject = () => {
  const deleteProject = async (projectId: string) => {
    if (!projectId) {
      console.error("Project ID is missing");
      return;
    }

    try {
      await request("DELETE", `${ENDPOINTS.projects.delete}/${projectId}`);
      console.info(`Project with ID ${projectId} deleted successfully.`);
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return { deleteProject };
};
