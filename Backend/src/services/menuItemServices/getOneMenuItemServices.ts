import { MenuItem } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export const getOneMenuItemService = async (id: number): Promise<MenuItem> => {
  try {
    const item = await prisma.menuItem.findUnique({ where: { id } });
    if (!item) throw new Error("Item de menu não encontrado");
    return item;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
