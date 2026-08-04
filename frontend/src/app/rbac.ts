/**
 * Modelo de RBAC (controle de acesso baseado em papéis) do painel administrativo.
 *
 * Prototype note: isto roda inteiramente no front-end, sobre estado em memória
 * (ver context.tsx) — não há um servidor validando estas regras ainda (o
 * backend/ segue stub, ver backend/src/routes/auth.ts). A resolução de
 * permissões abaixo é a peça que precisa ser espelhada num middleware real
 * quando o backend passar a existir de fato: nenhuma decisão de acesso pode
 * depender só do que roda no navegador do usuário.
 */

export type PermissionKey =
  | "overview"
  | "alunos"
  | "professores"
  | "nutricionista"
  | "pilates"
  | "loja"
  | "estoque"
  | "financeiro"
  | "agenda"
  | "jornada"
  | "funcionarios"
  | "relatorios"
  | "configuracoes";

/** Ordem de exibição na matriz de permissões e nos menus. */
export const ALL_PERMISSIONS: PermissionKey[] = [
  "overview",
  "alunos",
  "professores",
  "nutricionista",
  "pilates",
  "loja",
  "estoque",
  "financeiro",
  "agenda",
  "jornada",
  "funcionarios",
  "relatorios",
  "configuracoes",
];

export const PERMISSION_LABELS: Record<PermissionKey, string> = {
  overview: "Visão Geral",
  alunos: "Alunos",
  professores: "Professores",
  nutricionista: "Nutricionista",
  pilates: "Pilates",
  loja: "Loja",
  estoque: "Estoque",
  financeiro: "Financeiro",
  agenda: "Agenda Geral",
  jornada: "Jornada e Banco de Horas",
  funcionarios: "Funcionários",
  relatorios: "Relatórios",
  configuracoes: "Configurações",
};

export type RoleScope = "global" | "unidade";

export interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  /** "global" enxerga todas as unidades; "unidade" fica restrito às unidades
   * atribuídas ao funcionário (ver Employee.units em hr.ts). */
  scope: RoleScope;
  defaultPermissions: PermissionKey[];
}

/**
 * Papéis pré-configurados. A lista é deliberadamente extensível — adicionar um
 * novo papel (ex.: "Marketing") é só um novo item aqui, sem tocar na lógica de
 * resolução de permissões abaixo.
 */
export const ROLES: RoleDefinition[] = [
  {
    id: "admin_master",
    name: "Admin Master",
    description:
      "Acesso total a todas as unidades e módulos. Único papel que pode gerenciar permissões e senhas de outros usuários. Pode haver mais de um Admin Master.",
    scope: "global",
    defaultPermissions: [...ALL_PERMISSIONS],
  },
  {
    id: "admin_unidade",
    name: "Administrador de Unidade",
    description:
      "Acesso administrativo restrito à(s) unidade(s) designada(s) — sem visibilidade sobre outras unidades a menos que uma permissão seja concedida explicitamente.",
    scope: "unidade",
    defaultPermissions: ["overview", "alunos", "agenda", "financeiro"],
  },
  {
    id: "coordenador",
    name: "Coordenador",
    description: "Papel intermediário entre operação e gestão da unidade — acompanha alunos, professores e agenda.",
    scope: "unidade",
    defaultPermissions: ["overview", "alunos", "professores", "agenda"],
  },
  {
    id: "professor",
    name: "Professor",
    description: "Acesso operacional aos próprios alunos e à agenda de aulas/treinos.",
    scope: "unidade",
    defaultPermissions: ["alunos", "agenda"],
  },
  {
    id: "nutricionista",
    name: "Nutricionista",
    description: "Acesso aos pacientes e à agenda de consultas de nutrição.",
    scope: "unidade",
    defaultPermissions: ["nutricionista", "agenda"],
  },
  {
    id: "recepcao",
    name: "Recepção",
    description: "Atendimento, cadastro de alunos e cobrança no balcão da unidade.",
    scope: "unidade",
    defaultPermissions: ["alunos", "agenda", "financeiro"],
  },
  {
    id: "financeiro",
    name: "Financeiro",
    description: "Acesso ao módulo financeiro e a relatórios de todas as unidades, sem acesso operacional a alunos ou funcionários.",
    scope: "global",
    defaultPermissions: ["financeiro", "relatorios"],
  },
  {
    id: "estoque",
    name: "Estoque",
    description: "Gestão de produtos, publicação e níveis de estoque da loja de suplementos.",
    scope: "unidade",
    defaultPermissions: ["loja", "estoque"],
  },
  {
    id: "supervisor",
    name: "Supervisor",
    description: "Acompanha indicadores de todas as unidades, sem editar dados financeiros ou de funcionários.",
    scope: "global",
    defaultPermissions: ["overview", "relatorios", "agenda"],
  },
];

export const getRole = (roleId: string): RoleDefinition | undefined => ROLES.find((r) => r.id === roleId);

/** Mínimo necessário para resolver permissões — Employee (hr.ts) satisfaz isto. */
export interface PermissionSubject {
  roleId: string;
  status: string;
  units: string[];
  /** Concessões/revogações pontuais, independentes do papel — true concede,
   * false revoga, ausente = usa o padrão do papel. Este é o mecanismo que
   * permite, por exemplo, um Admin de Unidade do Pilates ter Financeiro mas
   * não Estoque, mesmo os dois estando fora do padrão do seu papel. */
  permissionOverrides: Partial<Record<PermissionKey, boolean>>;
}

/** Mescla as permissões padrão do papel com os overrides granulares do funcionário. */
export function resolvePermissions(subject: PermissionSubject): PermissionKey[] {
  const role = getRole(subject.roleId);
  const resolved = new Set<PermissionKey>(role?.defaultPermissions ?? []);
  for (const key of ALL_PERMISSIONS) {
    const override = subject.permissionOverrides[key];
    if (override === true) resolved.add(key);
    else if (override === false) resolved.delete(key);
  }
  return ALL_PERMISSIONS.filter((key) => resolved.has(key));
}

export function hasPermission(subject: PermissionSubject | null | undefined, key: PermissionKey): boolean {
  if (!subject) return false;
  if (subject.status !== "Ativo") return false;
  return resolvePermissions(subject).includes(key);
}

/** true se o papel é global, ou se a unidade está entre as atribuídas ao funcionário. */
export function hasUnitAccess(subject: PermissionSubject | null | undefined, unitId: string): boolean {
  if (!subject) return false;
  const role = getRole(subject.roleId);
  if (role?.scope === "global") return true;
  return subject.units.includes(unitId);
}
