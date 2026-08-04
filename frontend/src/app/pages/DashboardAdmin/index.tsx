import { useState } from "react";
import {
  BarChart3,
  Users,
  GraduationCap,
  Salad,
  HeartPulse,
  ShoppingBag,
  Package,
  DollarSign,
  CalendarDays,
  FileBarChart,
  Settings,
} from "lucide-react";
import { DashboardShell, type DashboardNavItem } from "../../components/dashboard/DashboardShell";
import { OverviewTab } from "./tabs/OverviewTab";
import { AlunosTab } from "./tabs/AlunosTab";
import { ProfessoresTab } from "./tabs/ProfessoresTab";
import { NutricionistaTab } from "./tabs/NutricionistaTab";
import { PilatesTab } from "./tabs/PilatesTab";
import { LojaTab } from "./tabs/LojaTab";
import { EstoqueTab } from "./tabs/EstoqueTab";
import { FinanceiroTab } from "./tabs/FinanceiroTab";
import { AgendaTab } from "./tabs/AgendaTab";
import { RelatoriosTab } from "./tabs/RelatoriosTab";
import { ConfiguracoesTab } from "./tabs/ConfiguracoesTab";

const NAV_ITEMS: DashboardNavItem[] = [
  { id: "overview", label: "Visão Geral", icon: BarChart3 },
  { id: "alunos", label: "Alunos", icon: Users },
  { id: "professores", label: "Professores", icon: GraduationCap },
  { id: "nutricionista", label: "Nutricionista", icon: Salad },
  { id: "pilates", label: "Pilates", icon: HeartPulse },
  { id: "loja", label: "Loja", icon: ShoppingBag },
  { id: "estoque", label: "Estoque", icon: Package },
  { id: "financeiro", label: "Financeiro", icon: DollarSign },
  { id: "agenda", label: "Agenda Geral", icon: CalendarDays },
  { id: "relatorios", label: "Relatórios", icon: FileBarChart },
];

const BOTTOM_NAV_ITEMS: DashboardNavItem[] = [{ id: "configuracoes", label: "Configurações", icon: Settings }];

const TAB_COMPONENTS: Record<string, () => React.ReactElement> = {
  overview: OverviewTab,
  alunos: AlunosTab,
  professores: ProfessoresTab,
  nutricionista: NutricionistaTab,
  pilates: PilatesTab,
  loja: LojaTab,
  estoque: EstoqueTab,
  financeiro: FinanceiroTab,
  agenda: AgendaTab,
  relatorios: RelatoriosTab,
  configuracoes: ConfiguracoesTab,
};

const ALL_ITEMS = [...NAV_ITEMS, ...BOTTOM_NAV_ITEMS];

export const DashboardAdmin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const ActiveTab = TAB_COMPONENTS[activeTab] ?? OverviewTab;
  const pageTitle = ALL_ITEMS.find((i) => i.id === activeTab)?.label ?? "Visão Geral";

  return (
    <DashboardShell
      eyebrow="Painel Administrativo"
      navItems={NAV_ITEMS}
      bottomNavItems={BOTTOM_NAV_ITEMS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userName="João Diretor"
      userSubtitle="joao@complexo.com"
      userInitials="JD"
      pageTitle={pageTitle}
    >
      <ActiveTab />
    </DashboardShell>
  );
};
