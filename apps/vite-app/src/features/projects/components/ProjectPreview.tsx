import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { Badge } from "@repo/ui/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { useUserProfile } from "../../user/hooks/use.user.profile";
import { AddProjectInput } from "@repo/zod/validation";

interface ProjectPreviewProps {
  project: AddProjectInput;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
  const { userProfile } = useUserProfile();

  return (
    <div className="p-6 rounded-l-lg overflow-y-auto">
      <h3 className="text-xl font-bold text-foreground mb-12">Live Preview</h3>
      <div className="mb-4">
        <img src={project.thumbnail || "/placeholder.png"} alt="Project Thumbnail" className="w-full h-48 object-cover rounded-lg" />
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={userProfile.profilePicture ?? "/default-profile.png"} alt={userProfile.username || "User"} />
          <AvatarFallback>{userProfile.username?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <span className="font-medium text-foreground">{userProfile.username}</span>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-foreground">{project.title}</h2>
      <p className="text-muted-foreground mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground">
            {tag}
          </Badge>
        ))}
      </div>
      {project.media.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          {project.media.map((image, index) => (
            <img key={index} src={image.url} alt={`Project image ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
          ))}
        </div>
      )}
      <Button asChild className="w-full bg-primary hover:bg-primary-foreground text-primary-foreground">
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
          <ExternalLink className="mr-2" /> Visit Project
        </a>
      </Button>
    </div>
  );
};

export default ProjectPreview;
