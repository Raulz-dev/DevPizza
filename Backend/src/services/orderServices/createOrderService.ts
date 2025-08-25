
import { Order } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface CreateOrderData {
  tableId?: number;
  customerName?: string;
  openedById: number;
}

export const createOrderService = async (
  data: CreateOrderData
): Promise<Order> => {
  try {
    if (!data.openedById) {
      throw new Error("O campo 'openedById' é obrigatório.");
    }
    if (!data.tableId && !data.customerName) {
      throw new Error("Informe 'tableId' ou 'customerName'.");
    }

    if (data.tableId) {
      const table = await prisma.table.findUnique({
        where: { id: data.tableId },
      });
      if (!table) throw new Error("Mesa não encontrada.");
    }

    const created = await prisma.order.create({
      data: {
        tableId: data.tableId,
        customerName: data.customerName,
        openedById: data.openedById,
      },
    });

    return created;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
