import { Order } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { OrderStatus } from "../../types/order";



interface UpdateOrderData {
  tableId?: number;
  customerName?: string;
  status?: OrderStatus;
  closedById?: number;
  closedAt?: Date | string;
}

export const updateOrderService = async (
  id: number,
  data: UpdateOrderData
): Promise<Order> => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new Error("Informe ao menos um campo para atualizar.");
    }

    const current = await prisma.order.findUnique({ where: { id } });
    if (!current) throw new Error("Pedido não encontrado.");

    const closedAt =
      typeof data.closedAt === "string"
        ? new Date(data.closedAt)
        : data.closedAt;

    const updated = await prisma.order.update({
      where: { id },
      data: {
        tableId: data.tableId,
        customerName: data.customerName,
        status: data.status,
        closedById: data.closedById,
        closedAt: closedAt,
      },
    });

    return updated;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
