import { NavLink } from "react-router-dom";

const linkBase: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 600,
  marginRight: 8,
  color: "white",
  transition: "color 0.2s",
  cursor: "pointer",
};

export default function TopBar() {
  return (
    <header
      style={{
        position: "sticky",
        top: 10, // um espacinho do topo pra destacar o arredondado
        zIndex: 20,
        background: "#c71f28",
        color: "white",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        boxShadow: "0 2px 10px rgba(0,0,0,.12)",
        border: "2px solid black",
        borderRadius: 20, // <<< cantos arredondados
        margin: "0 10px", // espaçamento lateral pra não grudar
      }}
    >
      <div
        style={{
          fontWeight: 800,
          letterSpacing: 0.5,
        }}
      >
        🍕 Pizzaria
      </div>

      <nav style={{ display: "flex", gap: 8 }}>
        <NavLink
          to="/mesas"
          style={({ isActive }) => ({
            ...linkBase,
            color: isActive ? "black" : "white",
          })}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.color = "black";
          }}
          onMouseLeave={(e) => {
            if (!(e.target as HTMLElement).classList.contains("active")) {
              (e.target as HTMLElement).style.color = "white";
            }
          }}
        >
          Mesas
        </NavLink>

        <NavLink
          to="/funcionarios"
          style={({ isActive }) => ({
            ...linkBase,
            color: isActive ? "black" : "white",
          })}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.color = "black";
          }}
          onMouseLeave={(e) => {
            if (!(e.target as HTMLElement).classList.contains("active")) {
              (e.target as HTMLElement).style.color = "white";
            }
          }}
        >
          Funcionários
        </NavLink>

        <NavLink
          to="/cardapio"
          style={({ isActive }) => ({
            ...linkBase,
            color: isActive ? "black" : "white",
          })}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.color = "black";
          }}
          onMouseLeave={(e) => {
            if (!(e.target as HTMLElement).classList.contains("active")) {
              (e.target as HTMLElement).style.color = "white";
            }
          }}
        >
          Cardápio
        </NavLink>

        <NavLink
          to="/pagamento"
          style={({ isActive }) => ({
            ...linkBase,
            color: isActive ? "black" : "white",
          })}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.color = "black";
          }}
          onMouseLeave={(e) => {
            if (!(e.target as HTMLElement).classList.contains("active")) {
              (e.target as HTMLElement).style.color = "white";
            }
          }}
        >
          Pagamento
        </NavLink>
      </nav>
    </header>
  );
}
