import { OrderItem } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface DataOrderItem {
  orderId: number;
  menuItemId: number;
  quantity: number;
  unitPrice: number;
  notes?: string;
}

export const createOrderItemService = async (data: DataOrderItem): Promise<OrderItem> => {
  try {
    const orderItem = await prisma.orderItem.create({
      data,
    });
    return orderItem;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar item do pedido!");
  }
};
