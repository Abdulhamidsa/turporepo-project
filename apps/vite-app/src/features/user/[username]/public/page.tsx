import { Button } from "@repo/ui/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import { MapPin, Briefcase, FileText, Globe, Mail } from "lucide-react";
import { PublicPost } from "../../components/public-post";
import { PublicAboutMe } from "../../components/public-about-me";
import { PublicProject } from "../../components/public-project";

export default function PublicProfilePage({ params }: { params: { username: string } }) {
  const user = {
    name: "Jane Doe",
    username: params.username,
    bio: "Full-stack developer | Open source enthusiast | Coffee lover",
    profession: "Senior Web Developer",
    country: "United States",
    cvLink: "https://example.com/jane-doe-cv.pdf",
    website: "https://janedoe.dev",
    profilePicture: "/placeholder.svg?height=150&width=150",
  };

  const projects = [
    { id: 1, title: "Project 1", description: "A brief description of Project 1", image: "/placeholder.svg?height=200&width=200" },
    { id: 2, title: "Project 2", description: "A brief description of Project 2", image: "/placeholder.svg?height=200&width=200" },
    { id: 3, title: "Project 3", description: "A brief description of Project 3", image: "/placeholder.svg?height=200&width=200" },
  ];

  const posts = [
    { id: 1, content: "Just launched a new project! Check it out in my portfolio.", timestamp: "2 hours ago" },
    { id: 2, content: "Excited to start my new role as Senior Web Developer at TechCorp!", timestamp: "2 days ago" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="flex flex-col md:flex-row items-start justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <Avatar className="h-20 w-20 mr-4">
            <AvatarImage src={user.profilePicture} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">@{user.username}</p>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              <Briefcase className="h-4 w-4 mr-1" />
              {user.profession}
            </p>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {user.country}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2 md:mt-0 mt-4">
          <div className="flex space-x-2">
            <a href={user.cvLink} target="_blank" rel="noopener noreferrer" className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              View CV
            </a>
            <a href={user.website} target="_blank" rel="noopener noreferrer" className="bg-green-100 text-green-600 px-4 py-2 rounded-full hover:bg-green-200 transition-colors flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Website
            </a>
          </div>
          <Button className="mt-2">
            <Mail className="h-4 w-4 mr-2" />
            Contact
          </Button>
          <Button variant="outline" className="mt-2">
            Follow
          </Button>
        </div>
      </header>

      <p className="mb-6">{user.bio}</p>

      <Tabs defaultValue="posts" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {posts.map((post) => (
            <PublicPost key={post.id} post={post} />
          ))}
        </TabsContent>
        <TabsContent value="projects">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <PublicProject key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="about">
          <PublicAboutMe />
        </TabsContent>
      </Tabs>
    </div>
  );
}
