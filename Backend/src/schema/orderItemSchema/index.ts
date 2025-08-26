import { z } from "zod";

export const createOrderItemSchema = z.object({
  body: z.object({
    orderId: z.number().int().positive(),
    menuItemId: z.number().int().positive(),
    quantity: z.number().int().positive().default(1),
    unitPrice: z.number().positive(),
    notes: z.string().optional(),
  }),
});

export const updateOrderItemSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/),
  }),
  body: z
    .object({
      orderId: z.number().int().positive().optional(),
      menuItemId: z.number().int().positive().optional(),
      quantity: z.number().int().positive().optional(),
      unitPrice: z.number().positive().optional(),
      notes: z.string().optional(),
    })
    .refine((obj) => Object.keys(obj).length > 0, {
      message: "Informe ao menos um campo para atualizar.",
    }),
});

export type CreateOrderItemDTO = z.infer<typeof createOrderItemSchema>["body"];
export type UpdateOrderItemDTO = z.infer<typeof updateOrderItemSchema>["body"];
