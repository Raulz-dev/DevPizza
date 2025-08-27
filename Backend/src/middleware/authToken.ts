import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtUser } from "../types/auth";


declare module "express-serve-static-core" {
  interface Request {
    user?: JwtUser;
  }
}

function getTokenFromHeader(req: Request): string | null {
  const auth = req.headers.authorization;
  if (!auth) return null;
  const [scheme, token] = auth.split(" ");
  if (scheme !== "Bearer" || !token) return null;
  return token;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET não definido");

    const token = getTokenFromHeader(req);
    console.log(token);
    if (!token) return res.status(401).json({ error: "Token não fornecido" });

    const decoded = jwt.verify(token, secret);
    if (
      typeof decoded !== "object" ||
      !("id" in decoded) ||
      !("email" in decoded) ||
      !("role" in decoded)
    ) {
      return res.status(401).json({ error: "Token inválido" });
    }

    req.user = {
      id: (decoded as any).id,
      email: (decoded as any).email,
      role: (decoded as any).role,
    };

    return next();
  } catch (err: any) {
    if (err?.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expirado" });
    }
    if (err?.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token inválido" });
    }
    return res.status(500).json({ error: "Erro de autenticação" });
  }
}

export function requireRole(...rolesPermitidos: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "Não autenticado" });
    if (!rolesPermitidos.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Sem permissão de acessar essa rota" });
    }
    return next();
  };
}
