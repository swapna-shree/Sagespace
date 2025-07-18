import {z} from "zod";
import { passwordValidation } from "@/validation/password";


export const signInSchema = z.object({
    identifier : z.string(),
    password : passwordValidation,
})


