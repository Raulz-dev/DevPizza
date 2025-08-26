import { prisma } from "../../lib/prisma";
export const deleteOrderItemService = async (id: number) => {
  try {
    const idOrderItem = await prisma.orderItem.findUnique({ where: { id } });

    if (!idOrderItem) throw new Error("Item do pedido não encontrado!");

    const orderItem = await prisma.orderItem.delete({
      where: { id },
    });
    return orderItem;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar item do pedido!");
  }
};
