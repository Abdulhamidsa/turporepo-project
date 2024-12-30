// src/App.tsx
import { ProjectUploadForm } from "./components/AddProject";

function Page() {
  return (
    <div className="App">
      <h1 className="text-center text-2xl font-bold mt-10">Project Uploader</h1>
      <ProjectUploadForm />
    </div>
  );
}

export default Page;
