import { request } from "../../../../api/request";
import { EditableProfileType } from "@repo/data/types/user";
import { useUserProfile } from "./use.user.profile";
import { ENDPOINTS } from "@repo/api/endpoints";

/**
 * Hook for updating a user's profile.
 */
export const useUpdateUserProfile = () => {
  // We rely on the `useUserProfile` hook to revalidate after an update
  const { mutate, isLoading } = useUserProfile();

  /**
   * Updates the user profile and revalidates the SWR cache.
   * @param profile The updated profile data.
   * @returns The updated profile.
   */
  const updateProfile = async (profile: EditableProfileType) => {
    try {
      // Update the profile using the `request` utility
      const updatedProfile = await request<EditableProfileType>(
        "PUT",
        ENDPOINTS.profile.update, // Use the dynamic endpoint
        profile
      );

      // Revalidate user profile data after updating
      await mutate();
      return updatedProfile;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error; // Re-throw error for external handling if necessary
    }
  };

  return { updateProfile, isLoading };
};
