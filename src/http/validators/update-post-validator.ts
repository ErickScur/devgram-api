import { z } from "zod";

export const updatePostValidator = z.object({
    content: z.string().min(20).optional()
})