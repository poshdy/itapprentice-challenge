import { Router } from "express";
import {
  updateUserHandler,
  deleteUserHandler,
  getUserHandler,
} from "../controller/user-controller.js";
import { tryCatch } from "../utils/index.js";
import { authenticateToken } from "../middleware/index.js";

export const userRouter = Router();
;
userRouter.get("/:email", authenticateToken, tryCatch(getUserHandler));
userRouter.patch("/:email", authenticateToken, tryCatch(updateUserHandler));
userRouter.delete("/:email", authenticateToken, tryCatch(deleteUserHandler));
