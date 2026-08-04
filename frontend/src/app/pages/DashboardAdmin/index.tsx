import { useState, useEffect } from "react";
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
  CalendarClock,
  FileBarChart,
  Settings,
  UserCog,
  ShieldOff,
} from "lucide-react";
import { DashboardShell, type DashboardNavItem } from "../../components/dashboard/DashboardShell";
import { OverviewTab } from "./tabs/OverviewTab";
import { AlunosTab } from "./tabs/AlunosTab";
import { ProfessoresTab } from "./tabs/ProfessoresTab";
import { NutricionistaTab } from "./tabs/NutricionistaTab";
import { PilatesTab } from "./tabs/PilatesTab";
import { LojaTab } from "./tabs/LojaTab";
import { EstoqueTab } from "./tabs/EstoqueTab";
import { FuncionariosTab } from "./tabs/FuncionariosTab";
import { JornadaTab } from "./tabs/JornadaTab";
import { FinanceiroTab } from "./tabs/FinanceiroTab";
import { AgendaTab } from "./tabs/AgendaTab";
import { RelatoriosTab } from "./tabs/RelatoriosTab";
import { ConfiguracoesTab } from "./tabs/ConfiguracoesTab";
import { useAppContext } from "../../context";
import { hasPermission, getRole as getRoleDefinition, PERMISSION_LABELS, type PermissionKey } from "../../rbac";
import { AUDIT_ACTIONS } from "../../auditLog";

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
  { id: "jornada", label: "Jornada", icon: CalendarClock },
  { id: "funcionarios", label: "Funcionários", icon: UserCog },
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
  funcionarios: FuncionariosTab,
  jornada: JornadaTab,
  financeiro: FinanceiroTab,
  agenda: AgendaTab,
  relatorios: RelatoriosTab,
  configuracoes: ConfiguracoesTab,
};

const ALL_ITEMS = [...NAV_ITEMS, ...BOTTOM_NAV_ITEMS];

const initialsOf = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export const DashboardAdmin = () => {
  const { currentEmployee, logAudit } = useAppContext();

  const permittedNav = NAV_ITEMS.filter((item) => hasPermission(currentEmployee, item.id as PermissionKey));
  const permittedBottomNav = BOTTOM_NAV_ITEMS.filter((item) => hasPermission(currentEmployee, item.id as PermissionKey));
  const permittedIds = new Set([...permittedNav, ...permittedBottomNav].map((item) => item.id));

  const [activeTab, setActiveTab] = useState(() => permittedNav[0]?.id ?? permittedBottomNav[0]?.id ?? "overview");
  const isAllowed = permittedIds.has(activeTab);
  const ActiveTab = isAllowed ? TAB_COMPONENTS[activeTab] ?? OverviewTab : null;
  const pageTitle = ALL_ITEMS.find((i) => i.id === activeTab)?.label ?? "Visão Geral";

  useEffect(() => {
    if (isAllowed) return;
    logAudit({
      actorId: currentEmployee?.id ?? null,
      actorName: currentEmployee?.name ?? "Sessão não autenticada",
      action: AUDIT_ACTIONS.ACCESS_DENIED,
      details: `Tentativa de acessar a aba "${PERMISSION_LABELS[activeTab as PermissionKey] ?? activeTab}" sem permissão concedida.`,
      severity: "critical",
    });
    // Só deve reagir quando a aba ativa ou a autorização mudam, não a cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllowed, activeTab]);

  const roleLabel = currentEmployee ? getRoleDefinition(currentEmployee.roleId)?.name : undefined;

  return (
    <DashboardShell
      eyebrow="Painel Administrativo"
      navItems={permittedNav}
      bottomNavItems={permittedBottomNav}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userName={currentEmployee?.name ?? "Sessão inválida"}
      userSubtitle={roleLabel ?? "Sem permissões atribuídas"}
      userInitials={currentEmployee ? initialsOf(currentEmployee.name) : "??"}
      pageTitle={pageTitle}
    >
      {ActiveTab ? (
        <ActiveTab />
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-complexo-light/15 bg-complexo-surface py-24 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400">
            <ShieldOff className="h-6 w-6" />
          </span>
          <h2 className="font-rajdhani text-2xl font-bold uppercase text-complexo-light">Acesso negado</h2>
          <p className="max-w-sm text-sm text-complexo-muted">
            Você não tem permissão para acessar "{pageTitle}". Esta tentativa foi registrada no log de auditoria.
          </p>
        </div>
      )}
    </DashboardShell>
  );
};
