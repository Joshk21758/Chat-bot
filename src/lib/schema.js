import { z } from "zod";

//Register form schema
export const RegisterFormSchema = z.object({
  email: z.string().trim(),
  password: z
    .string()
    .trim()
    .min(8, { error: "Password must be atleast 8 characters" }),
  confirmPassword: z.string().trim(),
});

//Login form schema
export const LoginFormSchema = z.object({
  email: z.string().trim(),
  password: z
    .string()
    .trim()
    .min(8, { error: "Password must be atleast 8 characters" }),
});
