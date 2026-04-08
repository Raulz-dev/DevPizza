import { useMemo, useState } from "react";
import type { Mesa, MesaFilter, MesaForm } from "../types/mesas";

const INITIAL_MESAS: Mesa[] = [
  { id: 1, valor: 128.9, garcom: "Ana", status: "Ocupada", pedidos: 5, lugares: 4, setor: "Salão", tempoMin: 46 },
  { id: 2, valor: 0, garcom: null, status: "Reservada", pedidos: 0, lugares: 2, setor: "Varanda", tempoMin: 0 },
  { id: 3, valor: 72.5, garcom: "Bruno", status: "Ocupada", pedidos: 3, lugares: 4, setor: "Salão", tempoMin: 29 },
  { id: 4, valor: 0, garcom: null, status: "Reservada", pedidos: 0, lugares: 2, setor: "Varanda", tempoMin: 0 },
  { id: 5, valor: 0, garcom: null, status: "Livre", pedidos: 0, lugares: 6, setor: "Salão", tempoMin: 0 },
  { id: 6, valor: 210, garcom: "Clara", status: "Ocupada", pedidos: 7, lugares: 8, setor: "Salão", tempoMin: 61 },
];

const filters: { key: MesaFilter; label: string }[] = [
  { key: "TODAS", label: "Todas" },
  { key: "OCUPADAS", label: "Ocupadas" },
  { key: "LIVRES", label: "Livres" },
  { key: "RESERVADAS", label: "Reservadas" },
];

const initialForm: MesaForm = {
  id: "",
  lugares: "4",
  setor: "Salão",
  status: "Livre",
  garcom: "",
};

function statusClass(status: Mesa["status"]) {
  if (status === "Livre") return "status-badge status-ok";
  if (status === "Reservada") return "status-badge status-warning";
  return "status-badge status-danger";
}

function cardClass(status: Mesa["status"]) {
  if (status === "Livre") return "table-card table-card-livre";
  if (status === "Reservada") return "table-card table-card-reservada";
  return "table-card table-card-ocupada";
}

