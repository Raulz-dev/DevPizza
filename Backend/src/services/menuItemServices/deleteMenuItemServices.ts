import { MenuItem } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface DeleteData {
  id: number;
}

export const deleteMenuItemService = async (
  data: DeleteData
): Promise<MenuItem> => {
  try {
    const exists = await prisma.menuItem.findUnique({ where: { id: data.id } });
    if (!exists) throw new Error("Item de menu não encontrado");

    const deleted = await prisma.menuItem.delete({ where: { id: data.id } });
    return deleted;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
