import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { ProjectCardProps } from "@repo/data/types/types";

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card className="w-full bg-card text-card-foreground cursor-pointer overflow-hidden hover:shadow-xl hover:bg-muted" onClick={onClick}>
      <CardContent className="p-0 relative group">
        <img src={project.thumbnail || "/placeholder.png"} alt={project.title} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 ease-in-out"></div>
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
  );
}
