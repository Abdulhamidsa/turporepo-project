import useSWR from "swr";
import { swrFetcher } from "../../../../api/swrFetcher";
import { userProfileSchema } from "@repo/zod/validation/user";
import { ProfileType } from "@repo/data/types/user";
import { request } from "../../../../api/request";

export const useUserProfile = () => {
  const defaultUserProfile: ProfileType = {
    _id: "",
    profileComplete: false,
    bio: "",
    username: "",
    age: 0,
    country: "",
    profession: "",
    profilePicture: "https://example.com",
    coverImage: "/placeholder.svg?height=200&width=800",
    createdAt: new Date().toISOString(),
  };

  const urlFetch = `/internal/profile/:userid`;
  const urlEdit = `/internal/profile/`;
  const { data, error, isLoading, mutate } = useSWR(urlFetch, (endpoint) => swrFetcher(endpoint, userProfileSchema, defaultUserProfile));

  const updateProfile = async (profile: ProfileType) => {
    const updatedProfile = await request<ProfileType>("PUT", urlEdit, profile);
    mutate(updatedProfile, false); // Update the local data without revalidation
    return updatedProfile;
  };

  return {
    userProfile: data || defaultUserProfile,
    error,
    isLoading,
    mutate,
    updateProfile,
  };
};
