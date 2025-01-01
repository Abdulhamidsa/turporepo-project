import { z } from "zod";
import { userProfileSchema } from "../../zod/validation/user";

export type UserProfile = z.infer<typeof userProfileSchema>;

export type ProfileType = {
  username?: string | null | undefined;
  profileComplete?: boolean | undefined;
  bio?: string | null | undefined;
  birthYear?: number | null | undefined;
  country?: string | null | undefined;
  profession?: string | undefined;
  profilePicture?: string | undefined;
  coverImage?: string | undefined;
  createdAt?: string | undefined;
};

export type ProfileEditProps = {
  friendlyId: string;
};
