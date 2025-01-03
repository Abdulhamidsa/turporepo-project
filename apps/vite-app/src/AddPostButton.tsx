import { useState, useEffect, useRef } from "react";
import { FileText, FolderPlus } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { motion } from "framer-motion";
import AddProjectModal from "./features/projects/components/addProjectModal";

export default function AddPostButton() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingPost, setIsAddingPost] = useState(false);
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
            <Button
              onClick={() => {
                setIsAddingPost(true);
                setMenuOpen(false);
              }}
              variant="ghost"
              className="flex items-center space-x-2 hover:bg-muted/50"
            >
              <FileText className="h-5 w-5 text-primary" />
              <span>Add Post</span>
            </Button>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setMenuOpen(false);
              }}
              variant="ghost"
              className="flex items-center space-x-2 hover:bg-muted/50"
            >
              <FolderPlus className="h-5 w-5 text-primary" />
              <span>Add Project</span>
            </Button>
          </motion.div>
        )}
      </div>
      <AddProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Overlay */}
      {(isAddingPost || isModalOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setIsAddingPost(false);
            setIsModalOpen(false);
          }}
        ></div>
      )}

      {/* Add Post Layout */}
      {isAddingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Post</h2>
            {/* Add your Add Post form here */}
            <Button onClick={() => setIsAddingPost(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
