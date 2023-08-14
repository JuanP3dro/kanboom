import z from 'zod'

export const getNotificationSchema = z.object({
    id: z.number(),
    text: z.string(),
    read: z.boolean(),
    users: z.array(z.object({
        id: z.number(),
        name: z.string(),
        UserNotifications: z.object({
            userId: z.number(),
            notificationId: z.number()
        })
    }))
})

export type GetNotificationData = z.infer<typeof getNotificationSchema>