export default function Mesas() {
  const [mesas, setMesas] = useState<Mesa[]>(INITIAL_MESAS);
  const [filter, setFilter] = useState<MesaFilter>("TODAS");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<MesaForm>(initialForm);
  const [formError, setFormError] = useState("");

  const totalAberto = mesas.reduce((total, mesa) => total + mesa.valor, 0);
  const ocupadas = mesas.filter((mesa) => mesa.status === "Ocupada").length;
  const reservadas = mesas.filter((mesa) => mesa.status === "Reservada").length;
  const livres = mesas.filter((mesa) => mesa.status === "Livre").length;
  const ocupacaoPercent = mesas.length === 0 ? 0 : Math.round((ocupadas / mesas.length) * 100);
  const ticketMedio = ocupadas === 0 ? 0 : totalAberto / ocupadas;

  const topMesas = useMemo(
    () =>
      [...mesas]
        .filter((mesa) => mesa.pedidos > 0)
        .sort((a, b) => b.pedidos - a.pedidos)
        .slice(0, 3),
    [mesas],
  );

  const visibleMesas = useMemo(() => {
    if (filter === "TODAS") return mesas;
    if (filter === "OCUPADAS") return mesas.filter((mesa) => mesa.status === "Ocupada");
    if (filter === "LIVRES") return mesas.filter((mesa) => mesa.status === "Livre");
    return mesas.filter((mesa) => mesa.status === "Reservada");
  }, [filter, mesas]);

  const openModal = () => {
    const nextMesaId =
      mesas.length === 0 ? 1 : Math.max(...mesas.map((mesa) => mesa.id)) + 1;

    setForm({
      ...initialForm,
      id: String(nextMesaId),
    });
    setFormError("");
    setShowModal(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCreateMesa = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const mesaId = Number(form.id);
    const lugares = Number(form.lugares);

    if (!Number.isInteger(mesaId) || mesaId <= 0) {
      setFormError("Informe um número de mesa válido.");
      return;
    }

    if (mesas.some((mesa) => mesa.id === mesaId)) {
      setFormError("Já existe uma mesa com esse número.");
      return;
    }

    if (!Number.isInteger(lugares) || lugares < 1 || lugares > 20) {
      setFormError("Quantidade de lugares deve ficar entre 1 e 20.");
      return;
    }

    if (form.status === "Ocupada" && form.garcom.trim().length === 0) {
      setFormError("Mesa ocupada deve ter um garçom atribuído.");
      return;
    }

    const novaMesa: Mesa = {
      id: mesaId,
      valor: 0,
      garcom: form.status === "Ocupada" ? form.garcom.trim() : null,
      status: form.status,
      pedidos: 0,
      lugares,
      setor: form.setor,
      tempoMin: 0,
    };

    setMesas((current) => [...current, novaMesa].sort((a, b) => a.id - b.id));
    setShowModal(false);
    setForm(initialForm);
    setFormError("");
  };

  return (
    <section className="page-stack">
      <header className="page-title-row">
        <div>
          <p className="page-eyebrow">Operação</p>
          <h2 className="page-title">Mapa de Mesas</h2>
          <p className="page-subtitle">Visão geral das mesas, consumo atual, reservas e ritmo do salão.</p>
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
        <article className="metric-card">
          <p>Ticket médio</p>
          <strong>R$ {ticketMedio.toFixed(2)}</strong>
        </article>
      </div>

      <section className="mesa-live-strip">
        <div>
          <p className="mesa-live-label">Pulso do salão</p>
          <h3>{ocupacaoPercent}% de ocupação no turno</h3>
          <p>
            {ocupadas} ocupadas • {reservadas} reservadas • {livres} livres
          </p>
        </div>
        <div className="mesa-live-list">
          {topMesas.length > 0 ? (
            topMesas.map((mesa) => (
              <article key={mesa.id} className="mesa-live-item">
                <span>Mesa {mesa.id}</span>
                <strong>{mesa.pedidos} pedidos</strong>
              </article>
            ))
          ) : (
            <article className="mesa-live-item">
              <span>Sem movimento</span>
              <strong>Sem pedidos no momento</strong>
            </article>
          )}
        </div>
      </section>

      <section className="mesa-toolbar">
        <div className="mesa-filter-list">
          {filters.map((option) => (
            <button
              key={option.key}
              type="button"
              className={`mesa-filter-chip ${filter === option.key ? "is-active" : ""}`}
              onClick={() => setFilter(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button type="button" className="primary-btn mesa-add-btn" onClick={openModal}>
          + Adicionar mesa
        </button>
      </section>

      <div className="table-grid">
        {visibleMesas.map((mesa) => {
          const actionLabel = mesa.status === "Livre" ? "Ver comando" : mesa.status === "Reservada" ? "Confirmar chegada" : "Ver comanda";

          return (
            <article key={mesa.id} className={cardClass(mesa.status)}>
              <div className="table-card-head">
                <h3>Mesa {mesa.id}</h3>
                <span className={statusClass(mesa.status)}>{mesa.status}</span>
              </div>

              <p className="table-subhead">
                {mesa.setor} • {mesa.lugares} lugares
              </p>

              <p className="table-meta">
                Garçom: <strong>{mesa.garcom ?? "Não atribuído"}</strong>
              </p>

              {mesa.status === "Ocupada" ? (
                <p className="table-meta">
                  Tempo de mesa: <strong>{mesa.tempoMin} min</strong>
                </p>
              ) : null}

              <div className="table-card-footer">
                <span>R$ {mesa.valor.toFixed(2)}</span>
                <button type="button" className="mesa-action-btn">
                  {actionLabel}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {showModal ? (
        <div className="modal-overlay" role="presentation" onClick={() => setShowModal(false)}>
          <div
            className="modal-card mesa-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mesa-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-head">
              <h3 id="mesa-modal-title">Adicionar mesa</h3>
              <button type="button" className="modal-close" onClick={() => setShowModal(false)}>
                Fechar
              </button>
            </div>

            <p className="mesa-modal-subtitle">Cadastre uma nova mesa para o mapa do salão.</p>

            <form onSubmit={handleCreateMesa} className="mesa-modal-form">
              <div className="mesa-modal-grid">
                <label className="mesa-modal-label">
                  Número da mesa
                  <input
                    name="id"
                    type="number"
                    min={1}
                    className="mesa-modal-input"
                    value={form.id}
                    onChange={handleInputChange}
                    placeholder="Ex.: 10"
                  />
                </label>

                <label className="mesa-modal-label">
                  Lugares
                  <input
                    name="lugares"
                    type="number"
                    min={1}
                    max={20}
                    className="mesa-modal-input"
                    value={form.lugares}
                    onChange={handleInputChange}
                  />
                </label>

                <label className="mesa-modal-label">
                  Setor
                  <select name="setor" className="mesa-modal-input" value={form.setor} onChange={handleInputChange}>
                    <option value="Salão">Salão</option>
                    <option value="Varanda">Varanda</option>
                  </select>
                </label>

                <label className="mesa-modal-label">
                  Status inicial
                  <select name="status" className="mesa-modal-input" value={form.status} onChange={handleInputChange}>
                    <option value="Livre">Livre</option>
                    <option value="Ocupada">Ocupada</option>
                    <option value="Reservada">Reservada</option>
                  </select>
                </label>

                <label className="mesa-modal-label mesa-modal-full">
                  Garçom responsável {form.status === "Ocupada" ? "(obrigatório)" : "(opcional)"}
                  <input
                    name="garcom"
                    className="mesa-modal-input"
                    value={form.garcom}
                    onChange={handleInputChange}
                    placeholder="Ex.: Ana"
                  />
                </label>
              </div>

              {formError ? <p className="error-state">{formError}</p> : null}

              <div className="mesa-modal-actions">
                <button type="button" className="secondary-btn" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="primary-btn">
                  Salvar mesa
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
