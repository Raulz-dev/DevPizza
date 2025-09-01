import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar";
import Mesas from "./pages/Mesas";
import Funcionarios from "./pages/Funcionarios";
import Cardapio from "./pages/Cardapio";
import Pagamento from "./pages/Pagamento";

export default function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Navigate to="/mesas" replace />} />
        <Route path="/mesas" element={<Mesas />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route
          path="*"
          element={<h2 style={{ padding: 24 }}>Página não encontrada</h2>}
        />
      </Routes>
    </BrowserRouter>
  );
}
