import useSWR from "swr";

import { swrFetcher } from "../../../../api/swrFetcher";
import { UserProfile, userProfileSchema } from "@repo/zod/validation/user";
import { EditableProfileType } from "@repo/data/types/user";

import { request } from "../../../../api/request";
import { fetchedProjectSchema, FetchedProjectType } from "@repo/zod/validation";

export const defaultUserProfile: UserProfile = {
  bio: "",
  username: "",
  completedProfile: false,
  age: null,
  countryOrigin: "",
  profession: "",
  friendlyId: "",
  profilePicture: "",
  coverImage: "",
};

// Fetch hook for getting user data
export const useUserProfile = () => {
  const urlFetch = `/profile/:userid`;

  const { data, error, isLoading, mutate } = useSWR(urlFetch, (endpoint) => swrFetcher(endpoint, userProfileSchema, defaultUserProfile), {
    dedupingInterval: Infinity, // Avoid duplicate fetches
  });

  return {
    userProfile: data || defaultUserProfile,
    error,
    isLoading,
    mutate,
  };
};

// Hook for updating user profile
export const useUpdateUserProfile = () => {
  const urlEdit = `/profile/`;
  const { mutate, isLoading } = useUserProfile();

  const updateProfile = async (profile: EditableProfileType) => {
    const updatedProfile = await request<EditableProfileType>("PUT", urlEdit, profile);
    // Revalidate the user profile data after updating
    mutate();
    return updatedProfile;
  };

  return { updateProfile, isLoading };
};

// Hook for shwoing user projects

export const useUserProjects = () => {
  const urlFetch = `https://cre8ify-backend-production.up.railway.app/api/projects`;

  const { data, mutate, error } = useSWR<FetchedProjectType[]>(urlFetch, (endpoint: string) => swrFetcher(endpoint, fetchedProjectSchema.array()));

  return {
    projects: data || [],
    mutate,
    error,
  };
};
