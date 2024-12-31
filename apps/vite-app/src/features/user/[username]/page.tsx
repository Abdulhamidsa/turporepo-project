import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import { Eye, EyeOff, MapPin, Briefcase, FileText, Globe, Mail } from "lucide-react";
// import { Post } from "../components/post";
import { AboutMe } from "../components/about-me";
// import { Project } from "../components/project";
import { motion } from "framer-motion";
import { Tooltip, TooltipProvider } from "@repo/ui/components/ui/tooltip";
import { useUserProfile } from "../hooks/use.user.profile";
import PageTransition from "../../../layout/animation/PageTransition";
// import { useUserData } from "../../../../context/UserContext";

export default function ProfilePage({ params }: { params: { friendlyId: string } }) {
  const [isPublicView, setIsPublicView] = useState(false);
  const userInfo = "ss";

  const { userProfile, isLoading, error } = useUserProfile(userInfo);
  const defaultProfile = {
    name: "Unknown User",
    coverImage: "/banner1.png",
    profilePicture: "/placeholder.svg?height=400&width=400",
    cvLink: "https://example.com/cv.pdf",
    website: "https://example.com",
    github: "https://github.com/unknown",
    linkedin: "https://linkedin.com/in/unknown",
    twitter: "https://twitter.com/unknown",
    projects: [],
    posts: [],
  };

  const user = { ...defaultProfile, ...userProfile };

  if (isLoading) {
    return (
      <PageTransition>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="flex items-center justify-center min-h-screen">
          <p>Error: Unable to fetch profile.</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Cover Section */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={user.coverImage} alt="Cover" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Profile Details Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-card relative text-card-foreground rounded-lg shadow-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
              {/* Avatar Section */}
              <div className="flex-shrink-0 flex justify-center">
                <Avatar className="w-32 h-32 sm:w-36 sm:h-36 md:w-30 md:h-30 border-4 border-border shadow-lg">
                  <AvatarImage src={user.profilePicture} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>

              {/* Main Content */}
              <div className="flex-1 mt-6 md:mt-0">
                <div className="text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold">{user.name}</h1>
                  <p className="text-lg md:text-xl text-muted-foreground">@{params.friendlyId}</p>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-muted-foreground flex items-center justify-center md:justify-start">
                    <Briefcase className="h-5 w-5 mr-2" />
                    {user.profession || "No profession listed"}
                  </p>
                  <p className="text-muted-foreground flex items-center justify-center md:justify-start">
                    <MapPin className="h-5 w-5 mr-2" />
                    {user.country || "No location specified"}
                  </p>
                </div>

                <p className="mt-6 text-center md:text-left text-foreground">{user.bio || "No bio available"}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center md:items-end mt-6 md:mt-0 space-y-4">
                <TooltipProvider>
                  <Tooltip content={isPublicView ? "View as private" : "View as public"}>
                    <Button variant="outline" onClick={() => setIsPublicView(!isPublicView)} size="icon" className="flex items-center justify-center">
                      {isPublicView ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                  </Tooltip>
                </TooltipProvider>

                {isPublicView ? (
                  <div className="flex space-x-2">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary-hover transition-colors">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline" className="hover:bg-muted/20 transition-colors">
                      Follow
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-wrap justify-center md:justify-end space-x-2">
                    <Button variant="outline" asChild className="hover:bg-muted/20 transition-colors">
                      <a href={user.cvLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        CV
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="hover:bg-muted/20 transition-colors">
                      <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        Website
                      </a>
                    </Button>
                  </div>
                )}
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
              {/* {user.posts.length ? user.posts.map((post) => <Post key={post.id} post={post} isPublicView={isPublicView} />) : <p className="text-muted-foreground">No posts available.</p>} */}
            </TabsContent>
            <TabsContent value="projects" className="mt-6">
              {user.projects.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* {user.projects.map((project) => (
                    <Project key={project.id} project={project} isPublicView={isPublicView} />
                  ))} */}
                </div>
              ) : (
                <p className="text-muted-foreground">No projects available.</p>
              )}
            </TabsContent>
            <TabsContent value="about" className="mt-6">
              <AboutMe isPublicView={isPublicView} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
}
