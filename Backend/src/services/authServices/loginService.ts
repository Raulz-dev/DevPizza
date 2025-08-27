import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";

export const loginService = async (
  email: string,
  senha: string
): Promise<string> => {
  try {
    const employee = await prisma.employee.findUnique({ where: { email } });
    if (!employee) throw new Error("Credenciais inválidas");

    const ok = await bcrypt.compare(senha, employee.passwordHash);
    if (!ok) throw new Error("Credenciais inválidas");

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET não definido");

    const envExp = process.env.JWT_EXPIRES_IN ?? "20h";
    const expiresIn = /^\d+$/.test(envExp)
      ? Number(envExp)
      : /h$/.test(envExp)
      ? Number(envExp.slice(0, -1)) * 3600
      : /m$/.test(envExp)
      ? Number(envExp.slice(0, -1)) * 60
      : /s$/.test(envExp)
      ? Number(envExp.slice(0, -1))
      : 3600;

    return jwt.sign(
      { id: employee.id, email: employee.email, role: employee.role },
      secret,
      { expiresIn }
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};
