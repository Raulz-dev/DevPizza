import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../../schema/employeeSchema";
import { createEmployeeService } from "../../services/employeeServices/createEmployeeService";
import { updateEmployeeService } from "../../services/employeeServices/updateEmployeeService";
import { deleteEmployeeService } from "../../services/employeeServices/deleteEmployeeService";
import { employeeCargo } from "../../types/employee";
import { getEmployeeByIdService } from "../../services/employeeServices/getEmployeeByIdService";

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const getAllEmployees = await prisma.employee.findMany();
    res.status(200).json(getAllEmployees);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const getEmployee = await getEmployeeByIdService(+id);

    res.status(200).json(getEmployee);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const validation = createEmployeeSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }

    const employee = await createEmployeeService({
      name: validation.data.name,
      email: validation.data.email,
      senha: validation.data.senha,
      cargo: validation.data.cargo as employeeCargo,
      turno: validation.data.turno,
    });

    return res.status(201).json(employee);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao cadastrar funcionário!" });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const validation = updateEmployeeSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }

    const updated = await updateEmployeeService(+id, validation.data);

    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao atualizar funcionário!" });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await deleteEmployeeService(+id);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao deletar funcionário!" });
  }
};
