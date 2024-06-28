import { hash, genSalt, compare } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  const hashed = await hash(password, salt);
  return hashed;
};

export const comparePassword = (plain: string, hashed: string) =>
  compare(plain, hashed);

export const tryCatch =
  (controller: any) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await controller(request, response);
    } catch (error) {
      return next(error);
    }
  };

export const generateAccessToken = (email: string) => {
  return jwt.sign(email, process.env.ACCESS_TOKEN);
};

export const getAuthHeader = async (req: Request) => {
  const { authorization } = req.headers;

  const token = authorization?.split(" ")[1];
  if (token == null) {
    throw new Error("Token is missing");
  }
  return token;
};