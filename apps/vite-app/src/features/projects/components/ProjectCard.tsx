import { useState } from "react";
import { ProjectCardProps } from "@repo/data/types/types";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteProject } from "../../../hooks/useDeleteProject";
import CustomModal from "@repo/ui/components/CustomModal";
import { useUserProjects } from "../../user/hooks/useUserProjects";

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { deleteProject } = useDeleteProject();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useUserProjects();
  const handleDelete = async () => {
    const projectId = project.id;

    if (!projectId) {
      console.error("Project ID is missing!");
      return;
    }

    try {
      // Optimistically remove the project from the UI
      mutate(
        (currentProjects) => currentProjects?.filter((p) => p.id !== projectId),
        false // Skip revalidation (instant UI update)
      );

      // Proceed with deletion on the server
      await deleteProject(projectId);

      // Revalidate data to sync with server
      await mutate();

      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete project:", error);

      // Optional: Re-fetch to correct UI if deletion fails
      await mutate();
    }
  };

  return (
    <>
      <Card className="relative w-full bg-card text-card-foreground cursor-pointer overflow-hidden group" onClick={onClick}>
        <CardContent className="p-0 relative">
          {/* Project Image */}
          <img src={project.thumbnail || "/placeholder.png"} alt={project.title} className="w-full h-64 object-cover" />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 ease-in-out"></div>

          <Button
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true); // Open modal
            }}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-all duration-300"
            size="icon"
          >
            <Trash2 className="w-5 h-5" />
          </Button>

          {/* Project Details */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge key={tag.id} variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Delete Confirmation Modal */}
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="md">
        <h2 className="text-xl font-semibold mb-4 text-center">Delete Project</h2>
        <p className="text-center text-muted-foreground mb-6">
          Are you sure you want to delete the project <span className="font-bold text-destructive">{project.title}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </CustomModal>
    </>
  );
}
