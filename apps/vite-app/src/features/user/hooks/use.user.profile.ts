import useSWR from "swr";
import { swrFetcher } from "../../../utils/axiosConfige";
import { userProfileSchema } from "@repo/zod/validation/user";

export const useUserProfile = (mongo_ref: string) => {
  const defaultUserProfile = {
    _id: "",
    mongo_ref: "",
    profileComplete: false,
    bio: null,
    age: null,
    country: null,
    profession: null,
    createdAt: new Date().toISOString(),
  };

  const { data, error, isLoading } = useSWR(`/internal/profile/${mongo_ref}`, (url) => swrFetcher(url, userProfileSchema, defaultUserProfile));

  return {
    userProfile: data,
    isLoading,
    error,
  };
};
