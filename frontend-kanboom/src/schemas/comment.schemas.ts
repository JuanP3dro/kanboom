import z from 'zod'
import { allowedUsersSchema } from './board.schemas'

export const createCommentSchema = z.object({
    id: z.number().optional(),
    cardId: z.number().optional(),
    author: z.string().optional(),
    comment: z.string(),
    attachment: z.unknown().optional(),
    allowedUsers: z.array(allowedUsersSchema).optional()
})

export type CreateCommentData = z.infer<typeof createCommentSchema>