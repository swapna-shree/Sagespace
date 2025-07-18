import { z } from "zod";
import { emailValidation } from "@/validation/email";
import { passwordValidation } from "@/validation/password";
import { usernameValidation } from "@/validation/username";


export const signUpSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});


