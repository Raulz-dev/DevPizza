import { prisma } from "../../lib/prisma";
import { Table } from "@prisma/client";

export const getOneTableService = async (id: number): Promise<Table | null> => {
  try {
    const table = await prisma.table.findUnique({
      where: { id },
    });

    if (!table) throw new Error("A mesa não existe!");

    return table;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
