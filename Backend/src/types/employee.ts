export type employeeCargo = "MANAGER" | "ATTENDANT" | "KITCHEN";


export type UpdateEmployeeData = {
  name?: string;
  email?: string;
  senha?: string;
  cargo?: string;
  turno?: string;
};

export type CreateEmployeeData = {
  name: string;
  email: string;
  senha: string;
  cargo: employeeCargo;
  turno: string;
};