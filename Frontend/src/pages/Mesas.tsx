type Mesa = {
  id: number;
  valor: number;
  garcom: string | null;
  status: "Ocupada" | "Livre" | "Finalizando";
  reserva: boolean;
  pedidos: number;
};

const mesas: Mesa[] = [
  { id: 1, valor: 128.9, garcom: "Ana", status: "Ocupada", reserva: false, pedidos: 5 },
  { id: 2, valor: 0, garcom: null, status: "Livre", reserva: true, pedidos: 0 },
  { id: 3, valor: 72.5, garcom: "Bruno", status: "Ocupada", reserva: false, pedidos: 3 },
  { id: 4, valor: 18, garcom: "Ana", status: "Finalizando", reserva: false, pedidos: 1 },
  { id: 5, valor: 0, garcom: null, status: "Livre", reserva: false, pedidos: 0 },
  { id: 6, valor: 210, garcom: "Clara", status: "Ocupada", reserva: true, pedidos: 7 },
];

function statusClass(status: Mesa["status"]) {
  if (status === "Livre") return "status-badge status-ok";
  if (status === "Finalizando") return "status-badge status-warning";
  return "status-badge status-danger";
}

export default function Mesas() {
  const totalAberto = mesas.reduce((total, mesa) => total + mesa.valor, 0);
  const ocupadas = mesas.filter((mesa) => mesa.status === "Ocupada").length;
  const reservadas = mesas.filter((mesa) => mesa.reserva).length;

  return (
    <section className="page-stack">
      <header className="page-title-row">
        <div>
          <p className="page-eyebrow">Operação</p>
          <h2 className="page-title">Mapa de Mesas</h2>
          <p className="page-subtitle">Visão geral das mesas, consumo atual e reservas do salão.</p>
        </div>
      </header>

      <div className="metric-grid">
        <article className="metric-card">
          <p>Total aberto</p>
          <strong>R$ {totalAberto.toFixed(2)}</strong>
        </article>
        <article className="metric-card">
          <p>Mesas ocupadas</p>
          <strong>{ocupadas}</strong>
        </article>
        <article className="metric-card">
          <p>Mesas reservadas</p>
          <strong>{reservadas}</strong>
        </article>
      </div>

      <div className="table-grid">
        {mesas.map((mesa) => (
          <article key={mesa.id} className="table-card">
            <div className="table-card-head">
              <h3>Mesa {mesa.id}</h3>
              <span className={statusClass(mesa.status)}>{mesa.status}</span>
            </div>

            <p className="table-meta">
              Garçom: <strong>{mesa.garcom ?? "Não atribuído"}</strong>
            </p>
            <p className="table-meta">
              Pedidos em aberto: <strong>{mesa.pedidos}</strong>
            </p>

            {mesa.reserva ? <span className="table-reserve-pill">Reserva ativa</span> : null}

            <div className="table-card-footer">
              <span>R$ {mesa.valor.toFixed(2)}</span>
              <button type="button">Abrir comanda</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
