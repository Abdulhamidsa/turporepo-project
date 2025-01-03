import useSWR from "swr";
import { swrFetcher } from "../../../../api/swrFetcher";
import { userProfileSchema } from "@repo/zod/validation/user";
import { ProfileType as OriginalProfileType } from "@repo/data/types/user";

type ProfileType = Omit<OriginalProfileType, "profilePicture"> & {
  profilePicture: string | null;
};
import { request } from "../../../../api/request";
import z from "zod";

export const defaultUserProfile: ProfileType = {
  bio: "",
  username: "",
  age: null,
  countryOrigin: "",
  profession: "",
  profilePicture: null,
  coverImage: null,
};
const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  media: z.array(z.object({ url: z.string().url() })),
  thumbnail: z.string().url(),
  tags: z.array(z.object({ id: z.string(), name: z.string() })),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ProjectType = z.infer<typeof projectSchema>;

// Fetch hook for getting user data
export const useUserProfile = () => {
  const urlFetch = `/internal/profile/:userid`;

  const { data, error, isLoading, mutate } = useSWR(urlFetch, (endpoint) => swrFetcher(endpoint, userProfileSchema, defaultUserProfile), { revalidateOnFocus: true });

  return {
    userProfile: data || defaultUserProfile,
    error,
    isLoading,
    mutate,
  };
};

// Hook for updating user profile
export const useUpdateUserProfile = () => {
  const urlEdit = `/internal/profile/`;

  const updateProfile = async (profile: ProfileType) => {
    const updatedProfile = await request<ProfileType>("PUT", urlEdit, profile);
    return updatedProfile;
  };

  return { updateProfile };
};

// Hook for shwoing user projects
export const useUserProjects = () => {
  const urlFetch = `http://localhost:4000/api/internal/projects`;

  const { data, error, isLoading, mutate } = useSWR(urlFetch, (endpoint) => swrFetcher(endpoint, z.array(projectSchema)));
  console.log(data);
  return {
    projects: data || [], // Default to an empty array if no data
    error,
    isLoading,
    mutate,
  };
};
