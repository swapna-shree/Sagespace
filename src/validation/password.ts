import {z} from "zod";

const passwordRegex = /^[a-zA-Z0-9_]{8,15}$/;

export const passwordValidation = z
    .string()
    .regex(passwordRegex, "Password must be 8-15 characters with only letters, digits, and underscores")