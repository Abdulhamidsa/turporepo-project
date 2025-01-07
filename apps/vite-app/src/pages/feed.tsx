import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import { AddContentButton } from "../features/user/components/AddContentButton";
import PostList from "../features/post/components/PostList";

export default function Feed() {
  const [, setActiveTab] = useState<"posts" | "projects">("posts");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Feed</h1>
        </div>
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted border border-border rounded-lg overflow-hidden">
            <TabsTrigger value="posts" onClick={() => setActiveTab("posts")} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Posts
            </TabsTrigger>
            <TabsTrigger value="projects" onClick={() => setActiveTab("projects")} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Projects
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-6">
            <PostList />
          </TabsContent>
          <TabsContent value="projects" className="mt-6"></TabsContent>
        </Tabs>
      </div>
      <div className="fixed bottom-16 right-8 z-50">
        <AddContentButton />
      </div>
    </div>
  );
}
