import { Flame, Pizza, ShieldCheck } from "lucide-react";
import { Outlet } from "react-router-dom";

const highlights = [
  {
    icon: Pizza,
    title: "Operação centralizada",
    description: "Mesas, cardápio, pagamentos e equipe no mesmo painel.",
  },
  {
    icon: ShieldCheck,
    title: "Acesso seguro",
    description: "Rotas privadas com autenticação e controle por sessão.",
  },
  {
    icon: Flame,
    title: "Fluxo rápido",
    description: "Interface enxuta para o dia a dia do salão.",
  },
];

export function AuthLayout() {
  return (
    <div className="auth-shell">
      <div className="auth-surface">
        <section className="auth-hero">
          <div className="auth-hero-layer" />

          <div className="auth-hero-content">
            <span className="auth-pill">DevPizza</span>
            <h1>Gestão da pizzaria com clareza, ritmo e controle.</h1>

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
