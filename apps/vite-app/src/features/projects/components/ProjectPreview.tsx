import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { AddProjectInput } from "@repo/zod/validation";

interface ProjectPreviewProps {
  project: AddProjectInput;
  pendingThumbnail: File | null;
  pendingMedia: File[];
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project, pendingThumbnail, pendingMedia }) => {
  const thumbnailUrl = pendingThumbnail ? URL.createObjectURL(pendingThumbnail) : project.thumbnail || "/placeholder.png";

  const mediaUrls = pendingMedia.length > 0 ? pendingMedia.map((file) => URL.createObjectURL(file)) : project.media.map((media) => media.url);

  return (
    <Card className="w-full bg-card text-card-foreground overflow-hidden hover:shadow-xl">
      <CardContent className="p-0 relative">
        {/* Thumbnail */}
        <img src={thumbnailUrl} alt={project.title} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 ease-in-out"></div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          {/* Title and Description */}
          <h3 className="text-xl font-bold mb-2">{project.title || "Untitled Project"}</h3>
          <p className="text-sm text-muted-foreground mb-4">{project.description || "No description provided."}</p>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      {mediaUrls.length > 0 && (
        <CardContent className="p-4">
          <h4 className="text-lg font-semibold mb-2">Gallery</h4>
          <div className="grid grid-cols-2 gap-2">
            {mediaUrls.map((url, index) => (
              <img key={index} src={url} alt={`Project image ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ProjectPreview;
