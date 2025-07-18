import { z } from "zod";
import { emailValidation } from "@/validation/email";

export const resendCodeSchema = z.object({
  email: emailValidation,
});
