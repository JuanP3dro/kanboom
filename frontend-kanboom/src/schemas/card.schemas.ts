import z from 'zod'
import { createCommentSchema } from './comment.schemas'

export const createCardSchema = z.object({
    title: z.string().nonempty("Funcionalidade do card é obrigatória"),
    description: z.string(),
    responsible: z.string(),
    historyPoints: z.string(),
    hours: z.string()
})

const commentSchema = z.object({
    id: z.number(),
    cardId: z.string(),
    author: z.string(),
    comment: z.string(),
    attachment: z.string().url(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export const getCardSchema = z.object({
    id: z.number(),
    title: z.string().nonempty("Funcionalidade do card é obrigatória"),
    description: z.string(),
    responsible: z.number(),
    historyPoints: z.string(),
    hours: z.string(),
    columnId: z.number(),
    comments: z.array(commentSchema),
    responsibleUser: z.object({
        id:z.number(),
        profilePhoto: z.string().nullable(),
        name: z.string()
    })
})

export const updateCardSchema = z.object({
    id: z.number().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    responsible: z.number().optional(),
    historyPoints: z.string().optional(),
    hours: z.string().optional(),
    columnId: z.number().optional()
    
})

export const moveCardSchema = z.object({
    id: z.number(),
    columnId: z.number()
})

export interface ResponsibleUser {
    id: number,
    profilePhoto: string | null;
    name: string
}

export type CreateCardData = z.infer<typeof createCardSchema>
export type GetCardData = z.infer<typeof getCardSchema>
export type UpdateCardData = z.infer<typeof updateCardSchema>
export type MoveCardData = z.infer<typeof moveCardSchema>