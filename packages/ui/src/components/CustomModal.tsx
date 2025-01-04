import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string; // Custom width
  height?: string; // Custom height
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children, width, height, size }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            ref={modalRef}
            className={`relative bg-card text-card-foreground rounded-lg shadow-lg w-full ${size ? sizeClasses[size] : ""}`}
            style={{ width: width || undefined, height: height || undefined }}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <button onClick={onClose} className="absolute top-2 right-2 text-muted-foreground hover:text-foreground">
              <X className="h-6 w-6" />
            </button>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
