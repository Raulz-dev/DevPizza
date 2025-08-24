import { Category } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface DeleteCategoryData {
  id: number;
}

export const deleteCategoryService = async (
  data: DeleteCategoryData
): Promise<Category> => {
  try {
    const { id } = data;

    const category = await prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new Error("Categoria não encontrada");
    }

    const deleted = await prisma.category.delete({
      where: { id },
    });

    return deleted;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
