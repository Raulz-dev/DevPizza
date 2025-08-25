import { Payment } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { CreatePaymentDTO } from "../../schema/paymentSchema";

export const createPaymentService = async (
  data: CreatePaymentDTO
): Promise<Payment> => {
  try {
    if (!data.orderId || !data.method || !data.amount || !data.payingAt) {
      throw new Error("orderId, method, amount e payingAt são obrigatórios.");
    }

    const order = await prisma.order.findUnique({
      where: { id: data.orderId },
    });
    if (!order) throw new Error("Pedido não encontrado.");

    const created = await prisma.payment.create({
      data: {
        orderId: data.orderId,
        method: data.method,
        amount: data.amount,
        change: data.change,
        payingAt: new Date(data.payingAt),
        paidAt: data.paidAt ? new Date(data.paidAt) : undefined,
      },
    });

    return created;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
