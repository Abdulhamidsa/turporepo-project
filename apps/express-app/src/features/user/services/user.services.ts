import { User } from "../models/user.model.ts";
// import { AppError } from "../utils/AppError"; // Adjust the path to your AppError utility

// Define the type for the user response
type UserResponse = {
  userId: string;
  userName: string;
};

// Service to fetch all users
export const getAllUsersService = async (): Promise<UserResponse[]> => {
  try {
    const users = await User.find({}).select("-_id -__v -active -updatedAt -deletedAt -userRole -approved").lean(); // Adds better performance by returning plain JS objects

    return users.map((user) => ({
      userId: user.friendlyId,
      userName: user.personalInfo?.username || "",
    }));
  } catch (error: any) {
    throw new Error(error.message);
  }
};
