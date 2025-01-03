import { useState } from "react";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@repo/ui/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ui/components/ui/dropdown-menu";
import { MessageCircle, Heart, Share2, ExternalLink, MoreHorizontal, Pencil, Trash } from "lucide-react";

interface ProjectProps {
  project: {
    id: number;
    title: string;
    description: string;
    media: string;
  };
  isPublicView: boolean;
}

export function Project({ project, isPublicView }: ProjectProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);

  const handleSave = () => {
    // Here you would typically send the updated project to your backend
    console.log("Updated project:", { id: project.id, title, description });
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Here you would typically send a delete request to your backend
    console.log("Deleting project:", project.id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <img src={project.image} alt={project.title} width={200} height={200} className="w-full h-40 object-cover" />

            <div className="p-4">
              <h3 className="font-semibold">{project.title}</h3>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            {isEditing ? <Input value={title} onChange={(e) => setTitle(e.target.value)} className="font-bold text-lg" /> : project.title}
            {!isPublicView && !isEditing && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </DialogTitle>
          <DialogDescription>{isEditing ? <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2" /> : project.description}</DialogDescription>
        </DialogHeader>
        <img src={project.image} alt={project.title} width={400} height={300} className="w-full h-64 object-cover mb-4" />

        {isEditing ? (
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        ) : (
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
        )}
      </DialogContent>
    </Dialog>
  );
}
