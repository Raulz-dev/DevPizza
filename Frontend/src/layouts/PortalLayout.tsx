import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar, type NavigationItem } from "../components/navigation/AppSidebar";
import { useAuth } from "../context/useAuth";

interface PortalLayoutProps {
  items: NavigationItem[];
  helperText: string;
}

export function PortalLayout({ items, helperText }: PortalLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  const currentItem = items.find((item) => location.pathname.startsWith(item.to));

  return (
    <div className="portal-root">
      <AppSidebar
        items={items}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onLogout={logout}
        helperText={helperText}
      />

      <div className="portal-content">
        <header className="portal-header">
          <div className="portal-header-left">
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu size={18} />
            </button>

            <div>
              <p className="portal-header-tag">{currentItem?.label ?? "Painel"}</p>
              <h1 className="portal-header-title">{user?.name ?? "Equipe DevPizza"}</h1>
            </div>
          </div>

          <div className="portal-header-right">
            <span className="header-chip">{user?.email ?? "Operação em andamento"}</span>
            <button type="button" className="header-logout" onClick={logout}>
              Sair
            </button>
          </div>
        </header>

        <main className="portal-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
