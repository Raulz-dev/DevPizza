import { prisma } from "../../lib/prisma";

export const getOneOrderItemService = async (id: number) => {
  try {
    const orderItem = await prisma.orderItem.findUnique({
      where: { id },
    });
    if (!orderItem) throw new Error("Item do pedido não encontrado");
    return orderItem;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar item do pedido!");
  }
};
