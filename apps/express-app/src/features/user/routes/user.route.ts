import { Router } from "express";
import { handleFetchAllUsers } from "../handlers/user.handler.ts";

const router = Router();

// fetch all users
router.get("/", handleFetchAllUsers);

export default router;
