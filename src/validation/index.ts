import * as z from "zod";

const baseAuthSchema = {
  email: z
    .string()
    .email({ message: "invalid email please use a vaild email" }),
  password: z.string().min(6, "weak password please use at least 6 char"),
};

export const createUserSchema = z.object({
  ...baseAuthSchema,
  name: z.string().min(3, "name must be at least 3 chars").max(30),
});
export const updateUserSchema = z.object({
  name: z.string().min(3, "name must be at least 3 chars").max(30),
});
export const loginUserSchema = z.object({ ...baseAuthSchema });

export type UserData = z.infer<typeof createUserSchema>;
export type LoginData = z.infer<typeof loginUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
