import { Order } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export const deleteOrderService = async (id: number): Promise<Order> => {
  try {
    const exists = await prisma.order.findUnique({ where: { id } });
    if (!exists) throw new Error("Pedido não encontrado.");

    const deleted = await prisma.order.delete({ where: { id } });
    return deleted;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
