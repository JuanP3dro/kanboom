import z from "zod";

export const registerSchema = z
  .object({
    name: z.string().nonempty("Nome é obrigatório"),
    email: z
      .string()
      .email("Email deve ser válido")
      .nonempty("Email é obrigatório"),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .nonempty("Senha é obrigatória"),
    confirmPassword: z.string().nonempty(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas precisam ser iguais",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .email("Email deve ser válido")
    .nonempty("Email é obrigatório"),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .nonempty("Senha é obrigatória"),
});

export const sendEmailSchema = z.object({
  email: z
    .string()
    .email("Deve ser um e-mail")
    .nonempty("E-mail é obrigatório"),
});

export const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .nonempty("Senha é obrigatória"),
    confirmPassword: z.string().nonempty()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas precisam ser iguais",
  path: ["confirmPassword"],
});

export const getUserSchema = z.object({
  name: z.string(),
  completedStep: z.boolean(),
  email: z.string(),
  id: z.number(),
  expiredToken: z.string().nullable(),
  isValid: z.boolean(),
  password: z.string(),
  tokenAuth: z.string(),
  profilePhoto: z.string().nullable(),
})

export const updateUserSchema = z
.object({
  profilePhoto: z.unknown().optional(),
  name: z.string(),
  email: z
    .string(),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
  confirmPassword: z.string().nonempty(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas precisam ser iguais",
  path: ["confirmPassword"],
});

export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type iSendEmail = z.infer<typeof sendEmailSchema>;
export type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;
export type UpdateUserData = z.infer<typeof updateUserSchema>;
export type UserData = z.infer<typeof getUserSchema>;
