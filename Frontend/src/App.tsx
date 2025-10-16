import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mesas from "./pages/Mesas";
import Funcionarios from "./pages/Funcionarios";
import Cardapio from "./pages/Cardapio";
import Pagamento from "./pages/Pagamento";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import TopBar from "./components/TopBar";
import Reserva from "./pages/Reservas";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route
              element={
                <>
                  <TopBar />
                </>
              }
            >
              <Route path="/" element={<Mesas />} />
              <Route path="/mesas" element={<Mesas />} />
              <Route path="/funcionarios" element={<Funcionarios />} />
              <Route path="/cardapio" element={<Cardapio />} />
              <Route path="/pagamento" element={<Pagamento />} />
              <Route path="/reserva" element={<Reserva />} />
            </Route>
          </Route>

          <Route path="*" element={<h2 style={{ padding: 24 }}>Página não encontrada</h2>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
