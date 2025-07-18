import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(1000, "Message too long"),
  isFromUser: z.boolean().optional(),
  isAI: z.boolean().optional(),
});


