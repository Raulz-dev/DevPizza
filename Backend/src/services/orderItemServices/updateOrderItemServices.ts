import { OrderItem } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface DataOrderItem {
  id: number;
  orderId?: number;
  menuItemId?: number;
  quantity?: number;
  unitPrice?: number;
  notes?: string;
}

export const updateOrderItemService = async (data: DataOrderItem): Promise<OrderItem> => {
  try {
    const OldOrderitem = await prisma.orderItem.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!OldOrderitem) throw new Error("Item do pedido não encontrado");

    const orderItem = await prisma.orderItem.update({
      where: { id: data.id },
      data,
    });
    return orderItem;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar item do pedido!");
  }
};
