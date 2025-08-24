import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../../schema/categorySchema";
import { createCategoryService } from "../../services/categoryServices/createCategoryServices";
import { getOneCategoryService } from "../../services/categoryServices/getOneCategoryServices";
import { updateCategoryService } from "../../services/categoryServices/updateCategoryServices";
import { deleteCategoryService } from "../../services/categoryServices/deleteCategoryServices";

export async function createCategory(req: Request, res: Response) {
  try {
    const validation = createCategorySchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }
    const category = await createCategoryService({
      name: validation.data.name,
    });
    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao criar categoria" });
  }
}

export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await prisma.category.findMany();

    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao buscar categorias" });
  }
}

export async function getCategoryById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const category = await getOneCategoryService(+id);

    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao buscar categoria" });
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const validation = updateCategorySchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }

    const updated = await updateCategoryService({
      id: +id,
      name: validation.data.name,
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao atualizar categoria" });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const category = await deleteCategoryService({ id: +id });

    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao deletar categoria" });
  }
}
