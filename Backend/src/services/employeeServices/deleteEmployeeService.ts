import { prisma } from "../../lib/prisma";

export const deleteEmployeeService = async (id: number) => {
  try {
    const employee = await prisma.employee.findUnique({ where: { id } });

    if (!employee) {
      throw new Error("Funcionário não encontrado");
    }

    await prisma.employee.delete({ where: { id } });

    return { message: "Funcionário deletado com sucesso" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
