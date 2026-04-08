export type MesaStatus = "Ocupada" | "Livre" | "Reservada";

export type MesaSetor = "Salão" | "Varanda";

export type Mesa = {
  id: number;
  valor: number;
  garcom: string | null;
  status: MesaStatus;
  pedidos: number;
  lugares: number;
  setor: MesaSetor;
  tempoMin: number;
};

export type MesaFilter = "TODAS" | "OCUPADAS" | "LIVRES" | "RESERVADAS";

export type MesaForm = {
  id: string;
  lugares: string;
  setor: MesaSetor;
  status: MesaStatus;
  garcom: string;
};
