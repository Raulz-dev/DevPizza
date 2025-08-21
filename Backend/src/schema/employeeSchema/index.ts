import { z } from "zod";

export const createEmployeeSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  cargo: z.string().min(1, "Cargo é obrigatório"),
  turno: z.string().min(1, "Turno é obrigatório"),
});

export const updateEmployeeSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").optional(),
  email: z.string().email("Email inválido").optional(),
  senha: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .optional(),
  cargo: z.string().min(1, "Cargo é obrigatório").optional(),
  turno: z.string().min(1, "Turno é obrigatório").optional(),
});

export type CreateEmployeeDTO = z.infer<typeof createEmployeeSchema>;
export type updateEmployeeDTO = z.infer<typeof updateEmployeeSchema>;
