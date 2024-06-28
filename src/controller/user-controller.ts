import { Request, Response } from "express";
import { updateUserSchema } from "../validation/index.js";
import { FindUser, deleteUser, updateUser } from "../service/index.js";
export const updateUserHandler = async (
  request: Request,
  response: Response
) => {
  const data = updateUserSchema.safeParse(request.body);
  if (data.success) {
    const { name } = data.data;
    const { email } = request.params;

    const user = await updateUser(email, name);

    return response.status(201).send({
      message: "user updated successfully",
      user,
    });
  } else {
    throw new Error(data.error.message);
  }
};
export const deleteUserHandler = async (
  request: Request,
  response: Response
) => {
  const { email } = request.params;
  await deleteUser(email);
  return response.status(200).send({
    message: "user deleted successfully",
  });
};
export const getUserHandler = async (request: Request, response: Response) => {
  const { email } = request.params;

  const user = await FindUser(email);
  return response.status(200).send({
    message: "success",
    user,
  });
};
