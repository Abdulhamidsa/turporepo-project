import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { SearchForm } from "../../components/search-form";
import { fetchProjectWithUserType } from "@repo/zod/validation/project";
import { getProjects } from "../../lib/api";

export const dynamic = "force-dynamic";
export default async function ProjectsPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const page = parseInt((searchParams.page as string) || "1", 10);
  const search = (searchParams.search as string) || "";

  const { projects, totalPages } = await getProjects(page, 12);
  if (!projects || !Array.isArray(projects)) {
    return <p>Error loading projects. Please try again later.</p>;
  }
  console.log(projects);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">All Projects</h1>
      <SearchForm />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projects.map((project: fetchProjectWithUserType) => (
          <Card key={project.id} className="overflow-hidden">
            <Image src={project.thumbnail} alt={project.title} width={400} height={300} className="w-full h-48 object-cover" />
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                {project.user && (
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={project.user.profilePicture || ""} alt={project.user.username} />
                    <AvatarFallback>{project.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                )}
                {project.user && <span className="text-sm">{project.user.username}</span>}
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary">
                    {tag.name}
                  </Badge>
                ))}
              </div>
              <Link href={`/projects/${project.id}`}>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        {page > 1 && (
          <Link href={`/projects?page=${page - 1}&search=${search}`}>
            <Button>Previous</Button>
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/projects?page=${page + 1}&search=${search}`}>
            <Button>Next</Button>
          </Link>
        )}
      </div>
      <p className="text-center mt-4">
        Page {page} of {totalPages}
      </p>
    </div>
  );
}