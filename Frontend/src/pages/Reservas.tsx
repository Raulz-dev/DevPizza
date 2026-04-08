export default function Reserva() {
  const reservas = [
    { mesa: 2, cliente: "Carlos Mendes", horario: "19:30", pessoas: 4, status: "Confirmada" },
    { mesa: 6, cliente: "Fernanda Lima", horario: "20:15", pessoas: 2, status: "Aguardando" },
    { mesa: 8, cliente: "Juliana Alves", horario: "21:00", pessoas: 6, status: "Confirmada" },
  ];

  return (
    <section className="page-stack">
      <header className="page-title-row">
        <div>
          <p className="page-eyebrow">Atendimento</p>
          <h2 className="page-title">Reservas</h2>
          <p className="page-subtitle">Acompanhe horários de pico e confirmações de mesa.</p>
        </div>
      </header>

      <section className="section-card">
        <div className="reservation-list">
          {reservas.map((reserva) => (
            <article key={`${reserva.mesa}-${reserva.horario}`} className="reservation-item">
              <div>
                <p className="reservation-title">Mesa {reserva.mesa}</p>
                <p className="reservation-meta">
                  {reserva.cliente} • {reserva.pessoas} pessoas
                </p>
              </div>
              <div className="reservation-right">
                <span>{reserva.horario}</span>
                <span
                  className={`status-badge ${
                    reserva.status === "Confirmada" ? "status-ok" : "status-warning"
                  }`}
                >
                  {reserva.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
