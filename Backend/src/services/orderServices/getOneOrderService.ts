import { Order } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export const getOneOrderService = async (id: number): Promise<Order> => {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        table: { select: { id: true, number: true } },
        items: true,
        payments: true,
      },
    });

    if (!order) throw new Error("Pedido não encontrado.");
    return order;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
