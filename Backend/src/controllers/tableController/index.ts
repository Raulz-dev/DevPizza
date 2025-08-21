import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { createTableService } from "../../services/tableServices/createTableService";
import { deleteTableService } from "../../services/tableServices/deleteTableService";
import { getOneTableService } from "../../services/tableServices/getOneTableService";
import { updateTableService } from "../../services/tableServices/updatedTableService";
import { createTableSchema, updateTableSchema } from "../../schema/tableSchema";

export const getAllTables = async (req: Request, res: Response) => {
  try {
    const tables = await prisma.table.findMany();
    res.status(200).json(tables);
  } catch (error) {
    res.status(400).json({ error: "Erro ao buscar mesas!" });
    console.log(error);
  }
};

export const createTables = async (req: Request, res: Response) => {
  try {
    const validation = createTableSchema.safeParse(req.body);

    if (!validation.success)
      return res.status(400).json({ error: validation.error.format() });

    const mesa = await createTableService(validation.data);

    return res.status(201).json(mesa);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao criar mesa!" });
  }
};

export const deleteTable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const table = await deleteTableService(+id);

    return res.status(200).json(table);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao deletar mesa!" });
  }
};

export const getOneTable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const table = await getOneTableService(+id);

    return res.status(200).json(table);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao achar mesa!" });
  }
};

export const updateTable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const validation = updateTableSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }

    const mesa = await updateTableService(+id, validation.data);
    return res.status(200).json(mesa);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao atualizar mesa!" });
  }
};
