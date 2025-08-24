import { Request, Response } from "express";
import { deleteMenuItemService } from "../../services/menuItemServices/deleteMenuItemServices";
import { createMenuItemService } from "../../services/menuItemServices/createMenuItemServices";
import {
  createMenuItemSchema,
  updateMenuItemSchema,
} from "../../schema/menuItemSchema";
import { updateMenuItemService } from "../../services/menuItemServices/updateMenuItemServices";
import { getOneMenuItemService } from "../../services/menuItemServices/getOneMenuItemServices";
import { prisma } from "../../lib/prisma";

export async function createMenuItem(req: Request, res: Response) {
  try {
    const validation = createMenuItemSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }
    const menuItem = await createMenuItemService({
      name: validation.data.name,
      description: validation.data.description,
      price: validation.data.price,
      isActive: validation.data.isActive,
      categoryId: validation.data.categoryId,
    });
    return res.status(201).json(menuItem);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao criar item de menu" });
  }
}

export async function getAllMenuItems(req: Request, res: Response) {
  try {
    const menuItem = await prisma.menuItem.findMany();

    return res.status(200).json(menuItem);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao buscar itens de menu" });
  }
}

export async function getMenuItemById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const menuItem = await getOneMenuItemService(+id);

    return res.status(200).json(menuItem);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao buscar item de menu" });
  }
}

export async function updateMenuItem(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const validation = updateMenuItemSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }
    const menuItem = await updateMenuItemService({
      id: +id,
      name: validation.data.name,
      description: validation.data.description,
      price: validation.data.price,
      isActive: validation.data.isActive,
      categoryId: validation.data.categoryId,
    });
    return res.status(200).json(menuItem);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao atualizar item de menu" });
  }
}

export async function deleteMenuItem(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const menuItem = await deleteMenuItemService({ id: +id });

    return res.status(200).json(menuItem);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao deletar item de menu" });
  }
}
