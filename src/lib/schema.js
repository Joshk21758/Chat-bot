import { z } from "zod";

//Register form schema
export const RegisterFormSchema = z
  .object({
    email: z.string().trim(),
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be atleast 8 characters" }),
    confirmPassword: z.string().trim(),
  })
  .refine((val) => val.password == val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

//Login form schema
export const LoginFormSchema = z.object({
  email: z.string().trim(),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be atleast 8 characters" }),
});
