import { Category } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export const getOneCategoryService = async (id: number): Promise<Category> => {
  try {
    const category = await prisma.category.findUnique({ where: { id: id } });

    if (!category) throw new Error("Essa categoria não existe");

    return category;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
