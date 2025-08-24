import { MenuItem } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface UpdateData {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  isActive?: boolean;
  categoryId?: number | null;
}

export const updateMenuItemService = async (
  data: UpdateData
): Promise<MenuItem> => {
  try {
    const { id, ...fields } = data;

    const exists = await prisma.menuItem.findUnique({ where: { id } });
    if (!exists) {
      throw new Error("Item de menu não encontrado");
    }

    const updated = await prisma.menuItem.update({
      where: { id },
      data: fields,
    });

    return updated;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
