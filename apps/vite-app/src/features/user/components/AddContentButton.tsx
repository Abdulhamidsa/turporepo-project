import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ui/components/ui/dropdown-menu";
import { PostForm } from "./post-form";
import AddProjectModal from "../../projects/components/addProjectModal";
import CustomModal from "../../../../../../packages/ui/src/components/CustomModal";

export function AddContentButton() {
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary-foreground hover:text-primary">
            <Plus className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-card text-card-foreground rounded-lg shadow-lg">
          <DropdownMenuItem className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground rounded-md p-2" onSelect={() => setIsPostDialogOpen(true)}>
            Add Post
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground rounded-md p-2" onSelect={() => setIsProjectDialogOpen(true)}>
            Add Project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CustomModal isOpen={isPostDialogOpen} onClose={() => setIsPostDialogOpen(false)} size="lg">
        <div>
          <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
          <PostForm onPost={() => setIsPostDialogOpen(false)} />
        </div>
      </CustomModal>
      <AddProjectModal isOpen={isProjectDialogOpen} onClose={() => setIsProjectDialogOpen(false)} />
    </>
  );
}
