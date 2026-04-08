import { CalendarDays, LayoutGrid, ReceiptText, Users, UtensilsCrossed } from "lucide-react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { PortalLayout } from "../layouts/PortalLayout";
import Cardapio from "../pages/Cardapio";
import Funcionarios from "../pages/Funcionarios";
import Login from "../pages/Login";
import Mesas from "../pages/Mesas";
import Pagamento from "../pages/Pagamento";
import Register from "../pages/Register";
import Reserva from "../pages/Reservas";
import { ProtectedRoute, PublicRoute, RootRedirect } from "./guards";

const portalItems = [
  { to: "/mesas", label: "Mesas", icon: LayoutGrid },
  { to: "/funcionarios", label: "Funcionários", icon: Users },
  { to: "/cardapio", label: "Cardápio", icon: UtensilsCrossed },
  { to: "/reserva", label: "Reservas", icon: CalendarDays },
  { to: "/pagamento", label: "Pagamentos", icon: ReceiptText },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <PortalLayout items={portalItems} helperText="Operação da Pizzaria" />,
        children: [
          { path: "/mesas", element: <Mesas /> },
          { path: "/funcionarios", element: <Funcionarios /> },
          { path: "/cardapio", element: <Cardapio /> },
          { path: "/reserva", element: <Reserva /> },
          { path: "/pagamento", element: <Pagamento /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
