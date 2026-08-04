import type { PermissionKey } from "./rbac";

/**
 * Domínio de RH: funcionários, jornada, banco de horas e folha.
 *
 * Prototype note: mesma ressalva de rbac.ts — dados e cálculos vivem em
 * memória (context.tsx), não em um banco real. As funções de cálculo abaixo
 * (banco de horas, demonstrativo de folha) são as regras de negócio reais que
 * devem ser portadas para o backend quando ele existir; a UI só consome o
 * resultado, nunca decide a regra sozinha.
 */

export type WeekDay = "seg" | "ter" | "qua" | "qui" | "sex" | "sab" | "dom";

export const WEEK_DAYS: { id: WeekDay; label: string }[] = [
  { id: "seg", label: "Seg" },
  { id: "ter", label: "Ter" },
  { id: "qua", label: "Qua" },
  { id: "qui", label: "Qui" },
  { id: "sex", label: "Sex" },
  { id: "sab", label: "Sáb" },
  { id: "dom", label: "Dom" },
];

export interface WorkSchedule {
  weeklyHours: number;
  entryTime: string;
  exitTime: string;
  daysOfWeek: WeekDay[];
}

export type EmployeeStatus = "Ativo" | "Afastado" | "Desligado";

export interface Employee {
  id: string;
  name: string;
  photo?: string;
  cpf: string;
  phone: string;
  email: string;
  roleId: string;
  /** Ids de BUSINESSES (data.ts) a que este funcionário está restrito. Ignorado
   * para papéis de escopo "global" (ver rbac.ts). */
  units: string[];
  schedule: WorkSchedule;
  baseSalary: number;
  hourlyRate: number;
  admissionDate: string;
  status: EmployeeStatus;
  permissionOverrides: Partial<Record<PermissionKey, boolean>>;
}

