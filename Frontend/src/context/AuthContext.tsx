import { createContext } from "react";

export type User = {
  id: number | string;
  name: string;
  email: string;
  role: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  senha: string;
  cargo: "ATTENDANT" | "MANAGER" | "KITCHEN";
  turno: string;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
