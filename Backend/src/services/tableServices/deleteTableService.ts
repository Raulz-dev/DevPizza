import { prisma } from "../../lib/prisma";
import { Table } from "@prisma/client";

export const deleteTableService = async (id: number): Promise<Table> => {
  try {
    const table = await prisma.table.delete({
      where: { id },
    });
    return table;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
