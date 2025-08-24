import { MenuItem } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface CreateData {
  name: string;
  description?: string;
  price: number;
  isActive?: boolean;
  categoryId?: number;
}

export const createMenuItemService = async (
  data: CreateData
): Promise<MenuItem> => {
  try {
    if (!data.name || !data.price) throw new Error();

    const created = await prisma.menuItem.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        isActive: data.isActive,
        categoryId: data.categoryId,
      },
    });
    return created;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