export const EMPLOYEES: Employee[] = [
  {
    id: "joao-diretor",
    name: "João Diretor",
    cpf: "123.456.789-00",
    phone: "(85) 99911-0001",
    email: "admin@complexo.com",
    roleId: "admin_master",
    units: [],
    schedule: { weeklyHours: 40, entryTime: "08:00", exitTime: "17:00", daysOfWeek: ["seg", "ter", "qua", "qui", "sex"] },
    baseSalary: 8500,
    hourlyRate: 48.85,
    admissionDate: "2022-03-01",
    status: "Ativo",
    permissionOverrides: {},
  },
  {
    id: "renata-alves",
    name: "Renata Alves",
    cpf: "234.567.890-11",
    phone: "(85) 99922-0002",
    email: "pilates@complexo.com",
    roleId: "admin_unidade",
    units: ["pilates"],
    schedule: { weeklyHours: 36, entryTime: "07:00", exitTime: "14:00", daysOfWeek: ["seg", "ter", "qua", "qui", "sex", "sab"] },
    baseSalary: 3400,
    hourlyRate: 21.79,
    admissionDate: "2023-06-12",
    status: "Ativo",
    permissionOverrides: {},
  },
  {
    id: "andre-nogueira",
    name: "André Nogueira",
    cpf: "345.678.901-22",
    phone: "(85) 99933-0003",
    email: "andre@complexo.com",
    roleId: "professor",
    units: ["academia"],
    schedule: { weeklyHours: 44, entryTime: "05:30", exitTime: "14:30", daysOfWeek: ["seg", "ter", "qua", "qui", "sex", "sab"] },
    baseSalary: 2600,
    hourlyRate: 13.6,
    admissionDate: "2021-09-20",
    status: "Ativo",
    permissionOverrides: {},
  },
  {
    id: "lara-maia",
    name: "Lara Maia",
    cpf: "456.789.012-33",
    phone: "(85) 99944-0004",
    email: "lara@complexo.com",
    roleId: "nutricionista",
    units: ["nutricao"],
    schedule: { weeklyHours: 30, entryTime: "09:00", exitTime: "15:00", daysOfWeek: ["seg", "ter", "qua", "qui", "sex"] },
    baseSalary: 3200,
    hourlyRate: 24.62,
    admissionDate: "2024-02-05",
    status: "Ativo",
    permissionOverrides: {},
  },
  {
    id: "camila-ferreira",
    name: "Camila Ferreira",
    cpf: "567.890.123-44",
    phone: "(85) 99955-0005",
    email: "camila@complexo.com",
    roleId: "recepcao",
    units: ["suplementos"],
    schedule: { weeklyHours: 40, entryTime: "09:00", exitTime: "18:00", daysOfWeek: ["seg", "ter", "qua", "qui", "sex", "sab"] },
    baseSalary: 1850,
    hourlyRate: 10.65,
    admissionDate: "2023-01-16",
    status: "Ativo",
    // Concessão pontual: recepção que também cuida do controle de estoque na loja.
    permissionOverrides: { estoque: true },
  },
  {
    id: "bruno-esteves",
    name: "Bruno Esteves",
    cpf: "678.901.234-55",
    phone: "(85) 99966-0006",
    email: "bruno@complexo.com",
    roleId: "financeiro",
    units: [],
    schedule: { weeklyHours: 40, entryTime: "08:00", exitTime: "17:00", daysOfWeek: ["seg", "ter", "qua", "qui", "sex"] },
    baseSalary: 3800,
    hourlyRate: 21.86,
    admissionDate: "2022-11-03",
    status: "Ativo",
    permissionOverrides: {},
  },
  {
    id: "patricia-lopes",
    name: "Patrícia Lopes",
    cpf: "789.012.345-66",
    phone: "(85) 99977-0007",
    email: "patricia@complexo.com",
    roleId: "estoque",
    units: ["suplementos"],
    schedule: { weeklyHours: 40, entryTime: "10:00", exitTime: "19:00", daysOfWeek: ["seg", "ter", "qua", "qui", "sex"] },
    baseSalary: 1900,
    hourlyRate: 10.94,
    admissionDate: "2024-05-27",
    status: "Ativo",
    permissionOverrides: {},
  },
  {
    id: "felipe-rocha",
    name: "Felipe Rocha",
    cpf: "890.123.456-77",
    phone: "(85) 99988-0008",
    email: "felipe@complexo.com",
    roleId: "coordenador",
    units: ["academia"],
    schedule: { weeklyHours: 44, entryTime: "13:00", exitTime: "22:00", daysOfWeek: ["seg", "ter", "qua", "qui", "sex"] },
    baseSalary: 3000,
    hourlyRate: 15.68,
    admissionDate: "2022-07-11",
    status: "Ativo",
    // Revogação pontual: coordenador que, neste caso, não acompanha dados de outros professores.
    permissionOverrides: { professores: false },
  },
  {
    id: "marina-castro",
    name: "Marina Castro",
    cpf: "901.234.567-88",
    phone: "(85) 99999-0009",
    email: "marina@complexo.com",
    roleId: "supervisor",
    units: [],
    schedule: { weeklyHours: 40, entryTime: "08:00", exitTime: "17:00", daysOfWeek: ["seg", "ter", "qua", "qui", "sex"] },
    baseSalary: 4200,
    hourlyRate: 24.16,
    admissionDate: "2023-10-09",
    status: "Afastado",
    permissionOverrides: {},
  },
];

export const getEmployee = (id?: string | null) => EMPLOYEES.find((e) => e.id === id);

/* ------------------------------------------------------------------------ */
/* Jornada, banco de horas e folha                                          */
/* ------------------------------------------------------------------------ */

export interface ScheduleChangeLog {
  id: string;
  /** Funcionário que originalmente estava escalado. */
  substitutedEmployeeId: string;
  /** Funcionário que cobriu o horário. */
  coveringEmployeeId: string;
  reason: string;
  date: string;
  expectedTime: string;
  actualTime: string;
  extraHoursGenerated: number;
  notes?: string;
}

