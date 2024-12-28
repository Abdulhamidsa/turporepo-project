import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import { Eye, EyeOff, MapPin, Briefcase, FileText, Globe, Mail, Github, Linkedin, Twitter } from "lucide-react";
import { Post } from "../components/post";
import { AboutMe } from "../components/about-me";
import { Project } from "../components/project";
import { AddContentButton } from "../components/add-content-button";
import { motion } from "framer-motion";
import { Tooltip, TooltipProvider } from "@repo/ui/components/ui/tooltip";
import { useUserProfile } from "../hooks/use.user.profile";

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [isPublicView, setIsPublicView] = useState(false);

  // Fetch user profile data
  const { userProfile, isLoading, error } = useUserProfile(params.username);

  // Hardcoded fallback and additional data
  const defaultProfile = {
    name: "Unknown User",
    coverImage: "/banner1.png",
    profilePicture: "/placeholder.svg?height=400&width=400",
    cvLink: "https://example.com/cv.pdf",
    website: "https://example.com",
    github: "https://github.com/unknown",
    linkedin: "https://linkedin.com/in/unknown",
    twitter: "https://twitter.com/unknown",
    projects: [
      { id: 1, title: "Sample Project 1", description: "A placeholder project", image: "/placeholder.svg?height=200&width=200" },
      { id: 2, title: "Sample Project 2", description: "A placeholder project", image: "/placeholder.svg?height=200&width=200" },
    ],
    posts: [
      { id: 1, content: "This is a placeholder post.", timestamp: "Just now" },
      { id: 2, content: "Another placeholder post.", timestamp: "2 hours ago" },
    ],
  };

  // Merged user data with defaults
  const user = {
    name: userProfile?.bio || defaultProfile.name,
    username: params.username,
    bio: userProfile?.bio || "No bio available",
    profession: userProfile?.profession || "Unknown Profession",
    country: userProfile?.country || "Unknown Country",
    coverImage: defaultProfile.coverImage,
    profilePicture: defaultProfile.profilePicture,
    cvLink: defaultProfile.cvLink,
    website: defaultProfile.website,
    github: defaultProfile.github,
    linkedin: defaultProfile.linkedin,
    twitter: defaultProfile.twitter,
    projects: defaultProfile.projects,
    posts: defaultProfile.posts,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching user profile:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={user.coverImage} alt="Cover" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-card relative text-card-foreground rounded-lg shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
            <Avatar className="w-32 h-32 border-4 border-border shadow-lg">
              <AvatarImage src={user.profilePicture} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="mt-4 md:mt-0 text-center md:text-left flex-grow">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-xl text-muted-foreground">@{user.username}</p>
              <p className="mt-2 text-muted-foreground flex items-center justify-center md:justify-start">
                <Briefcase className="h-5 w-5 mr-2" />
                {user.profession}
              </p>
              <p className="mt-1 text-muted-foreground flex items-center justify-center md:justify-start">
                <MapPin className="h-5 w-5 mr-2" />
                {user.country}
              </p>
              <p className="mt-4 text-foreground">{user.bio}</p>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col items-center md:items-end space-y-2">
              <TooltipProvider>
                <Tooltip content={isPublicView ? "View as private" : "View as public"}>
                  <Button variant="outline" onClick={() => setIsPublicView(!isPublicView)} size="icon">
                    {isPublicView ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </Tooltip>
              </TooltipProvider>
              {isPublicView ? (
                <div className="flex space-x-2">
                  <Button>
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline">Follow</Button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="outline" asChild>
                    <a href={user.cvLink} target="_blank" rel="noopener noreferrer">
                      <FileText className="h-4 w-4 mr-2" />
                      CV
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={user.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Website
                    </a>
                  </Button>
                </div>
              )}
              <div className="flex space-x-2 mt-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href={user.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={user.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {!isPublicView && <AddContentButton />}

        <Tabs defaultValue="posts" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-6">
            {user.posts.map((post, index) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                <Post post={post} isPublicView={isPublicView} />
              </motion.div>
            ))}
          </TabsContent>
          <TabsContent value="projects" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.projects.map((project, index) => (
                <motion.div key={project.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                  <Project project={project} isPublicView={isPublicView} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="about" className="mt-6">
            <AboutMe isPublicView={isPublicView} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
