import { z } from "zod";
import { userProfileSchema } from "../../zod/validation/user";

export type UserProfile = z.infer<typeof userProfileSchema>;

export type ProfileType = {
  bio: string | null | undefined; // Allow null/undefined
  username: string | null | undefined;
  age: number | null | undefined;
  countryOrigin: string | null | undefined;
  profession: string | null | undefined;
  profilePicture: string | null | undefined;
  coverImage: string | null | undefined;
};

export type EditableProfileType = {
  bio?: string | null;
  username?: string | null;
  age?: number | null;
  countryOrigin?: string | null;
  profession?: string | null;
  profilePicture?: string | null;
  coverImage?: string | null;
};
export type ProfileEditProps = {
  friendlyId: string;
};