export const SCHEDULE_CHANGES: ScheduleChangeLog[] = [
  {
    id: "sc-1",
    substitutedEmployeeId: "andre-nogueira",
    coveringEmployeeId: "felipe-rocha",
    reason: "Consulta médica",
    date: "2026-07-15",
    expectedTime: "05:30–14:30",
    actualTime: "05:30–18:30",
    extraHoursGenerated: 4,
    notes: "Cobertura das aulas da tarde.",
  },
  {
    id: "sc-2",
    substitutedEmployeeId: "camila-ferreira",
    coveringEmployeeId: "patricia-lopes",
    reason: "Atestado médico",
    date: "2026-07-20",
    expectedTime: "09:00–18:00",
    actualTime: "09:00–18:00",
    extraHoursGenerated: 0,
    notes: "Turno completo coberto dentro do próprio horário de Patrícia.",
  },
  {
    id: "sc-3",
    substitutedEmployeeId: "felipe-rocha",
    coveringEmployeeId: "andre-nogueira",
    reason: "Compromisso pessoal",
    date: "2026-07-25",
    expectedTime: "13:00–22:00",
    actualTime: "13:00–22:00",
    extraHoursGenerated: 0,
  },
  {
    id: "sc-4",
    substitutedEmployeeId: "patricia-lopes",
    coveringEmployeeId: "camila-ferreira",
    reason: "Viagem",
    date: "2026-07-29",
    expectedTime: "10:00–19:00",
    actualTime: "10:00–23:00",
    extraHoursGenerated: 4,
    notes: "Fechamento de inventário mensal no mesmo turno.",
  },
  {
    id: "sc-5",
    substitutedEmployeeId: "andre-nogueira",
    coveringEmployeeId: "felipe-rocha",
    reason: "Emergência familiar",
    date: "2026-08-01",
    expectedTime: "05:30–14:30",
    actualTime: "05:30–16:30",
    extraHoursGenerated: 2,
  },
  {
    id: "sc-6",
    substitutedEmployeeId: "lara-maia",
    coveringEmployeeId: "joao-diretor",
    reason: "Consulta médica própria",
    date: "2026-08-03",
    expectedTime: "09:00–15:00",
    actualTime: "09:00–15:00",
    extraHoursGenerated: 0,
    notes: "Sem atendimentos remarcados — apenas triagem de mensagens.",
  },
];

export type HourBankStatus = "Disponível" | "Utilizado como folga" | "Pago em folha" | "Cancelado";

export interface HourBankEntry {
  id: string;
  employeeId: string;
  date: string;
  /** Positivo = crédito (hora extra trabalhada). Negativo = débito (folga/saída antecipada usando o banco). */
  hours: number;
  reason: string;
  status: HourBankStatus;
  approvedBy?: string;
  approvedAt?: string;
}

/** Saldo acima deste valor (em horas) é sinalizado no dashboard de equipe. */
export const HOUR_BANK_LIMIT = 20;

export const HOUR_BANK_ENTRIES: HourBankEntry[] = [
  {
    id: "hb-1",
    employeeId: "felipe-rocha",
    date: "2026-07-15",
    hours: 4,
    reason: "Cobertura de André Nogueira (consulta médica)",
    status: "Disponível",
    approvedBy: "joao-diretor",
    approvedAt: "2026-07-16",
  },
  {
    id: "hb-2",
    employeeId: "patricia-lopes",
    date: "2026-07-29",
    hours: 4,
    reason: "Cobertura de Camila Ferreira (viagem) + fechamento de inventário",
    status: "Disponível",
    approvedBy: "joao-diretor",
    approvedAt: "2026-07-30",
  },
  {
    id: "hb-3",
    employeeId: "felipe-rocha",
    date: "2026-08-01",
    hours: 2,
    reason: "Cobertura de André Nogueira (emergência familiar)",
    status: "Disponível",
    approvedBy: "joao-diretor",
    approvedAt: "2026-08-02",
  },
  {
    id: "hb-4",
    employeeId: "andre-nogueira",
    date: "2026-06-10",
    hours: 6,
    reason: "Evento especial — Dia do Cliente",
    status: "Utilizado como folga",
    approvedBy: "joao-diretor",
    approvedAt: "2026-06-11",
  },
  {
    id: "hb-5",
    employeeId: "renata-alves",
    date: "2026-07-10",
    hours: 3,
    reason: "Aula extra de reposição aos sábados",
    status: "Pago em folha",
    approvedBy: "joao-diretor",
    approvedAt: "2026-08-01",
  },
  {
    id: "hb-6",
    employeeId: "camila-ferreira",
    date: "2026-07-18",
    hours: -2,
    reason: "Saída antecipada não compensada, autorizada pela gerência",
    status: "Utilizado como folga",
    approvedBy: "joao-diretor",
    approvedAt: "2026-07-18",
  },
  {
    id: "hb-7",
    employeeId: "bruno-esteves",
    date: "2026-07-22",
    hours: 5,
    reason: "Fechamento mensal do financeiro",
    status: "Disponível",
    approvedBy: "joao-diretor",
    approvedAt: "2026-07-23",
  },
  {
    id: "hb-8",
    employeeId: "lara-maia",
    date: "2026-08-02",
    hours: 2,
    reason: "Atendimento extra — lista de espera",
    status: "Cancelado",
    approvedBy: "joao-diretor",
    approvedAt: "2026-08-03",
  },
  {
    id: "hb-9",
    employeeId: "felipe-rocha",
    date: "2026-07-08",
    hours: 12,
    reason: "Acúmulo de coberturas na Academia durante reforma do estúdio de Pilates",
    status: "Disponível",
    approvedBy: "joao-diretor",
    approvedAt: "2026-07-09",
  },
];

