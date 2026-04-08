import { api } from "../lib/api";

type RawEmployee = {
  id: number;
  name: string;
  email: string;
  cargo?: string;
  turno?: string;
  role?: string;
  shift?: string;
};

export interface Employee {
  id: number;
  name: string;
  email: string;
  cargo: string;
  turno: string;
}

export interface CreateEmployeePayload {
  name: string;
  email: string;
  cargo: "ATTENDANT" | "MANAGER" | "KITCHEN";
  turno: string;
  senha: string;
}

function normalizeEmployee(raw: RawEmployee): Employee {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    cargo: raw.cargo ?? raw.role ?? "ATTENDANT",
    turno: raw.turno ?? raw.shift ?? "NÃO INFORMADO",
  };
}

export async function getEmployees(): Promise<Employee[]> {
  const { data } = await api.get<RawEmployee[]>("/employees");
  return data.map(normalizeEmployee);
}

export async function createEmployee(employee: CreateEmployeePayload) {
  const payload = {
    name: employee.name,
    email: employee.email,
    cargo: employee.cargo,
    turno: employee.turno,
    senha: employee.senha,
  };

  const { data } = await api.post<RawEmployee>("/employees", payload);
  return normalizeEmployee(data);
}
