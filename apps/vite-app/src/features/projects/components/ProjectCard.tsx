import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Avatar } from "@repo/ui/components/ui/avatar";
import { Badge } from "@repo/ui/components/ui/badge";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    media: {
      url: string;
    }[];
    tags: {
      id: string;
      name: string;
    }[];
    createdAt: string;
    updatedAt: string;
  };
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card className="w-full bg-card text-card-foreground cursor-pointer overflow-hidden hover:shadow-xl hover:bg-muted" onClick={onClick}>
      <CardContent className="p-0 relative group">
        <img src={project.thumbnail} alt={project.title} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 ease-in-out"></div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="w-10 h-10 border border-border">
              {/* <AvatarImage src={project.user} alt={project.user.name} /> */}
              {/* <AvatarFallback>{project.user.name.charAt(0)}</AvatarFallback> */}
            </Avatar>
            {/* <p className="text-sm font-medium">{project}</p> */}
          </div>
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
