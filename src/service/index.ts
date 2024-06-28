import { User } from "../db/model/user.js";
import { UserData } from "../validation/index.js";

export const FindUser = async (email: string) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error(error);
  }
};
export const createUser = async (data: UserData) => {
  try {
    await User.create(data);
  } catch (error) {
    throw new Error(error);
  }
};
export const updateUser = async (email: string, name: string) => {
  try {
    await User.updateOne({ email }, { $set: { name } });
  } catch (error) {
    throw new Error(error);
  }
};
export const deleteUser = async (email: string) => {
  try {
    await User.deleteOne({ email });
  } catch (error) {
    throw new Error(error);
  }
};
