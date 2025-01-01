import useSWR from "swr";
import { swrFetcher } from "../../../../api/swrFetcher";
import { userProfileSchema } from "@repo/zod/validation/user";
import { ProfileType } from "@repo/data/types/user";
import { request } from "../../../../api/request";

const defaultUserProfile: ProfileType = {
  bio: "",
  username: "",
  birthYear: null,
  country: "",
  profession: "",
  profilePicture: "",
  coverImage: "",
  createdAt: new Date().toISOString(),
};

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
