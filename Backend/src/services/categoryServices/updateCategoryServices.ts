import { Category } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface CategoryData {
  id: number;
  name: string;
}

export const updateCategoryService = async (
  data: CategoryData
): Promise<Category> => {
  try {
    const { id, name } = data;

    const category = await prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new Error("Categoria não encontrada");
    }

    const updated = await prisma.category.update({
      where: { id },
      data: { name },
    });

    return updated;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
