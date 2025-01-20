import { z } from 'zod'

export const updateCommentValidator = z.object({
    content: z.string().min(5).max(200)
})