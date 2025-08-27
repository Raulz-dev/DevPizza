export interface JwtUser {
  id: number;
  email: string;
  role: string;
}

export type RegisterData = {
  name: string;
  email: string;
  senha: string;
  cargo: string;
  turno: string;
};
