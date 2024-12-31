import useSWR from "swr";
import { swrFetcher } from "../../../../utils/axiosConfige";
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
  const url = `/internal/profile/${friendlyId}`;

  const { data, error, isLoading } = useSWR(url, (url) => swrFetcher(url, userProfileSchema, defaultUserProfile));
  return {
    userProfile: data,
    isLoading,
    error,
  };
};

import { z } from "zod";

// Define the schema for the expected user response
const userSchema = z.object({
  friendlyId: z.string(),
  username: z.string(),
});

export const useUserAuth = () => {
  const { data, error, isLoading } = useSWR("/internal/logged-user", (url) => swrFetcher(url, userSchema, null));
  const isAuthenticated = !!data && !error;

  return {
    userAuth: data,
    isLoading,
    isAuthenticated,
    error,
  };
};
