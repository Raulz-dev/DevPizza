import { Category } from "@prisma/client";
import { prisma } from "../../lib/prisma";


interface categoryData {
  name: string;
}

export const createCategoryService = async (
  data: categoryData
): Promise<Category> => {
  try {
    const { name } = data;

    if (!name)
      throw new Error("Nome é obrigatório para a criação de uma categoria");

    const categoryExist = await prisma.category.findUnique({
      where: {
        name: name,
      },
    });

    if (categoryExist) throw new Error("Essa categoria já existe!");

    const newCategory = await prisma.category.create({
      data: {
        name: name,
      },
    });

    return newCategory;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
