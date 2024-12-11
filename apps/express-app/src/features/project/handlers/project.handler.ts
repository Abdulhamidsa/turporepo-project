import { RequestHandler } from "express";
import { getSuccessResponse } from "../../../common/utils/response.handler.ts";
import { fetchAllProjects } from "../services/project.all.service.ts";

export const handleFetchAllProjects: RequestHandler = async (req, res, next) => {
  //   const userId = req.locals.userId;
  const userId = req.params.userId;
  try {
    const projects = await fetchAllProjects(userId);
    res.status(200).json(getSuccessResponse(projects));
    return;
  } catch (error) {
    next(error);
  }
};
