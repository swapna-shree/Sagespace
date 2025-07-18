import { z } from "zod";

export const sendReplySchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  content: z.string().min(1, "Reply content is required").max(1000),
  isAI: z.boolean().optional(), 
});
