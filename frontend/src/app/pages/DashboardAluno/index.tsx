import { useState } from "react";
import {
  LayoutDashboard,
  Dumbbell,
  TrendingUp,
  CalendarDays,
  Wallet,
  Salad,
  User,
} from "lucide-react";
import { DashboardShell, type DashboardNavItem } from "../../components/dashboard/DashboardShell";
import { DashboardTab } from "./tabs/DashboardTab";
import { TreinoTab } from "./tabs/TreinoTab";
import { EvolucaoTab } from "./tabs/EvolucaoTab";
import { AgendaTab } from "./tabs/AgendaTab";
import { FinanceiroTab } from "./tabs/FinanceiroTab";
import { NutricaoTab } from "./tabs/NutricaoTab";
import { PerfilTab } from "./tabs/PerfilTab";

const NAV_ITEMS: DashboardNavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "treino", label: "Ficha de Treino", icon: Dumbbell },
  { id: "evolucao", label: "Evolução Física", icon: TrendingUp },
  { id: "agenda", label: "Agenda", icon: CalendarDays },
  { id: "financeiro", label: "Financeiro", icon: Wallet },
  { id: "nutricao", label: "Nutrição", icon: Salad },
];

const BOTTOM_NAV_ITEMS: DashboardNavItem[] = [{ id: "perfil", label: "Perfil", icon: User }];

const TAB_COMPONENTS: Record<string, () => React.ReactElement> = {
  dashboard: DashboardTab,
  treino: TreinoTab,
  evolucao: EvolucaoTab,
  agenda: AgendaTab,
  financeiro: FinanceiroTab,
  nutricao: NutricaoTab,
  perfil: PerfilTab,
};

const ALL_ITEMS = [...NAV_ITEMS, ...BOTTOM_NAV_ITEMS];

export const DashboardAluno = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const ActiveTab = TAB_COMPONENTS[activeTab] ?? DashboardTab;
  const pageTitle = ALL_ITEMS.find((i) => i.id === activeTab)?.label ?? "Dashboard";

  return (
    <DashboardShell
      eyebrow="Área do Aluno"
      navItems={NAV_ITEMS}
      bottomNavItems={BOTTOM_NAV_ITEMS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userName="Rafael Lima"
      userSubtitle="Plano Performance"
      userInitials="RL"
      pageTitle={pageTitle}
    >
      <ActiveTab />
    </DashboardShell>
  );
};
