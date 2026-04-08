import type { LucideIcon } from "lucide-react";
import { LogOut, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export interface NavigationItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

interface AppSidebarProps {
  items: NavigationItem[];
  mobileOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  helperText: string;
}

export function AppSidebar({
  items,
  mobileOpen,
  onClose,
  onLogout,
  helperText,
}: AppSidebarProps) {
  return (
    <>
      {mobileOpen ? <div className="sidebar-overlay" onClick={onClose} /> : null}

      <aside className={`app-sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <div className="brand-mark">DP</div>
            <div>
              <p className="brand-title">DevPizza</p>
              <p className="brand-subtitle">Painel Operacional</p>
            </div>
          </div>

          <button type="button" className="sidebar-close" onClick={onClose} aria-label="Fechar menu">
            <X size={18} />
          </button>
        </div>

        <div className="sidebar-helper">
          <span className="sidebar-helper-label">Workspace</span>
          <p className="sidebar-helper-title">{helperText}</p>
        </div>

        <nav className="sidebar-nav">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button type="button" className="sidebar-logout" onClick={onLogout}>
          <LogOut size={17} />
          <span>Sair</span>
        </button>
      </aside>
    </>
  );
}
