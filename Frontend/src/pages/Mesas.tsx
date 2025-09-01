import { useMemo } from "react";

type Mesa = {
  id: number;
  valor: number;
  garcom: string | null;
  status: "Ocupada" | "Livre" | "Finalizando";
  reserva: boolean;
  pedidos: number;
};

const cardStyle: React.CSSProperties = {
  background: "white",
  borderRadius: 20,
  padding: 20,
  boxShadow: "0 2px 10px rgba(0,0,0,.06)",
  minHeight: 160, // altura maior
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  border: "1px solid #e0e0e0",
};

const badge = (text: string, color: string) => (
  <span
    style={{
      background: color,
      color: "white",
      padding: "4px 8px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 700,
    }}
  >
    {text}
  </span>
);

export default function Mesas() {
  const mesas: Mesa[] = useMemo(
    () => [
      {
        id: 1,
        valor: 128.9,
        garcom: "Ana",
        status: "Ocupada",
        reserva: false,
        pedidos: 5,
      },
      {
        id: 2,
        valor: 0,
        garcom: null,
        status: "Livre",
        reserva: true,
        pedidos: 0,
      },
      {
        id: 3,
        valor: 72.5,
        garcom: "Bruno",
        status: "Ocupada",
        reserva: false,
        pedidos: 3,
      },
      {
        id: 4,
        valor: 18.0,
        garcom: "Ana",
        status: "Finalizando",
        reserva: false,
        pedidos: 1,
      },
      {
        id: 5,
        valor: 0,
        garcom: null,
        status: "Livre",
        reserva: false,
        pedidos: 0,
      },
      {
        id: 6,
        valor: 210.0,
        garcom: "Clara",
        status: "Ocupada",
        reserva: true,
        pedidos: 7,
      },
    ],
    []
  );

  return (
    <main
      style={{
        padding: 20,
        background: "#fafafa",
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <h1 style={{ margin: "8px 0 20px", color: "#c71f28" }}>Mesas</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 24, // mais espaço entre os cards
        }}
      >
        {mesas.map((m) => (
          <div key={m.id} style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: 800, fontSize: 18 }}>Mesa {m.id}</div>
              {badge(m.status, m.status === "Ocupada" ? "#c71f28" : "#4caf50")}
            </div>

            <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.6 }}>
              <div>Garçom: {m.garcom ?? "—"}</div>
              <div style={{ marginTop: 6 }}>Pedidos: {m.pedidos}</div>
              {m.reserva && (
                <div style={{ marginTop: 6 }}>
                  {badge("Reservada", "#ff9800")}
                </div>
              )}
            </div>

            <div style={{ marginTop: 16, fontWeight: 700, fontSize: 15 }}>
              💰 R$ {m.valor.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
