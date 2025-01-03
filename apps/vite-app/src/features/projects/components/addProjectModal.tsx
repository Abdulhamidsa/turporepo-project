import { uploadToCloudinary } from "../../../../utils/CloudinaryConfige";
import { useState } from "react";
import CustomModal from "../components/CustomModal";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Label } from "@repo/ui/components/ui/label";
import { Badge } from "@repo/ui/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { X, Plus, ExternalLink } from "lucide-react";
import { getErrorMessage } from "../../../../api/errors";
import { request } from "../../../../api/request";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
  const [project, setProject] = useState({
    title: "",
    description: "",
    url: "",
    media: [] as string[], // URLs from Cloudinary
    thumbnail: null as string | null, // URL from Cloudinary
    tags: [] as string[],
    user: {
      name: "John Doe", // This can be dynamic if necessary
      avatar: "/placeholder.png",
    },
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      e.preventDefault();
      setProject({
        ...project,
        tags: [...project.tags, e.currentTarget.value.trim()],
      });
      e.currentTarget.value = "";
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isThumb: boolean = false) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        const uploadedUrls = await uploadToCloudinary(Array.from(e.target.files));
        if (isThumb) {
          setProject({
            ...project,
            thumbnail: uploadedUrls[0],
          });
        } else {
          setProject({
            ...project,
            media: [...project.media, ...uploadedUrls],
          });
        }
      } catch (error) {
        setResponseMessage(getErrorMessage(error));
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setProject({
      ...project,
      tags: project.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const removeImage = (imageToRemove: string) => {
    setProject({
      ...project,
      media: project.media.filter((image) => image !== imageToRemove),
    });
  };

  const saveProject = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const payload = {
        title: project.title,
        description: project.description,
        url: project.url,
        media: project.media.map((url) => ({ url })),
        thumbnail: project.thumbnail,
        tags: project.tags,
      };

      await request("POST", "/internal/project", payload);
      setResponseMessage("Project uploaded successfully!");
      setProject({
        title: "",
        description: "",
        url: "",
        media: [],
        thumbnail: null,
        tags: [],
        user: project.user,
      });
      onClose(); // Close the modal on success
    } catch (error) {
      setResponseMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal size="3xl" height="90%" isOpen={isOpen} onClose={onClose}>
      <div className="grid md:grid-cols-2 gap-4 h-[500px]">
        {/* Left side: Project preview */}
        <div className=" p-6 rounded-l-lg overflow-y-auto">
          <h3 className="text-xl font-bold text-foreground mb-12">Live Preview</h3>
          <div className="mb-4">
            <img src={project.thumbnail || "/placeholder.png"} alt="Project Thumbnail" className="w-full h-48 object-cover rounded-lg" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={project.user.avatar} alt={project.user.name} />
              <AvatarFallback>{project.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-foreground">{project.user.name}</span>
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
            <div className="mb-4 relative">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                  {project.media.map((image, index) => (
                    <img key={index} src={image} alt={`Project image ${index + 1}`} className="w-full h-48 object-cover flex-shrink-0" />
                  ))}
                </div>
              </div>
              {project.media.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                  {project.media.map((_, index) => (
                    <button key={index} className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-primary" : "bg-muted-foreground"}`} onClick={() => setCurrentImageIndex(index)} />
                  ))}
                </div>
              )}
            </div>
          )}
          <Button asChild className="w-full bg-primary hover:bg-primary-foreground text-primary-foreground">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <ExternalLink className="mr-2" /> Visit Project
            </a>
          </Button>
        </div>

        {/* Right side: Edit form */}
        <div className=" p-6 rounded-r-lg overflow-y-auto">
          <h3 className="text-xl font-bold text-foreground mb-12">Upload your project</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-foreground">
                Project Title
              </Label>
              <Input id="title" name="title" value={project.title} onChange={handleInputChange} className="bg-input text-foreground border-border" />
            </div>
            <div>
              <Label htmlFor="description" className="text-foreground">
                Description
              </Label>
              <Textarea id="description" name="description" value={project.description} onChange={handleInputChange} className="bg-input text-foreground border-border" />
            </div>
            <div>
              <Label htmlFor="url" className="text-foreground">
                Project URL
              </Label>
              <Input id="url" name="url" value={project.url} onChange={handleInputChange} className="bg-input text-foreground border-border" />
            </div>
            <div>
              <Label htmlFor="tags" className="text-foreground">
                Tags (Press Enter to add)
              </Label>
              <Input id="tags" onKeyDown={handleTagInput} className="bg-input text-foreground border-border" />
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="text-secondary-foreground hover:text-destructive">
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-foreground">Project Thumbnail</Label>
              <div className="mt-2">
                <Input type="file" onChange={(e) => handleImageUpload(e, true)} accept="image/*" className="bg-input text-foreground border-border" />
              </div>
            </div>
            <div>
              <Label className="text-foreground">Project Images</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {project.media.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt={`Project image ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                    <button onClick={() => removeImage(image)} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <label className="w-full h-24 bg-input rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted cursor-pointer">
                  <Plus size={24} />
                  <Input type="file" onChange={handleImageUpload} accept="image/*" multiple className="hidden" />
                </label>
              </div>
            </div>
            <Button onClick={saveProject} className="w-full bg-primary hover:bg-white hover:text-black text-primary-foreground" disabled={loading}>
              {loading ? "Saving..." : "Save Project"}
            </Button>
            {responseMessage && <p className={`mt-4 text-center ${responseMessage.includes("successfully") ? "text-green-500" : "text-red-500"}`}>{responseMessage}</p>}
          </div>
        </div>
      </div>
    </CustomModal>
  );
}
