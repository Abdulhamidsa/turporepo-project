import imageCompression from "browser-image-compression";

/**
 * Compress an image using browser-image-compression.
 *
 * @param {File} file - The image file to compress.
 * @returns {Promise<File>} - A promise that resolves with the compressed image file.
 */
export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };
  return await imageCompression(file, options);
};

/**
 * Upload images to Cloudinary.
 *
 * @param {File[]} files - An array of image files to upload.
 * @returns {Promise<string[]>} - A promise that resolves with an array of secure URLs from Cloudinary.
 */
export const uploadToCloudinary = async (files: File[]): Promise<string[]> => {
  return await Promise.all(
    files.map(async (file) => {
      const compressedFile = await compressImage(file);
      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("upload_preset", "portfoliohub");

      const response = await fetch("https://api.cloudinary.com/v1_1/dtaceicn1/image/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();
      return data.secure_url;
    })
  );
};
