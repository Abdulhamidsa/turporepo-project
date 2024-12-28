"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Label } from "@repo/ui/components/ui/label";

interface AddProjectFormProps {
  onAdd?: () => void;
}

export function AddProjectForm({ onAdd }: AddProjectFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the new project data to your backend
    console.log("New project:", { title, description, image });
    onAdd?.();
    // Reset form
    setTitle("");
    setDescription("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Project Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" type="url" value={image} onChange={(e) => setImage(e.target.value)} required />
      </div>
      <Button type="submit">Add Project</Button>
    </form>
  );
}
