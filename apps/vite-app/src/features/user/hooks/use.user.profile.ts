import useSWR from "swr";
import { swrFetcher } from "../../../utils/axiosConfige";
import { userProfileSchema } from "@repo/zod/validation/user";

export const useUserProfile = (friendlyId: string | undefined) => {
  const defaultUserProfile = {
    _id: "",
    profileComplete: false,
    bio: null,
    age: null,
    country: null,
    profession: null,
    createdAt: new Date().toISOString(),
  };

  // Build URL dynamically using `friendlyId`
  const url = friendlyId ? `/internal/profile/${friendlyId}` : null;

  const { data, error, isLoading } = useSWR(url, (url) => swrFetcher(url, userProfileSchema, defaultUserProfile));

  return {
    userProfile: data,
    isLoading,
    error,
  };
};
