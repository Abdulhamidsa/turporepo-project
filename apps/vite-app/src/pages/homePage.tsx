import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
// import {  useUserProjects } from "../features/user/hooks/use.user.profile";
import { AddContentButton } from "../features/user/components/AddContentButton";
export default function Feed() {
  const [activeTab, setActiveTab] = useState("projects");
  // const { projects } = useUserProjects();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Feed</h1>
        <AddContentButton />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted text-muted-foreground">
          <TabsTrigger value="projects" className={`${activeTab === "projects" ? "border-b-2 border-primary text-primary" : ""}`}>
            Projects
          </TabsTrigger>
          <TabsTrigger value="status" className={`${activeTab === "status" ? "border-b-2 border-primary text-primary" : ""}`}>
            Status
          </TabsTrigger>
        </TabsList>
        <TabsContent value="projects" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        </TabsContent>
        <TabsContent value="status" className="mt-6">
          {/* <div className="space-y-6">
            {statuses.map((status) => (
              <StatusCard key={status.id} status={status} />
            ))}
          </div> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// function ProjectCard({ project }: { project: ProjectType }) {
//   return (
//     <Card className="overflow-hidden transition-all hover:shadow-lg bg-card text-card-foreground">
//       <CardHeader className="p-4">
//         <CardTitle className="text-foreground">{project.title}</CardTitle>
//       </CardHeader>
//       <CardContent className="p-4 pt-0">

//         <div className="flex justify-between items-center mt-4">
//           <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
//             <Heart className="h-4 w-4 mr-2" />
//             Like
//           </Button>
//           <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
//             <MessageCircle className="h-4 w-4 mr-2" />
//             Comment
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function StatusCard({ status }: { status: any }) {
//   return (
//     <Card className="overflow-hidden transition-all hover:shadow-lg bg-card text-card-foreground">
//       <CardHeader className="p-4">
//         <div className="flex items-center">
//           <Avatar className="h-8 w-8 mr-2 border border-border">
//             <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${status.user}`} />
//             <AvatarFallback>{status.user[0]}</AvatarFallback>
//           </Avatar>
//           <CardTitle className="text-foreground">{status.user}</CardTitle>
//         </div>
//       </CardHeader>
//       <CardContent className="p-4 pt-0">
//         {status.type === "image" ? (
//           <div className="relative h-64 w-full mb-4">
//             <img src={status.image} alt={`Status update by ${status.user}`} className="rounded-md border border-border" />
//           </div>
//         ) : null}
//         <CardDescription className="text-muted-foreground">{status.content}</CardDescription>
//         <div className="flex justify-between items-center mt-4">
//           <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
//             <Heart className="h-4 w-4 mr-2" />
//             Like
//           </Button>
//           <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
//             <MessageCircle className="h-4 w-4 mr-2" />
//             Comment
//           </Button>
//           <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
//             <Repeat2 className="h-4 w-4 mr-2" />
//             Share
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
