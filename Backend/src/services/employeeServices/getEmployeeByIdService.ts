import { prisma } from "../../lib/prisma";
import { Employee } from "@prisma/client";

export const getEmployeeByIdService = async (id: number): Promise<Employee> => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new Error("Funcionário não encontrado");
    }

    return employee;
  } catch (error) {
    console.log(error)
    throw error
  }
};
