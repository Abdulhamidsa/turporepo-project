import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import { Briefcase, FileText, Globe, LucideHome } from "lucide-react";
import { AboutMe } from "../../features/user/components/AboutMe";
import { motion } from "framer-motion";
import "flag-icon-css/css/flag-icons.min.css";
import PageTransition from "../../layout/animation/PageTransition";
import { useUserProfile } from "../../features/user/hooks/use.user.profile";
import { useUserProjects } from "../../features/user/hooks/use.user.profile";
import ProjectCard from "../../features/projects/components/ProjectCard";
import ProjectModal from "../../features/projects/components/ProjectModal";
import { useState } from "react";
import ProfilePictureEdit from "../../features/user/components/ProfilePicture";
import { getCountryFlagIcon } from "../../../utils/generateCountryFlag";
import { FetchedProjectType } from "@repo/zod/validation";

export default function ProfilePage() {
  const [selectedProject, setSelectedProject] = useState<FetchedProjectType | null>(null);
  const { userProfile } = useUserProfile();
  const { projects, error } = useUserProjects();

  if (error) {
    return <p>Failed to load projects. Please try again later.</p>;
  }
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Cover Section */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={userProfile.coverImage || "/placeholder.png"} alt="Cover" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Profile Details Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-card relative text-card-foreground rounded-lg shadow-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
              {/* Avatar Section */}
              <div className="flex-shrink-0 flex justify-center">
                <ProfilePictureEdit label="Profile Picture" field="profilePicture" />
              </div>

              {/* Main Content */}
              <div className="flex-1 mt-6 md:mt-0">
                <div className="text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold">{userProfile.username}</h1>
                  <p className="text-lg md:text-xl text-muted-foreground">@{userProfile?.friendlyId}</p>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-muted-foreground flex items-center justify-center md:justify-start">
                    <Briefcase className="h-5 w-5 mr-2" />
                    {userProfile.profession || "No profession listed"}
                  </p>
                  <div className="flex items-center gap-2">
                    <LucideHome className="h-5 w-5 mr-2" />
                    {userProfile?.countryOrigin && <span className={`flag-icon flag-icon-${getCountryFlagIcon(userProfile.countryOrigin)}`} style={{ fontSize: "20px" }}></span>}
                  </div>
                </div>
                <p className="mt-6 text-center md:text-left text-foreground">{userProfile.bio || "No bio available"}</p>
              </div>

              {/* Links */}
              <div className="flex flex-col items-center md:items-end mt-6 md:mt-0 space-y-4">
                <div className="flex flex-wrap justify-center md:justify-end space-x-2">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-hover transition-colors">
                    <FileText className="h-4 w-4 mr-2" />
                    CV
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-card text-card-foreground border border-border rounded-md hover:bg-muted/20 transition-colors">
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="posts" className="mt-8">
            <TabsList className="grid w-full grid-cols-3 bg-muted border border-border rounded-lg overflow-hidden">
              <TabsTrigger value="posts" className="py-2 px-4 hover:bg-primary hover:text-primary-foreground">
                Posts
              </TabsTrigger>
              <TabsTrigger value="projects" className="py-2 px-4 hover:bg-primary hover:text-primary-foreground">
                Projects
              </TabsTrigger>
              <TabsTrigger value="about" className="py-2 px-4 hover:bg-primary hover:text-primary-foreground">
                About
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="mt-6">
              <p className="text-muted-foreground">No posts available.</p>
            </TabsContent>
            <TabsContent value="projects" className="mt-6">
              {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project) => (
                    <ProjectCard key={project._id ?? "default-id"} project={{ ...project, id: project._id ?? "default-id", tags: project.tags ?? [] }} onClick={() => setSelectedProject({ ...project, tags: project.tags ?? [] })} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No projects available.</p>
              )}
            </TabsContent>
            {selectedProject && <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />}
            <TabsContent value="about" className="mt-6">
              <AboutMe />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
}
