"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ui/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog";
import { PostForm } from "./post-form";
import { AddProjectForm } from "./add-project-form";

export function AddContentButton() {
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="mb-6">
            <Plus className="h-4 w-4 mr-2" />
            Add Content
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setIsPostDialogOpen(true)}>Add Post</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsProjectDialogOpen(true)}>Add Project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Post</DialogTitle>
          </DialogHeader>
          <PostForm onPost={() => setIsPostDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <AddProjectForm onAdd={() => setIsProjectDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
