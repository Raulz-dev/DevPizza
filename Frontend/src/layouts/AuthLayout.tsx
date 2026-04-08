import { Bike, Clock3, Flame, Pizza } from "lucide-react";
import { Outlet } from "react-router-dom";

const highlights = [
  {
    icon: Pizza,
    title: "Receitas e comandas",
    description: "Controle do salão, cardápio e pedidos em um único painel.",
  },
  {
    icon: Flame,
    title: "Ritmo de cozinha",
    description: "Acompanhe a operação do forno sem perder o timing do atendimento.",
  },
  {
    icon: Clock3,
    title: "Agilidade no salão",
    description: "Visão rápida para equipe de atendimento, caixa e gestão.",
  },
];

const menuHighlights = ["Organize pagamentos", "Gerencie funcionários", "Entrega e balcão integrados", "Dashboard em tempo real"];

export function AuthLayout() {
  return (
    <div className="auth-shell">
      <div className="auth-surface">
        <section className="auth-hero">
          <div className="auth-hero-layer" />

          <div className="auth-hero-content">
            <span className="auth-pill">DevPizza</span>
            <h1>Sua pizzaria com cara de casa cheia e operação de alto nível.</h1>
            <p className="auth-hero-text">Organize salão, equipe e pedidos com um painel pensado para o ritmo real de uma pizzaria.</p>

            <div className="auth-highlight-grid">
              {highlights.map((item) => (
                <article key={item.title} className="auth-highlight-card">
                  <div className="auth-highlight-icon">
                    <item.icon size={18} />
                  </div>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>

            <div className="auth-menu-preview">
              <div className="auth-menu-head">
                <Bike size={18} />
                <span>Gerencie sua pizzaria</span>
              </div>
              <ul>
                {menuHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="auth-panel">
          <div className="auth-panel-inner">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
}
