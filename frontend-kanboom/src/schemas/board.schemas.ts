import z from 'zod'

export const createBoardSchema =  z.object({
    name: z.string().nonempty('nome do quadro é obrigatório')
})
export const getBoardSchema = z.object({
    id: z.number(),
    name: z.string().nonempty('nome do quadro é obrigatório'),
    allowedUsers: z.array(z.object({
      id: z.number(),
      name: z.string(),
      profilePhoto: z.string().nullable(),
      userBoardRole: z.object({
        role: z.string()
      })
    }))
  });
  
export const updateBoardSchema = z.object({
    name: z.string().nonempty('nome do quadro é obrigatório')
  });

interface BoardRole {
  role: string;
}

export interface AllowedUsers {
  id: number;
  name: string;
  profilePhoto: string | null;
  userBoardRole: BoardRole

}

export const updateRoleSchema = z.object({
  role: z.string()
})

export const allowedUsersSchema = z.object({
  id: z.number(),
  name: z.string(),
  profilePhoto: z.string().nullable(),
  userBoardRole: z.object({
    role: z.string()
  })
})

export const acceptInviteSchema = z.object({
  email: z.string(),
  token: z.string()
})
export const shareInviteSchema = z.object({
  email: z.string(),
  role: z.string()
})

export const deleteBoardMemberSchema = z.object({
  boardId: z.number(),
  userId: z.number()
})

export type CreateBoardData = z.infer<typeof createBoardSchema>
export type GetBoardData = z.infer<typeof getBoardSchema>
export type UpdateBoardData = z.infer<typeof updateBoardSchema>
export type AcceptInviteData = z.infer<typeof acceptInviteSchema>
export type ShareInviteData = z.infer<typeof shareInviteSchema>
export type UpdateRoleData = z.infer<typeof updateRoleSchema>
export type DeleteBoardMemberData = z.infer<typeof deleteBoardMemberSchema>