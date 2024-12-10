import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model.ts"; // Import the Mongoose model
import { UserDocument } from "../models/user.model.ts"; // Import the UserDocument type

// Controller to fetch all users
export const handleFetchAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // Fetch all users from MongoDB
    const users: UserDocument[] = await User.find();

    // Return success response
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
    return; // Explicitly return undefined
  }
};
