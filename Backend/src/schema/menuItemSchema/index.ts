import { z } from "zod";

export const createMenuItemSchema = z.object({
  name: z.string().trim().min(1).max(120),
  description: z.string().trim().max(1000).optional(),
  price: z.number().positive(),
  isActive: z.boolean().optional(),
  categoryId: z.number().int().positive().optional(),
});

export const updateMenuItemSchema = z
  .object({
    name: z.string().trim().min(1).max(120).optional(),
    description: z.string().trim().max(1000).optional(),
    price: z.number().positive().optional(),
    isActive: z.boolean().optional(),
    categoryId: z.number().int().positive().nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Ao menos um campo deve ser enviado",
    path: [],
  });

export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItemInput = z.infer<typeof updateMenuItemSchema>;
