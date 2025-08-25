import { Payment } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export const deletePaymentService = async (id: number): Promise<Payment> => {
  try {
    const exists = await prisma.payment.findUnique({ where: { id } });
    if (!exists) throw new Error("Pagamento não encontrado.");

    const deleted = await prisma.payment.delete({ where: { id } });
    return deleted;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
