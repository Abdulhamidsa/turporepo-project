// src/hooks/useProfileEdit.ts

import { useState } from "react";
import useSWR from "swr";
import { swrFetcher } from "../../../../utils/swrFetcher";
import { request } from "../../../../api/request";
import { getErrorMessage } from "../../../../api/errors";

// Define the UserProfile type based on your schema
type UserProfile = {
  username: string;
  age: number;
  bio: string;
  profilePicture: string;
  coverImage: string;
  country: string;
  profession: string;
};

export function useProfileEdit(friendlyId: string) {
  const {
    data: userProfile,
    error,
    mutate,
  } = useSWR<UserProfile>(`/internal/profile/${friendlyId}`, swrFetcher, {
    fallbackData: {
      username: "",
      age: 0,
      bio: "",
      profilePicture: "",
      coverImage: "/placeholder.svg?height=200&width=800",
      country: "",
      profession: "",
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const saveProfile = async (profileData: UserProfile) => {
    setIsSaving(true);
    setSaveError(null);
    try {
      await request<UserProfile>("PUT", `/internal/profile/${friendlyId}`, profileData);
      await mutate(); // Revalidate the SWR cache
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setSaveError(errorMessage);
      console.error("Error saving profile:", err);
      throw err; // Optionally rethrow if you want to handle it further up
    } finally {
      setIsSaving(false);
    }
  };

  return {
    userProfile,
    isLoading: !error && !userProfile,
    error,
    isSaving,
    saveError,
    saveProfile,
  };
}
