export type AuditSeverity = "info" | "warning" | "critical";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  /** null quando a tentativa ocorre sem sessão válida (ex.: login falho, acesso direto a rota protegida). */
  actorId: string | null;
  actorName: string;
  action: string;
  details: string;
  severity: AuditSeverity;
}

export const AUDIT_ACTIONS = {
  LOGIN: "login",
  ACCESS_DENIED: "acesso_negado",
  PERMISSION_CHANGE: "alteracao_permissao",
  EMPLOYEE_CREATED: "funcionario_cadastrado",
  HOUR_BANK_UPDATE: "banco_horas_atualizado",
  FINANCE_UPDATE: "financeiro_atualizado",
  INVENTORY_UPDATE: "estoque_atualizado",
} as const;

export const createAuditEntry = (entry: Omit<AuditLogEntry, "id" | "timestamp">): AuditLogEntry => ({
  ...entry,
  id: crypto.randomUUID(),
  timestamp: new Date().toISOString(),
});

/** Histórico semeado para a aba de Funcionários não nascer vazia — mistura
 * eventos de rotina com casos que a auditoria existe pra pegar. */
export const AUDIT_LOG_SEED: AuditLogEntry[] = [
  {
    id: "seed-1",
    timestamp: "2026-07-21T08:03:00-03:00",
    actorId: "joao-diretor",
    actorName: "João Diretor",
    action: AUDIT_ACTIONS.LOGIN,
    details: "Login realizado com sucesso.",
    severity: "info",
  },
  {
    id: "seed-2",
    timestamp: "2026-07-22T09:15:00-03:00",
    actorId: "renata-alves",
    actorName: "Renata Alves",
    action: AUDIT_ACTIONS.LOGIN,
    details: "Login realizado com sucesso.",
    severity: "info",
  },
  {
    id: "seed-3",
    timestamp: "2026-07-24T14:32:00-03:00",
    actorId: "joao-diretor",
    actorName: "João Diretor",
    action: AUDIT_ACTIONS.PERMISSION_CHANGE,
    details: "Concedeu a permissão \"Estoque\" a Camila Ferreira (Recepção), fora do padrão do papel.",
    severity: "warning",
  },
  {
    id: "seed-4",
    timestamp: "2026-07-27T22:10:00-03:00",
    actorId: null,
    actorName: "Sessão não autenticada",
    action: AUDIT_ACTIONS.ACCESS_DENIED,
    details: "Tentativa de acessar /dashboard/admin sem sessão válida.",
    severity: "critical",
  },
  {
    id: "seed-5",
    timestamp: "2026-07-29T11:00:00-03:00",
    actorId: "joao-diretor",
    actorName: "João Diretor",
    action: AUDIT_ACTIONS.EMPLOYEE_CREATED,
    details: "Cadastrou Felipe Rocha (Coordenador) na unidade Academia.",
    severity: "info",
  },
  {
    id: "seed-6",
    timestamp: "2026-08-02T19:44:00-03:00",
    actorId: "renata-alves",
    actorName: "Renata Alves",
    action: AUDIT_ACTIONS.ACCESS_DENIED,
    details: "Tentativa de acessar a aba \"Funcionários\" sem permissão concedida.",
    severity: "critical",
  },
  {
    id: "seed-7",
    timestamp: "2026-08-03T10:20:00-03:00",
    actorId: "joao-diretor",
    actorName: "João Diretor",
    action: AUDIT_ACTIONS.HOUR_BANK_UPDATE,
    details: "Aprovou compensação de 4h do banco de horas de André Nogueira.",
    severity: "info",
  },
];
