import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Home, Users, Pizza, CreditCard, CalendarDays, LogOut } from "lucide-react";

const linkBase: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "14px 15px",
  borderRadius: 12,
  textDecoration: "none",
  fontWeight: 600,
  color: "white",
  transition: "all 0.2s ease",
  cursor: "pointer",
};

export default function SideBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const menuItems = [
    { to: "/mesas", label: "Mesas", icon: <Home size={18} /> },
    { to: "/funcionarios", label: "Funcionários", icon: <Users size={18} /> },
    { to: "/cardapio", label: "Cardápio", icon: <Pizza size={18} /> },
    { to: "/reserva", label: "Reservas", icon: <CalendarDays size={18} /> },
    { to: "/pagamento", label: "Vendas", icon: <CreditCard size={18} /> },
  ];

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: 240,
        background: "#c71f28",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "20px 16px",
        borderRight: "2px solid black",
        boxShadow: "3px 0 10px rgba(0,0,0,0.15)",
        borderRadius: "0 20px 20px 0",
        zIndex: 100,
      }}
    >
      <div
        style={{
          fontWeight: 800,
          fontSize: "1.3rem",
          letterSpacing: 0.5,
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        🍕 Pizzaria
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, overflowY: "auto" }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              ...linkBase,
              background: isActive ? "white" : "transparent",
              color: isActive ? "#c71f28" : "white",
            })}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "white";
              (e.currentTarget as HTMLElement).style.color = "#c71f28";
            }}
            onMouseLeave={(e) => {
              if (!(e.currentTarget as HTMLElement).classList.contains("active")) {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "white";
              }
            }}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div
        style={{
          position: "absolute",
          bottom: 45,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          paddingTop: 10,
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            border: "none",
            outline: "none",
            borderRadius: 12,
            padding: "10px 16px",
            background: "black",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s ease",
            width: "85%",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "white";
            (e.currentTarget as HTMLButtonElement).style.color = "#c71f28";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#dc143c";
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          }}
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  );
}
