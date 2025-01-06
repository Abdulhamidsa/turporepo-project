import { Project as ProjectType } from "@repo/data/types/types";
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/ui/card";
import { Badge } from "lucide-react";
import { ExternalLink, Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { Link } from "react-router-dom";

interface ProjectProps {
  project: ProjectType;
}

export function Project({ project }: ProjectProps) {
  return (
    <Card className="bg-gray-900 border-gray-800 text-gray-200 max-w-2xl mx-auto">
      <CardHeader className="pb-2 px-4 pt-4">
        <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
      </CardHeader>
      <CardContent className="px-4">
        <div className="relative h-40 mb-4">
          <img src={project.thumbnail ?? ""} alt={project.title} className="rounded-lg" />
        </div>
        <p className="mb-4 text-gray-300">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag.id} className="bg-gray-800 text-primary">
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3 border-t border-gray-800 pt-3 pb-2 px-4">
        <Link ref={project.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center" to={""}>
          View Project <ExternalLink className="ml-2 w-4 h-4" />
        </Link>
        <div className="flex justify-between w-full">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary text-xs">
            <Heart className="w-4 h-4 mr-1" />
            Like
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary text-xs">
            <MessageCircle className="w-4 h-4 mr-1" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary text-xs">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
