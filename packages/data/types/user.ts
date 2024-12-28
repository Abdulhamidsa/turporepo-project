import { z } from "zod";
import { userProfileSchema } from "../../zod/validation/user";

export type UserProfile = z.infer<typeof userProfileSchema>;
