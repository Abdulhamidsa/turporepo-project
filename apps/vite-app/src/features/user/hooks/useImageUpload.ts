// // src/hooks/useImageUpload.ts

// import { useState } from "react";
// import imageCompression from "browser-image-compression";
// import { getErrorMessage } from "../../../../api/errors"; // Adjust the path as necessary

// interface UseImageUploadReturn {
//   uploadImages: (files: File[], isThumbnail?: boolean) => Promise<string[]>;
//   isUploading: boolean;
//   uploadError: string | null;
// }

// export function useImageUpload(): UseImageUploadReturn {
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState<string | null>(null);

//   const compressImage = async (file: File): Promise<File> => {
//     const options = {
//       maxSizeMB: 0.3,
//       maxWidthOrHeight: 800,
//       useWebWorker: true,
//     };
//     try {
//       return await imageCompression(file, options);
//     } catch (error) {
//       throw new Error("Image compression failed.");
//     }
//   };

//   const uploadToCloudinary = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "portfoliohub"); // Replace with your actual preset

//     const response = await fetch("https://api.cloudinary.com/v1_1/dtaceicn1/image/upload", {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("File upload failed.");
//     }

//     const data = await response.json();
//     return data.secure_url as string;
//   };

//   const uploadImages = async (files: File[], isThumbnail: boolean = false): Promise<string[]> => {
//     setIsUploading(true);
//     setUploadError(null);
//     try {
//       const compressedFiles = await Promise.all(files.map((file) => compressImage(file)));

//       const uploadPromises = compressedFiles.map((file) => uploadToCloudinary(file));

//       const uploadedUrls = await Promise.all(uploadPromises);
//       return uploadedUrls;
//     } catch (error) {
//       const errorMessage = getErrorMessage(error);
//       setUploadError(errorMessage);
//       throw error; // Re-throw to allow further handling if needed
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return { uploadImages, isUploading, uploadError };
// }
