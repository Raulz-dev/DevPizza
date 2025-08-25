import { Employee } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { gerarHashDaSenha } from "../../helper/bcrypt";
import { UpdateEmployeeData } from "../../types/employee";



export const updateEmployeeService = async (
  id: number,
  data: UpdateEmployeeData
): Promise<Employee> => {
  try {
    const employee = await prisma.employee.findUnique({ where: { id } });

    if (!employee) {
      throw new Error("Funcionário não encontrado");
    }

    const updateData: any = {
      name: data.name,
      email: data.email,
      shift: data.turno,
      role: data.cargo as any,
    };

    if (data.senha) {
      updateData.passwordHash = await gerarHashDaSenha(data.senha);
    }

    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: updateData,
    });

    return updatedEmployee;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
