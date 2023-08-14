import z from 'zod'
import { getCardSchema } from './card.schemas'

export const createColumnSchema = z.object({
    name: z.string().nonempty("Nome da coluna é obrigatório"),
    color: z.string()
})
export const getColumnSchema = z.object({
    id: z.number(),
    name: z.string().nonempty("Nome da coluna é obrigatório"),
    color: z.string(),
    boardId: z.number(),
    card: z.array(getCardSchema)
})

export const updateColumnSchema = z.object({
    name: z.string().optional(),
    color: z.string()
})

export type CreateColumnData = z.infer<typeof createColumnSchema>
export type GetColumnData = z.infer<typeof getColumnSchema>
export type UpdateColumnData = z.infer<typeof updateColumnSchema>