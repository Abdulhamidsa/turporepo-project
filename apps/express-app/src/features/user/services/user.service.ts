import { User } from "../models/user.model.ts";
import { AppError } from "../../../common/errors/app.error.ts";
import { IUser } from "@repo/data/types/UserType.ts";

// Service to fetch all users
export const getAllUsersService = async (): Promise<IUser[]> => {
  try {
    const users = await User.find({}).select("-_id -__v -active -updatedAt -deletedAt -userRole -approved").lean<IUser[]>(); // Using lean for better performance and type inference
    return users;
  } catch (error: any) {
    throw new AppError(error.message || "Error fetching all users", error.status || 500);
  }
};
