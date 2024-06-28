import { Request, Response } from "express";
import {
  comparePassword,
  generateAccessToken,
  hashPassword,
} from "../utils/index.js";
import { createUserSchema, loginUserSchema } from "../validation/index.js";
import { FindUser, createUser } from "../service/index.js";
export const createUserHandler = async (
  request: Request,
  response: Response
) => {
  const data = createUserSchema.safeParse(request.body);
  if (data.success) {
    const { email, name, password } = data.data;

    const user = await FindUser(email);
    if (user) {
      return response
        .status(409)
        .send({ message: `${user.email} is already exists` });
    }

    const hashedPassword = await hashPassword(password);
    await createUser({ email, name, password: hashedPassword });

    return response.status(201).send({
      message: "user created successfully",
    });
  } else {
    throw new Error(data.error.message);
  }
};
export const loginUserHandler = async (
  request: Request,
  response: Response
) => {
  const data = loginUserSchema.safeParse(request.body);
  if (data.success) {
    const invalidCredentialsError = "The provided user details are invalid";

    const { email, password } = data.data;

    const user = await FindUser(email);

    if (!user) throw new Error(invalidCredentialsError);

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) throw new Error(invalidCredentialsError);
    const token = generateAccessToken(user.email);
    return response.cookie("token", token).status(200).send({
      message: "logged in successfully",
      token,
    });
  } else {
    throw new Error(data.error.message);
  }
};
