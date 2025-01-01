import { useState, useEffect, useRef } from "react";
import { Plus, FileText, FolderPlus } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { motion } from "framer-motion";
import AddProjectModal from "../src/features/projects/components/addProjectModal";

//  <Button onClick={() => setIsModalOpen(true)} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition duration-300 hover:scale-105">
//     Add New Project
//   </Button>{" "}
//   <AddProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Check if the click is outside both the menu and the popup
      if (menuRef.current && !menuRef.current.contains(target) && popupRef.current && !popupRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4">
      {/* Floating Button */}
      <div className="fixed bottom-16 right-4 md:bottom-4 md:right-4">
        <button onClick={() => setMenuOpen(!menuOpen)} className="floating-button bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all">
          <Plus className="h-6 w-6" />
        </button>

        {/* Animated Menu */}
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="floating-menu absolute bottom-20 right-0 bg-card border border-border rounded-lg shadow-lg p-4 flex flex-col space-y-2"
          >
            <Button onClick={() => alert("Adding Post...")} variant="ghost" className="flex items-center space-x-2 hover:bg-muted/50">
              <FileText className="h-5 w-5 text-primary" />
              <span>Add Post</span>
            </Button>
            <Button onClick={() => setIsModalOpen(true)} variant="ghost" className="flex items-center space-x-2 hover:bg-muted/50">
              <FolderPlus className="h-5 w-5 text-primary" />
              <span>Add Project</span>
            </Button>
          </motion.div>
        )}

        <AddProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}
