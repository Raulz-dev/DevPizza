import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { gerarHashDaSenha } from "../../helper/bcrypt";
import { Role } from "@prisma/client";
import { RegisterData } from "../../types/auth";


export const registerService = async (data: RegisterData) => {
  try {
    const { name, email, senha, cargo, turno } = data;

    if (await prisma.employee.findUnique({ where: { email } }))
      throw new Error("Email já cadastrado");

    const senhaHash = await gerarHashDaSenha(senha);

    const novo = await prisma.employee.create({
      data: {
        name,
        email,
        passwordHash: senhaHash,
        role: cargo as Role,
        shift: turno,
      },
    });

    return novo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
