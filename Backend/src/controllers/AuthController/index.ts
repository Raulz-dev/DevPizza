import { Request, Response } from "express";
import { loginService } from "../../services/authServices/loginService";
import { registerService } from "../../services/authServices/registerService";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const token = await loginService(email, senha);
    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, senha, cargo, turno } = req.body;
    const novoUsuario = await registerService({ name, email, senha, cargo, turno });
    return res.status(201).json({ novoUsuario });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
