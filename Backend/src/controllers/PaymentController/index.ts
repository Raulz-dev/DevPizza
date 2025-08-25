import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

import {
  createPaymentSchema,
  updatePaymentSchema,
} from "../../schema/paymentSchema";
import { getOnePaymentService } from "../../services/paymentServices/getOnePaymentService";
import { createPaymentService } from "../../services/paymentServices/createPaymentService";
import { updatePaymentService } from "../../services/paymentServices/updatePaymentService";
import { deletePaymentService } from "../../services/paymentServices/deletePaymentService";

export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const payments = await prisma.payment.findMany();
    return res.status(200).json(payments);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao buscar pagamentos!" });
  }
};

export const getOnePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payment = await getOnePaymentService(+id);
    return res.status(200).json(payment);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao achar pagamento!" });
  }
};

export const createPayment = async (req: Request, res: Response) => {
  try {
    const validation = createPaymentSchema.safeParse({ body: req.body });
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }
    const payment = await createPaymentService(validation.data.body);
    return res.status(201).json(payment);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao criar pagamento!" });
  }
};

export const updatePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validation = updatePaymentSchema.safeParse({
      params: { id },
      body: req.body,
    });
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }
    const payment = await updatePaymentService(+id, validation.data.body);
    return res.status(200).json(payment);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao atualizar pagamento!" });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deletePaymentService(+id);
    return res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao deletar pagamento!" });
  }
};
