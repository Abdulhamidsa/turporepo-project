import { Button } from "@repo/ui/components/ui/button";
import { Loader } from "lucide-react"; // Optional loading spinner icon

interface SaveButtonProps {
  onClick: () => void;
  loading: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick, loading }) => {
  return (
    <Button onClick={onClick} className={`w-full bg-primary text-primary-foreground hover:bg-white hover:text-black ${loading ? "opacity-70 cursor-not-allowed" : ""}`} disabled={loading}>
      {loading ? (
        <span className="flex items-center gap-2">
          <Loader size={16} className="animate-spin" /> Saving...
        </span>
      ) : (
        "Save Project"
      )}
    </Button>
  );
};

export default SaveButton;
