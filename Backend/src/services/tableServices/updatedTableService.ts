import { prisma } from "../../lib/prisma";
import { Table } from "@prisma/client";
import { tableStatus } from "../../types/table";

export type UpdateTableData = {
  numeroMesa?: number;
  status?: tableStatus;
  quantidadeDeCadeiras?: number;
};

export const updateTableService = async (
  id: number,
  data: UpdateTableData
): Promise<Table> => {
  try {
    const table = await prisma.table.findUnique({ where: { id } });

    if (!table) throw new Error("Mesa não encontrada!");

    const updated = await prisma.table.update({
      where: { id },
      data: {
        number: data.numeroMesa,
        seats: data.quantidadeDeCadeiras,
        status: data.status,
      },
    });

    return updated;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
