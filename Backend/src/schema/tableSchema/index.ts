import { z } from "zod";
import { TableStatus } from "@prisma/client";

export const createTableSchema = z.object({
  numeroMesa: z.number().int().positive(),
  status: z.nativeEnum(TableStatus),
  quantidadeDeCadeiras: z.number().int().min(2),
});

export const updateTableSchema = z.object({
  numeroMesa: z.number().int().positive().optional(),
  status: z.nativeEnum(TableStatus).optional(),
  quantidadeDeCadeiras: z.number().int().min(2).optional(),
});

export type CreateTableInput = z.infer<typeof createTableSchema>;
export type UpdateTableInput = z.infer<typeof updateTableSchema>;
