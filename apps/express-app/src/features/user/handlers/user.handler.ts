import { RequestHandler } from "express";
import { getAllUsersService } from "../services/user.service.ts";
import { getSuccessResponse } from "../../../common/utils/response.handler.ts";
// import { getUserProfileService } from "../services/user.profile.service.ts";

// Controller to handle fetching all users
export const handleFetchAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(getSuccessResponse(users));
  } catch (error) {
    next(error);
  }
};

// export const handleFetchUserProfile: RequestHandler = async (req, res, next) => {
//   const userId = req.params.userId;
//   // const userId = req.locals.userId;
//   try {
//     const user = await getUserProfileService(userId);
//     res.json(getSuccessResponse(user));
//   } catch (error) {
//     next(error);
//   }
// };
