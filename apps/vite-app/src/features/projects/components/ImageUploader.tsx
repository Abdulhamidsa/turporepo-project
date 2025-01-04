// components/ImageUploader.tsx
import { X } from "lucide-react";
import { Input } from "@repo/ui/components/ui/input";
import { getErrorMessage } from "../../../../api/errors";
import { showToast } from "@repo/ui/components/ui/toaster";
import { uploadToCloudinary } from "../../../../utils/CloudinaryConfige";
import { ImageUploaderProps } from "@repo/data/types/types";

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages, isThumbnail = false, error }) => {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        const uploadedUrls = await uploadToCloudinary(Array.from(e.target.files));
        setImages(isThumbnail ? [uploadedUrls[0]] : [...images, ...uploadedUrls]);
      } catch (error) {
        showToast(getErrorMessage(error));
      }
    }
  };

  const removeImage = (imageToRemove: string) => {
    setImages(images.filter((image) => image !== imageToRemove));
  };

  return (
    <div>
      <label className="text-foreground">{isThumbnail ? "Project Thumbnail" : "Project Images"}</label>
      <Input type="file" onChange={handleImageUpload} accept="image/*" multiple={!isThumbnail} className="bg-input text-foreground border-border mt-2" hidden />
      {isThumbnail ? (
        images.length > 0 && (
          <div className="relative mt-2 ">
            <img src={images[0]} alt="Project Thumbnail" className="w-full h-24 object-cover rounded-lg" />
            <button onClick={() => removeImage(images[0])} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1">
              <X size={14} />
            </button>
          </div>
        )
      ) : (
        <div className="mt-2 grid grid-cols-2 gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt={`Project image ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
              <button onClick={() => removeImage(image)} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
};

export default ImageUploader;
