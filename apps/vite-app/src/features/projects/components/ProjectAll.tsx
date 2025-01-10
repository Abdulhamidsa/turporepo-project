import { useState, useRef, useEffect, useCallback } from "react";
import useSWR from "swr";
import { ENDPOINTS } from "@repo/api/endpoints";
import { Button } from "@repo/ui/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { ArrowUp, Heart } from "lucide-react";
import { timeAgo } from "@repo/utils/timeCalculation";
import CustomModal from "@repo/ui/components/CustomModal";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// ✅ Project Type
type ProjectType = {
  id: string;
  title: string;
  description: string;
  url?: string;
  thumbnail?: string;
  media: { url: string }[];
  tags: { id: string; name: string }[];
  user: { username: string; profilePicture?: string | null };
  createdAt: string;
  updatedAt?: string;
  likedByUser: boolean;
  likesCount: number;
};

// ✅ SWR Fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ProjectsAll = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { data, isLoading, error } = useSWR<{
    success: boolean;
    data: { projects: ProjectType[]; pagination: { page: number; total: number } };
  }>(`${ENDPOINTS.projects.fetchAll}?limit=${limit}&page=${page}`, fetcher, {
    revalidateOnFocus: false,
    onSuccess: (newData) => {
      if (newData?.success) {
        setProjects((prevProjects) => [...prevProjects, ...newData.data.projects]);
      }
    },
  });

  const loadMore = useCallback(() => {
    if (data && data.data.pagination.page < Math.ceil(data.data.pagination.total / limit)) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [data, limit]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMore();
    });

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [loadMore]);

  // Show scroll-to-top button after scrolling 100px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) return <p className="text-destructive text-center">Error loading projects.</p>;

  return (
    <div className="p-6">
      {isLoading && projects.length === 0 ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      )}

      <div ref={loaderRef} className="h-10" />

      {selectedProject && <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />}

      {/* ✅ Scroll to Top Button */}
      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bg-red-600 w-dvw bottom-6 right-6 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-secondary hover:scale-110 transition-transform duration-300">
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

// ✅ Project Card
const ProjectCard = ({ project, onClick }: { project: ProjectType; onClick: () => void }) => {
  const [likedByUser, setLikedByUser] = useState(project.likedByUser);
  const [likesCount, setLikesCount] = useState(project.likesCount);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedByUser(!likedByUser);
    setLikesCount((prev) => (likedByUser ? prev - 1 : prev + 1));
  };

  return (
    <div className="space-y-4 w-full max-w-[600px] min-h-[250px] m-auto bg-card text-card-foreground p-4 rounded-lg shadow-md cursor-pointer" onClick={onClick}>
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src={project.user.profilePicture || "/placeholder.png"} />
          <AvatarFallback>{project.user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-bold">{project.user.username}</h4>
          <p className="text-sm text-muted-foreground">{timeAgo(project.createdAt)}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-lg">{project.title}</h2>
        <p className="text-sm">{project.description}</p>
        {project.thumbnail && <img src={project.thumbnail} alt={project.title} className="w-full object-cover rounded-lg" />}
      </div>

      <div className={`flex items-center space-x-2 cursor-pointer ${likedByUser ? "text-primary" : "text-muted-foreground"}`} onClick={handleLikeClick}>
        <Heart />
        <span>{likesCount}</span>
      </div>
    </div>
  );
};

// ✅ Project Modal with Swiper Carousel
const ProjectModal = ({ project, isOpen, onClose }: { project: ProjectType; isOpen: boolean; onClose: () => void }) => {
  return (
    <CustomModal size="2xl" isOpen={isOpen} onClose={onClose}>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">{project.title}</h2>
        <p>{project.description}</p>

        {project.media.length > 0 ? (
          <Swiper modules={[Navigation, Pagination, EffectFade]} navigation pagination={{ clickable: true }} effect="fade" loop className="rounded-lg shadow-md w-full h-96">
            {project.media.map((media, index) => (
              <SwiperSlide key={`${media.url}-${index}`}>
                <img src={media.url} alt={`Media ${index + 1}`} className="w-full h-96 object-cover rounded-lg" />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-muted-foreground">No media available for this project.</p>
        )}

        <Button asChild className="mt-4">
          <a href={project.url ?? "#"} target="_blank" rel="noopener noreferrer">
            Visit Project
          </a>
        </Button>
      </div>
    </CustomModal>
  );
};
