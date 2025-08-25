import { Payment } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { UpdatePaymentDTO } from "../../schema/paymentSchema";

export const updatePaymentService = async (
  id: number,
  data: UpdatePaymentDTO
): Promise<Payment> => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new Error("Informe ao menos um campo para atualizar.");
    }

    const exists = await prisma.payment.findUnique({ where: { id } });
    if (!exists) throw new Error("Pagamento não encontrado.");

    const updated = await prisma.payment.update({
      where: { id },
      data: {
        method: data.method,
        amount: data.amount,
        change: data.change,
        payingAt: data.payingAt ? new Date(data.payingAt) : undefined,
        paidAt: data.paidAt ? new Date(data.paidAt) : undefined,
      },
    });

    return updated;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
