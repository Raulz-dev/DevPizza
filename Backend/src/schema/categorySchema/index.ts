import { z } from "zod";


export const createCategorySchema = z.object({
  name: z.string().trim().min(1).max(120),
});


export const updateCategorySchema = z
  .object({
    name: z.string().trim().min(1).max(120),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Ao menos um campo deve ser enviado",
    path: [],
  });


export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
