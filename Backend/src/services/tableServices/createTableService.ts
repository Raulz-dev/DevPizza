import { Table } from "@prisma/client";
import { tableStatus } from "../../types/table";
import { prisma } from "../../lib/prisma";

interface TableData {
  numeroMesa: number;
  status: tableStatus;
  quantidadeDeCadeiras: number;
}

export const createTableService = async (
  tableData: TableData
): Promise<Table> => {
  try {
    const { numeroMesa, status, quantidadeDeCadeiras } = tableData;

    if (!numeroMesa || !status || !quantidadeDeCadeiras)
      throw new Error(
        "Numero da mesa, status e quantidade de cadeiras são obrigatórias"
      );

    const oldTable = await prisma.table.findUnique({
      where: {
        number: numeroMesa,
      },
    });

    if (oldTable) throw new Error("Uma mesa com essa numeração jà existe!");

    const table = await prisma.table.create({
      data: {
        number: numeroMesa,
        seats: quantidadeDeCadeiras,
        status: status,
      },
    });

    return table;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
