import { z } from "zod";

const OrderStatusEnum = z.enum(["OPEN", "IN_PROGRESS", "CLOSED", "CANCELED"]);

export const createOrderSchema = z.object({
  body: z
    .object({
      tableId: z.number().int().positive(),
      customerName: z.string().min(2).max(120).optional(),
      openedById: z.number().int().positive(),
    })

    .refine((b) => !!b.tableId || !!b.customerName, {
      message: "Informe 'tableId' ou 'customerName'.",
    }),
});

export const updateOrderSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/),
  }),
  body: z
    .object({
      tableId: z.number().int().positive().optional(),
      customerName: z.string().min(2).max(120).optional(),
      status: OrderStatusEnum.optional(),
      closedById: z.number().int().positive().optional(),
      closedAt: z.string().datetime().optional(),
    })
    .refine((obj) => Object.keys(obj).length > 0, {
      message: "Informe ao menos um campo para atualizar.",
    }),
});

export type CreateOrderDTO = z.infer<typeof createOrderSchema>["body"];
export type UpdateOrderDTO = z.infer<typeof updateOrderSchema>["body"];
