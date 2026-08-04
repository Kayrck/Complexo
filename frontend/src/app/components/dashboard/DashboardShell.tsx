import { ReactNode } from "react";
import { Link } from "react-router";
import { LogOut, Menu, X, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { BoltMark } from "../BoltMark";

export interface DashboardNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface DashboardShellProps {
  eyebrow: string;
  navItems: DashboardNavItem[];
  bottomNavItems?: DashboardNavItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  userName: string;
  userSubtitle: string;
  userInitials: string;
  pageTitle: string;
  headerActions?: ReactNode;
  children: ReactNode;
}

/**
 * Shared shell for the Área do Aluno and Área Administrativa prototypes —
 * sidebar + header chrome, so both areas read as one consistent product
 * instead of two differently-styled dashboards bolted together.
 */
export const DashboardShell = ({
  eyebrow,
  navItems,
  bottomNavItems = [],
  activeTab,
  onTabChange,
  userName,
  userSubtitle,
  userInitials,
  pageTitle,
  headerActions,
  children,
}: DashboardShellProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const allItems = [...navItems, ...bottomNavItems];

  return (
    <div className="min-h-screen bg-complexo-dark text-sm text-complexo-light">
      {/* Sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-complexo-light/10 bg-complexo-panel md:flex">
        <div className="flex h-16 items-center gap-2.5 border-b border-complexo-light/10 px-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-complexo-red">
            <BoltMark className="h-4 w-4 text-white" />
          </span>
          <div>
            <p className="font-rajdhani text-lg font-bold uppercase leading-none tracking-wide">Complexo</p>
            <p className="text-[10px] uppercase tracking-widest text-complexo-muted">{eyebrow}</p>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3 rounded-xl border border-complexo-light/10 bg-complexo-light/5 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-complexo-red/15 text-sm font-bold text-complexo-red">
              {userInitials}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-semibold text-complexo-light">{userName}</p>
              <p className="truncate text-xs text-complexo-muted">{userSubtitle}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          {navItems.map((item) => (
            <SidebarLink key={item.id} item={item} active={activeTab === item.id} onClick={() => onTabChange(item.id)} />
          ))}
        </nav>

        <div className="space-y-1 border-t border-complexo-light/10 p-4">
          {bottomNavItems.map((item) => (
            <SidebarLink key={item.id} item={item} active={activeTab === item.id} onClick={() => onTabChange(item.id)} />
          ))}
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-complexo-muted hover:bg-complexo-light/5 hover:text-complexo-light"
          >
            <LogOut className="h-4 w-4" /> Sair
          </Link>
        </div>
      </aside>

      {/* Content column */}
      <div className="md:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-complexo-light/10 bg-complexo-panel/90 px-5 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen((v) => !v)}
              className="rounded-lg p-2 text-complexo-light hover:bg-complexo-light/5 md:hidden"
              aria-label="Menu"
            >
              {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <h1 className="font-rajdhani text-lg font-bold uppercase tracking-wide text-complexo-light">
              {pageTitle}
            </h1>
          </div>
          {headerActions && <div className="flex items-center gap-3">{headerActions}</div>}
        </header>

        {/* Mobile nav drawer */}
        {mobileNavOpen && (
          <nav className="space-y-1 border-b border-complexo-light/10 bg-complexo-panel p-4 md:hidden">
            {allItems.map((item) => (
              <SidebarLink
                key={item.id}
                item={item}
                active={activeTab === item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileNavOpen(false);
                }}
              />
            ))}
            <Link
              to="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-complexo-muted hover:bg-complexo-light/5 hover:text-complexo-light"
            >
              <LogOut className="h-4 w-4" /> Sair
            </Link>
          </nav>
        )}

        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
};

const SidebarLink = ({
  item,
  active,
  onClick,
}: {
  item: DashboardNavItem;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left font-medium transition-colors ${
      active ? "bg-complexo-red/10 text-complexo-red" : "text-complexo-muted hover:bg-complexo-light/5 hover:text-complexo-light"
    }`}
  >
    <item.icon className="h-4 w-4 shrink-0" />
    {item.label}
  </button>
);
