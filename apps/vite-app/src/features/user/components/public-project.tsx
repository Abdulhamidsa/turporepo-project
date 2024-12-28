import Image from "next/image";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@repo/ui/components/ui/dialog";
import { MessageCircle, Heart, Share2, ExternalLink } from "lucide-react";

interface PublicProjectProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
}

export function PublicProject({ project }: PublicProjectProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <Image src={project.image} alt={project.title} width={200} height={200} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{project.title}</h3>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>
        <Image src={project.image} alt={project.title} width={400} height={300} className="w-full h-64 object-cover mb-4" />
        <div className="flex justify-between mt-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <Button>
            <ExternalLink className="h-4 w-4 mr-2" />
            View Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
