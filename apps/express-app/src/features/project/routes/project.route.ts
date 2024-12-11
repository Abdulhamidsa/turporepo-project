import { Router } from "express";
import { handleFetchAllProjects } from "../handlers/project.handler.ts";

const router = Router();

// fetch all projects
router.get("/:projectid", handleFetchAllProjects);

export default router;
