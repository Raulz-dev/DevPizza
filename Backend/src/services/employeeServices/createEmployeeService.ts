import { Employee } from "@prisma/client";
import { gerarHashDaSenha } from "../../helper/bcrypt";
import { prisma } from "../../lib/prisma";
import { employeeCargo } from "../../types/employee";

type CreateEmployeeData = {
  name: string;
  email: string;
  senha: string;
  cargo: employeeCargo;
  turno: string;
};

export const createEmployeeService = async (
  data: CreateEmployeeData
): Promise<Employee> => {
  try {
    const { name, email, senha, cargo, turno } = data;

    if (!name || !email || !senha || !cargo || !turno) {
      throw new Error("Nome, email, senha, cargo e turno são obrigatórios");
    }

    const emailExist = await prisma.employee.findUnique({
      where: { email },
    });

    if (emailExist) {
      throw new Error("Email já cadastrado");
    }

    const senhaHash = await gerarHashDaSenha(senha);

    const employee = await prisma.employee.create({
      data: {
        name: name,
        email: email,
        passwordHash: senhaHash,
        role: cargo as any,
        shift: turno,
      },
    });

    return employee;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
