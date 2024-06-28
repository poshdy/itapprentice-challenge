import { Router } from "express";
import {
  createUserHandler,
  loginUserHandler,
} from "../controller/auth-controller.js";
import { tryCatch } from "../utils/index.js";

export const authRouter = Router();

authRouter.post("/register", tryCatch(createUserHandler));
authRouter.post("/login", tryCatch(loginUserHandler));
