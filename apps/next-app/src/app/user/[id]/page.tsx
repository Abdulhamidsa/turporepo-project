import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Github, Linkedin, Twitter, Globe, Calendar } from "lucide-react";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { getUserProfile } from "../../../lib/api";

export default async function UserProfile({ params }: { params: { id: string } }) {
  const user = await getUserProfile(params.id);

  if (!user) {
    notFound();
  }

  return (
    <main className="bg-background">
      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${user.coverImage})` }}></div>
      <div className="container mx-auto py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-accent -mt-20 ring-4 ring-background">
                {user.profilePicture ? <Image src={user.profilePicture} alt={user.username} width={128} height={128} className="object-cover" /> : <div className="w-full h-full flex items-center justify-center text-4xl font-bold">{user.username.slice(0, 2).toUpperCase()}</div>}
              </div>
              <div className="text-center md:text-left flex-grow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                    <p className="text-xl text-muted-foreground mb-4">{user.profession}</p>
                  </div>
                  <div className="flex space-x-4 mb-4 md:mb-0 justify-center md:justify-start">
                    {user.socialLinks.github && (
                      <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon">
                          <Github className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                    {user.socialLinks.linkedin && (
                      <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                    {user.socialLinks.twitter && (
                      <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon">
                          <Twitter className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
                {user.bio && <p className="mb-4">{user.bio}</p>}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  {user.countryOrigin && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {user.countryOrigin}
                    </Badge>
                  )}
                  {user.age && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {user.age} years old
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {user.skills.map((skill: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, index: Key | null | undefined) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.projects.map(
            (project: {
              id: Key | null | undefined;
              thumbnail: string | StaticImport;
              title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined;
              description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
              tags: any[];
              url: string | undefined;
            }) => (
              <Card key={project.id} className="overflow-hidden">
                {typeof project.thumbnail === "string" && typeof project.title === "string" && <Image src={project.thumbnail} alt={project.title} width={400} height={300} className="w-full h-48 object-cover" />}
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag.id} variant="secondary">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full">
                      View Project
                    </Button>
                  </a>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </main>
  );
}
