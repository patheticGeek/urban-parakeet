import { z } from "zod";

const name = z
  .string({ required_error: "Please enter a name" })
  .min(3, "Name must be at least 3 characters");
const email = z
  .string({ required_error: "Please enter an email address" })
  .email("Please enter a valid email address");
const password = z
  .string({ required_error: "Please enter a password" })
  .min(6, "Password must be at least 6 characters");

export const signInSchema = z.object({ email, password });
export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({ name, email, password });
export type SignUpSchema = z.infer<typeof signUpSchema>;

export const verifyEmailSchema = z.object({ code: z.string().min(1), email });
