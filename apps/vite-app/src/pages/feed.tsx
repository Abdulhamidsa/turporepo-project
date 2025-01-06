// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
// // import { PostList } from "./components/PostList";
// // import { ProjectList } from "./components/ProjectList";

// // export default function Feed() {
// //   return (
// //     <div className="min-h-screen bg-black text-gray-200">
// //       <div className="container mx-auto p-4 max-w-2xl">
// //         <div className="flex justify-between items-center mb-6">
// //           <h1 className="text-3xl font-bold text-primary">Feed</h1>
// //         </div>
// //         <Tabs defaultValue="posts" className="w-full">
// //           <TabsList className="grid w-full grid-cols-2 bg-gray-900">
// //             <TabsTrigger value="posts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
// //               Posts
// //             </TabsTrigger>
// //             <TabsTrigger value="projects" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
// //               Projects
// //             </TabsTrigger>
// //           </TabsList>
// //           <TabsContent value="posts">
// //             <PostList />
// //           </TabsContent>
// //           <TabsContent value="projects">
// //             <ProjectList />
// //           </TabsContent>
// //         </Tabs>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
// import { PostList } from "../features/post/components/PostList";
// // import ProjectList from "../features/post/components/ProjectList";

// export default function Feed() {
//   const [, setActiveTab] = useState<"posts" | "projects">("posts");

//   return (
//     <div className="min-h-screen bg-black text-gray-200">
//       <div className="container mx-auto p-4 max-w-2xl">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-primary">Feed</h1>
//         </div>
//         <Tabs defaultValue="posts" className="w-full">
//           <TabsList className="grid w-full grid-cols-2 bg-gray-900">
//             <TabsTrigger value="posts" onClick={() => setActiveTab("posts")} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
//               Posts
//             </TabsTrigger>
//             <TabsTrigger value="projects" onClick={() => setActiveTab("projects")} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
//               Projects
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value="posts">
//             <PostList />
//           </TabsContent>
//           <TabsContent value="projects">{/* <ProjectList /> */}</TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

import { PostList } from "../features/post/components/PostList";
import { AddContentButton } from "../features/user/components/AddContentButton";

export default function Feed() {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <AddContentButton />
        </div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Feed</h1>
        </div>

        {/* Feed Content */}
        <PostList />
      </div>
    </div>
  );
}