/**
 * Saldo atual do banco de horas de um funcionário. Créditos (horas > 0) só
 * contam enquanto estiverem "Disponível" — assim que são compensados (folga
 * ou pagos em folha), saem do saldo corrente automaticamente, sem precisar de
 * um lançamento de estorno. Débitos (horas < 0) contam sempre que não
 * cancelados, pois já nascem como uma redução efetiva do saldo.
 */
export function computeHourBankBalance(employeeId: string, entries: HourBankEntry[]): number {
  return entries
    .filter((e) => e.employeeId === employeeId && e.status !== "Cancelado")
    .filter((e) => !(e.hours > 0 && e.status !== "Disponível"))
    .reduce((sum, e) => sum + e.hours, 0);
}

export interface PayrollStatement {
  employeeId: string;
  period: string;
  expectedHours: number;
  workedHours: number;
  extraHours: number;
  hourBankBalance: number;
  extraHoursValue: number;
  baseSalary: number;
  /** Estrutura preparada para descontos futuros (INSS, faltas, adiantamentos...) — 0 até haver regra definida. */
  discounts: number;
  /** Estrutura preparada para adicionais futuros (comissões, prêmios...) — 0 até haver regra definida. */
  additions: number;
  finalSalary: number;
}

const WEEKS_PER_MONTH = 4.345;
/** Adicional mínimo de hora extra previsto na CLT (Art. 59, §1º) — pode ser maior por convenção coletiva. */
const OVERTIME_MULTIPLIER = 1.5;

/** Gera o demonstrativo do período para um funcionário a partir da jornada padrão, das coberturas registradas e do banco de horas. */
export function generatePayrollStatement(
  employee: Employee,
  period: string,
  hourBankEntries: HourBankEntry[],
  scheduleChanges: ScheduleChangeLog[],
): PayrollStatement {
  const expectedHours = Math.round(employee.schedule.weeklyHours * WEEKS_PER_MONTH);
  const extraHours = scheduleChanges
    .filter((c) => c.date.startsWith(period) && c.coveringEmployeeId === employee.id)
    .reduce((sum, c) => sum + c.extraHoursGenerated, 0);
  const workedHours = expectedHours + extraHours;
  const hourBankBalance = computeHourBankBalance(employee.id, hourBankEntries);
  const paidOutThisPeriod = hourBankEntries
    .filter((e) => e.employeeId === employee.id && e.status === "Pago em folha" && e.date.startsWith(period))
    .reduce((sum, e) => sum + e.hours, 0);
  const extraHoursValue = Math.round(Math.max(paidOutThisPeriod, 0) * employee.hourlyRate * OVERTIME_MULTIPLIER * 100) / 100;
  const discounts = 0;
  const additions = 0;

  return {
    employeeId: employee.id,
    period,
    expectedHours,
    workedHours,
    extraHours,
    hourBankBalance,
    extraHoursValue,
    baseSalary: employee.baseSalary,
    discounts,
    additions,
    finalSalary: Math.round((employee.baseSalary + extraHoursValue + additions - discounts) * 100) / 100,
  };
}
