import { Payment } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export const getOnePaymentService = async (id: number): Promise<Payment> => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { order: { select: { id: true, status: true } } },
    });
    if (!payment) throw new Error("Pagamento não encontrado.");
    return payment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
