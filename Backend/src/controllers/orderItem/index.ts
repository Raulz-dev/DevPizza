import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { createOrderItemSchema, updateOrderItemSchema } from "../../schema/orderItemSchema";
import { createOrderItemService } from "../../services/orderItemServices/createOrderItemService";
import { updateOrderItemService } from "../../services/orderItemServices/updateOrderItemServices";
import { getOneOrderItemService } from "../../services/orderItemServices/getOneOrderItemService";
import { deleteOrderItemService } from "../../services/orderItemServices/deleteOrderItemServices";

export const getAllOrderItems = async (req: Request, res: Response) => {
  try {
    const getAllOrderItems = await prisma.orderItem.findMany();
    return res.status(200).json(getAllOrderItems);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao buscar itens do pedido!" });
  }
};

export const getOneOrderItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const oneOrderItem = await getOneOrderItemService(+id);
    return res.status(200).json(oneOrderItem);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao achar item do pedido!" });
  }
};

export const createOrderItem = async (req: Request, res: Response) => {
  try {
    const validation = createOrderItemSchema.safeParse(req.body);

    if (!validation.success) throw new Error("Erro de validação!");

    const orderItem = await createOrderItemService(validation.data.body);

    return res.status(201).json(orderItem);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao criar item do pedido!" });
  }
};

export const updateOrderItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const validation = updateOrderItemSchema.safeParse(req.body);

    if (!validation.success) throw new Error("Erro de validação!");

    const orderItem = await updateOrderItemService({
      orderId: validation.data.body.orderId,
      menuItemId: validation.data.body.menuItemId,
      quantity: validation.data.body.quantity,
      unitPrice: validation.data.body.unitPrice,
      notes: validation.data.body.notes,
      id: +id,
    });
    return res.status(200).json(orderItem);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao atualizar item do pedido!" });
  }
};

export const deleteOrderItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orderItem = await deleteOrderItemService(+id);
    return res.status(200).json(orderItem);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao deletar item do pedido!" });
  }
};
