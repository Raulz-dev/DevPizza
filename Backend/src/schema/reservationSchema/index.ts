import { z } from "zod";

export const createReservationSchema = z.object({
  body: z.object({
    tableId: z.number().int().positive(),
    customerName: z.string().min(2).max(120),
    phone: z.string().min(5).max(30),
    reservedFor: z.string().datetime(),
  }),
});

export const updateReservationSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/),
  }),
  body: z
    .object({
      tableId: z.number().int().positive().optional(),
      customerName: z.string().min(2).max(120).optional(),
      phone: z.string().min(5).max(30).optional(),
      reservedFor: z.string().datetime().optional(),
    })
    .refine((obj) => Object.keys(obj).length > 0, {
      message: "Informe ao menos um campo para atualizar.",
    }),
});

export type CreateReservationDTO = z.infer<
  typeof createReservationSchema
>["body"];
export type UpdateReservationDTO = z.infer<
  typeof updateReservationSchema
>["body"];
