import { z } from "zod";
import { userProfileSchema } from "../../zod/validation/user";

export type UserProfile = z.infer<typeof userProfileSchema>;

export type ProfileType = {
  _id: string;
  profileComplete: boolean;
  username: string | null;
  age: number | null;
  bio: string | null;
  profilePicture: string | null;
  coverImage?: string | null;
  country: string | null;
  profession: string | null;
  createdAt: string;
};
export type ProfileEditProps = {
  friendlyId: string;
};
