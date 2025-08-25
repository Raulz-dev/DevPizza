import { Request, Response } from "express";

import { createOrderSchema, updateOrderSchema } from "../../schema/orderSchema";
import { prisma } from "../../lib/prisma";
import { getOneOrderService } from "../../services/orderServices/getOneOrderService";
import { createOrderService } from "../../services/orderServices/createOrderService";
import { updateOrderService } from "../../services/orderServices/updateOrderService";
import { deleteOrderService } from "../../services/orderServices/deleteOrderService";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany();
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao buscar pedidos!" });
  }
};

export const getOneOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await getOneOrderService(+id);
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao achar pedido!" });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const validation = createOrderSchema.safeParse({ body: req.body });
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }
    const order = await createOrderService(validation.data.body);
    return res.status(201).json(order);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao criar pedido!" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validation = updateOrderSchema.safeParse({
      params: { id },
      body: req.body,
    });
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }
    const order = await updateOrderService(+id, validation.data.body);
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao atualizar pedido!" });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteOrderService(+id);
    return res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao deletar pedido!" });
  }
};
