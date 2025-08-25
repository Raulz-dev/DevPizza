import { z } from "zod";

export const createPaymentSchema = z.object({
  body: z.object({
    orderId: z.number().int().positive(),
    method: z.string().min(1),
    amount: z.number().positive(),
    change: z.number().nonnegative().optional(),
    payingAt: z.string().datetime(),
    paidAt: z.string().datetime().optional(),
  }),
});

export const updatePaymentSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/),
  }),
  body: z
    .object({
      method: z.string().min(1).optional(),
      amount: z.number().positive().optional(),
      change: z.number().nonnegative().optional(),
      payingAt: z.string().datetime().optional(),
      paidAt: z.string().datetime().optional(),
    })
    .refine((obj) => Object.keys(obj).length > 0, {
      message: "Informe ao menos um campo para atualizar.",
    }),
});

export type CreatePaymentDTO = z.infer<typeof createPaymentSchema>["body"];
export type UpdatePaymentDTO = z.infer<typeof updatePaymentSchema>["body"];
