import { z } from 'zod'

export const createCommentValidator = z.object({
    content: z.string().min(5).max(200)
})