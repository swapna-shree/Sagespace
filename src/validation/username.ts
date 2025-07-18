import {z} from "zod";

export const usernameValidation = z
  .string()
  .min(8, "Username must be at least 8 characters")
  .max(15, "Username must be at most 15 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

