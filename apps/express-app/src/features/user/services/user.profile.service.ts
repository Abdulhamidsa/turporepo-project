import { User } from "../models/user.model.ts";
import { Credential } from "../models/user.credential.model.ts";
import { AppError } from "../../../common/errors/app.error.ts";
import { IUserProfile } from "@repo/data/types/UserType.ts";
export const getUserProfileService = async (userId: string): Promise<IUserProfile> => {
  try {
    const userInfo = await User.findById(userId).select("-_id -__v -active -updatedAt").lean();

    const userCredential = await Credential.findById(userId).select("-password -_id -__v").lean();

    if (!userInfo) {
      throw new AppError("User not found", 404);
    }
    if (!userCredential) {
      throw new AppError("User credential not found", 404);
    }
    const user: IUserProfile = { userInfo, userCredential };
    return user;
  } catch (error: any) {
    throw new AppError(error.message || "Error fetching user profile", error.status || 500);
  }
};
