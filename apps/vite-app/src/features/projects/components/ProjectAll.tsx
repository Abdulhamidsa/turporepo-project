import { Button } from "@repo/ui/components/ui/button";
import { useState } from "react";
import useSWR from "swr";
import z from "zod";
import CustomModal from "@repo/ui/components/CustomModal";

const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  thumbnail: z.string().url(),
  media: z.array(z.object({ url: z.string().url() })),
  tags: z.array(z.object({ id: z.string(), name: z.string() })),
  user: z.object({
    username: z.string(),
    profilePicture: z.string().nullable(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const FetchedProjectsSchema = z.object({
  success: z.boolean(),
  data: z.object({
    projects: z.array(ProjectSchema),
    pagination: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
    }),
  }),
});

type ProjectType = z.infer<typeof ProjectSchema>;

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  const parsed = FetchedProjectsSchema.parse(data);
  return parsed.data;
};

const ProjectModal = ({ project, isOpen, onClose }: { project: ProjectType; isOpen: boolean; onClose: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  return (
    <CustomModal size="lg" isOpen={isOpen} onClose={onClose}>
      <div className="relative h-72 rounded-t-lg overflow-hidden">
        <img src={project.media[currentImageIndex]?.url || project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
        {project.media.length > 1 && (
          <>
            <Button variant="ghost" size="icon" className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white" onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? project.media.length - 1 : prev - 1))}>
              {"<"}
            </Button>
            <Button variant="ghost" size="icon" className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white" onClick={() => setCurrentImageIndex((prev) => (prev === project.media.length - 1 ? 0 : prev + 1))}>
              {">"}
            </Button>
          </>
        )}
      </div>
      <div className="p-6 bg-card rounded-b-lg">
        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
        <p className="text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag.id} className="px-3 py-1 text-sm bg-primary text-white rounded-full">
              {tag.name}
            </span>
          ))}
        </div>
        <Button asChild>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            Visit Project
          </a>
        </Button>
      </div>
    </CustomModal>
  );
};

export const ProjectsAll = () => {
  const [page, setPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const { data, error, isLoading } = useSWR<{ projects: ProjectType[]; pagination: { page: number; limit: number; total: number } }>(`http://localhost:4000/api/projects?limit=6&page=${page}`, fetcher);

  if (error) {
    return <p className="text-red-500 text-center mt-6">Failed to load projects. Please try again later.</p>;
  }

  return (
    <div className="p-4">
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (data?.projects ?? []).length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {data?.projects.map((project) => (
              <div key={project.id} className="cursor-pointer bg-card rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105" onClick={() => setSelectedProject(project)}>
                <img src={project.thumbnail} alt={project.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
                  <div className="flex items-center mt-4">
                    <img src={project.user.profilePicture || "/placeholder.png"} alt={project.user.username} className="w-8 h-8 rounded-full" />
                    <span className="text-sm text-gray-500 ml-2">@{project.user.username}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <Button disabled={page === 1} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
              Previous
            </Button>
            <span>
              Page {data?.pagination.page} of {Math.ceil((data?.pagination.total ?? 1) / 6)}
            </span>
            <Button disabled={!data || data.pagination.page === Math.ceil(data.pagination.total / 6)} onClick={() => setPage((prev) => prev + 1)}>
              Next
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center">No projects available.</p>
      )}
      {selectedProject && <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
};
