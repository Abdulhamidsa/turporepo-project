import { useState } from "react";
import StatusUpdate from "./features/posts/StatusUpdate";
import Feed from "./features/posts/Feed";
import { Button } from "@repo/ui/components/ui/button";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"posts" | "projects">("posts");
  const [searchQuery, setSearchQuery] = useState("");

  const statuses = [
    { id: 1, user: "Alice", content: "Just launched a new project!" },
    { id: 2, user: "Bob", content: "Excited to share my portfolio update!" },
    { id: 3, user: "Charlie", content: "Looking for collaborators on my open-source app." },
  ];

  const projects = [
    { id: 1, title: "Project A", description: "An amazing project about AI." },
    { id: 2, title: "Project B", description: "A portfolio website for professionals." },
    { id: 3, title: "Project C", description: "A collaborative task management tool." },
  ];

  // Filtered Data
  const filteredStatuses = statuses.filter((status) => status.content.toLowerCase().includes(searchQuery.toLowerCase()));

  const filteredProjects = projects.filter((project) => project.title.toLowerCase().includes(searchQuery.toLowerCase()) || project.description.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-4">
      {/* Tab Navigation */}
      <div className="flex flex-col items-center space-y-4 mb-6">
        {/* Tabs */}
        <div className="flex space-x-8">
          <button
            className={`pb-2 text-sm font-medium transition-colors ${activeTab === "posts" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
            onClick={() => {
              setActiveTab("posts");
              setSearchQuery(""); // Clear search when switching tabs
            }}
          >
            Posts
          </button>
          <button
            className={`pb-2 text-sm font-medium transition-colors ${activeTab === "projects" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
            onClick={() => {
              setActiveTab("projects");
              setSearchQuery(""); // Clear search when switching tabs
            }}
          >
            Projects
          </button>
        </div>

        {/* Search Input */}
        {/* <div className="w-full max-w-md relative">
          <input
            type="text"
            placeholder={`Search ${activeTab === "posts" ? "statuses" : "projects"}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring focus:ring-primary"
          />
        </div> */}
      </div>

      {/* Dynamic Content */}
      {activeTab === "posts" ? (
        <div className="space-y-4">
          {/* Post Button */}
          {/* <div className="flex justify-center">
            <Button onClick={() => alert("Posting...")} className="px-4 py-1 text-sm">
              Post
            </Button>
          </div> */}
          {/* Statuses */}
          <StatusUpdate />
          <Feed posts={filteredStatuses} />
        </div>
      ) : (
        <div>
          {/* Upload Project Button */}
          <div className="flex justify-center mb-4">
            <Button onClick={() => alert("Upload Project...")} className="px-4 py-1 text-sm">
              Upload Project
            </Button>
          </div>
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className="p-4 bg-muted rounded-lg shadow">
                <h3 className="text-md font-semibold">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
