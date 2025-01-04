// projects types
export type ProjectType = {
  createdAt: string;
  updatedAt: string;
  url: string;
  id: string;
  media: {
    url: string;
  }[];
  title: string;
  description: string;
  thumbnail: string;
  tags: {
    id: string;
    name: string;
  }[];
};
export interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    media: {
      url: string;
    }[];
    tags: {
      id: string;
      name: string;
    }[];
  };
  onClick: () => void;
}

export type AddProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// src/data/types/types.ts
// export interface AddProject {
//   title: string;
//   description: string;
//   url: string;
//   media: string[];
//   thumbnail: string | null;
//   tags: string[];
// }

export type TagInputProps = {
  tags: string[];
  setTags: (tags: string[]) => void;
  error?: string;
};

export type ImageUploaderProps = {
  images: string[];
  setImages: (images: string[]) => void;
  isThumbnail?: boolean;
  error?: string;
};
// src/data/types/types.ts
// src/data/types/types.ts
// export interface AddProject {
//   title: string;
//   description: string;
//   url: string;
//   media: string[]; // Array of media URLs as strings
//   thumbnail: string | null;
//   tags: string[]; // Array of Tag IDs as strings
// }

// src/data/types/types.ts
export interface AddProject {
  title: string;
  description: string;
  url: string;
  thumbnail: string; // URL of the thumbnail
  media: string[]; // Array of media URLs
  tags: string[]; // Array of Tag IDs
}
export interface FetchProject {
  id: string; // Project ID
  title: string;
  description: string;
  url: string;
  thumbnail: string; // URL of the thumbnail
  media: { url: string }[]; // Array of media objects with URL
  tags: { id: string; name: string }[]; // Array of Tag objects with ID and name
  createdAt: string; // ISO string for creation timestamp
  updatedAt: string; // ISO string for update timestamp
}

export interface Tag {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  media: { url: string }[];
  thumbnail: string | null;
  tags: Tag[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
