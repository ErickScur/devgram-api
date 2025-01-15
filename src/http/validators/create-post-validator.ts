import { z } from 'zod'

export const createPostValidator = z.object({
    content: z.string().min(20),
})