import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { xss } from "express-xss-sanitizer";
import cookieParser from "cookie-parser";
import jwt, { JwtPayload } from "jsonwebtoken";
import ExpressMongoSanitize from "express-mongo-sanitize";
import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { getAuthHeader } from "../utils/index.js";
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

export const CORS = cors({
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  origin: ["localhost*"],
});

export const Helmet = helmet({
  hidePoweredBy: true,
});

export const Logger = morgan("dev");

export const cookie = cookieParser();
export const XSS = xss();

export const mongoSanitize = ExpressMongoSanitize();

export const errorHandler = (error, request, response, next) => {
  const statusCode = response.statusCode !== 200 ? response.statusCode : 500;
  response.status(statusCode);

  const responseBody = {
    message: error.message,
    stack: process.env.NODE_ENV == "production" ? "" : error.stack,
  };
  console.error("error: ", responseBody);
  response.json(responseBody);
};

export async function authenticateToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = await getAuthHeader(request);
  jwt.verify(
    token as string,
    process.env.ACCESS_TOKEN as string,
    async (err: any, data: any) => {
      const email = request.params.email;

      if (err) {
        return response
          .status(403)
          .send(
            "you dont have access or your token has expired please login again"
          );
      }
      if (email !== data)
        return response
          .status(403)
          .send(" you are not allowed from user  middleware");
      next();
    }
  );
}
