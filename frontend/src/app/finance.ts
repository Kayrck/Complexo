/**
 * Domínio financeiro: receitas, despesas, contas a receber/pagar e as
 * agregações que alimentam o dashboard. Prototype note: mesma ressalva dos
 * outros módulos — dados em memória, sem persistência real (ver rbac.ts).
 * Tudo que o dashboard mostra é derivado destes registros granulares, nunca
 * de totais soltos, para que os números nunca se contradigam entre telas.
 */

export type RevenueCategory = "Musculação" | "Pilates" | "Nutrição" | "Recovery" | "Loja" | "Outros";
export type PaymentMethod = "Pix" | "Cartão de crédito" | "Cartão de débito" | "Dinheiro" | "Boleto";

export interface Revenue {
  id: string;
  date: string;
  /** Id de BUSINESSES (data.ts), ou "geral" quando não é de uma unidade específica. */
  unit: string;
  category: RevenueCategory;
  description: string;
  amount: number;
  paymentMethod: PaymentMethod;
  recurring: boolean;
}

export type ExpenseCategory =
  | "Aluguel"
  | "Energia"
  | "Água"
  | "Internet"
  | "Folha"
  | "Fornecedores"
  | "Manutenção"
  | "Marketing"
  | "Impostos"
  | "Diversas";

export interface Expense {
  id: string;
  date: string;
  unit?: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  recurring: boolean;
}

export type ReceivableStatus = "Pendente" | "Pago" | "Inadimplente";

export interface Receivable {
  id: string;
  studentName: string;
  unit: string;
  dueDate: string;
  amount: number;
  status: ReceivableStatus;
  paidAt?: string;
}

export type PayableStatus = "Pendente" | "Pago";

export interface Payable {
  id: string;
  supplier: string;
  category: ExpenseCategory;
  dueDate: string;
  amount: number;
  status: PayableStatus;
  recurring: boolean;
  paidAt?: string;
}

export const MONTHS_ORDER = ["2026-03", "2026-04", "2026-05", "2026-06", "2026-07", "2026-08"];
export const MONTH_LABELS: Record<string, string> = {
  "2026-03": "Mar",
  "2026-04": "Abr",
  "2026-05": "Mai",
  "2026-06": "Jun",
  "2026-07": "Jul",
  "2026-08": "Ago",
};

/* Receitas — cada mês tem um pequeno número de lançamentos-resumo por
 * categoria (assim como uma mensalidade é cobrada em lote todo mês), mais
 * granularidade maior no mês corrente para a tabela de detalhe. */
export const REVENUES: Revenue[] = [
  { id: "r-2603-1", date: "2026-03-05", unit: "academia", category: "Musculação", description: "Mensalidades Musculação — março", amount: 37000, paymentMethod: "Pix", recurring: true },
  { id: "r-2603-2", date: "2026-03-05", unit: "pilates", category: "Pilates", description: "Mensalidades Pilates — março", amount: 10500, paymentMethod: "Cartão de crédito", recurring: true },
  { id: "r-2603-3", date: "2026-03-06", unit: "nutricao", category: "Nutrição", description: "Consultas e pacotes — março", amount: 5200, paymentMethod: "Pix", recurring: false },
  { id: "r-2603-4", date: "2026-03-10", unit: "suplementos", category: "Loja", description: "Vendas Loja de Suplementos — março", amount: 12500, paymentMethod: "Cartão de débito", recurring: false },
  { id: "r-2603-5", date: "2026-03-12", unit: "academia", category: "Recovery", description: "Avulsos e day-use — março", amount: 2000, paymentMethod: "Dinheiro", recurring: false },

  { id: "r-2604-1", date: "2026-04-05", unit: "academia", category: "Musculação", description: "Mensalidades Musculação — abril", amount: 38800, paymentMethod: "Pix", recurring: true },
  { id: "r-2604-2", date: "2026-04-05", unit: "pilates", category: "Pilates", description: "Mensalidades Pilates — abril", amount: 11200, paymentMethod: "Cartão de crédito", recurring: true },
  { id: "r-2604-3", date: "2026-04-07", unit: "nutricao", category: "Nutrição", description: "Consultas e pacotes — abril", amount: 5400, paymentMethod: "Pix", recurring: false },
  { id: "r-2604-4", date: "2026-04-11", unit: "suplementos", category: "Loja", description: "Vendas Loja de Suplementos — abril", amount: 13100, paymentMethod: "Cartão de débito", recurring: false },
  { id: "r-2604-5", date: "2026-04-14", unit: "academia", category: "Recovery", description: "Avulsos e day-use — abril", amount: 2100, paymentMethod: "Dinheiro", recurring: false },

  { id: "r-2605-1", date: "2026-05-05", unit: "academia", category: "Musculação", description: "Mensalidades Musculação — maio", amount: 42500, paymentMethod: "Pix", recurring: true },
  { id: "r-2605-2", date: "2026-05-05", unit: "pilates", category: "Pilates", description: "Mensalidades Pilates — maio", amount: 12800, paymentMethod: "Cartão de crédito", recurring: true },
  { id: "r-2605-3", date: "2026-05-08", unit: "nutricao", category: "Nutrição", description: "Consultas e pacotes — maio", amount: 6000, paymentMethod: "Pix", recurring: false },
  { id: "r-2605-4", date: "2026-05-12", unit: "suplementos", category: "Loja", description: "Vendas Loja de Suplementos — maio", amount: 14300, paymentMethod: "Cartão de débito", recurring: false },
  { id: "r-2605-5", date: "2026-05-15", unit: "academia", category: "Recovery", description: "Avulsos e day-use — maio", amount: 2500, paymentMethod: "Dinheiro", recurring: false },

  { id: "r-2606-1", date: "2026-06-05", unit: "academia", category: "Musculação", description: "Mensalidades Musculação — junho", amount: 47000, paymentMethod: "Pix", recurring: true },
  { id: "r-2606-2", date: "2026-06-05", unit: "pilates", category: "Pilates", description: "Mensalidades Pilates — junho", amount: 14200, paymentMethod: "Cartão de crédito", recurring: true },
  { id: "r-2606-3", date: "2026-06-09", unit: "nutricao", category: "Nutrição", description: "Consultas e pacotes — junho", amount: 6800, paymentMethod: "Pix", recurring: false },
  { id: "r-2606-4", date: "2026-06-13", unit: "suplementos", category: "Loja", description: "Vendas Loja de Suplementos — junho", amount: 15800, paymentMethod: "Cartão de débito", recurring: false },
  { id: "r-2606-5", date: "2026-06-18", unit: "academia", category: "Recovery", description: "Avulsos e day-use — junho", amount: 3000, paymentMethod: "Dinheiro", recurring: false },

  { id: "r-2607-1", date: "2026-07-05", unit: "academia", category: "Musculação", description: "Mensalidades Musculação — julho", amount: 48200, paymentMethod: "Pix", recurring: true },
  { id: "r-2607-2", date: "2026-07-05", unit: "pilates", category: "Pilates", description: "Mensalidades Pilates — julho", amount: 14800, paymentMethod: "Cartão de crédito", recurring: true },
  { id: "r-2607-3", date: "2026-07-08", unit: "nutricao", category: "Nutrição", description: "Consultas e pacotes — julho", amount: 7200, paymentMethod: "Pix", recurring: false },
  { id: "r-2607-4", date: "2026-07-14", unit: "suplementos", category: "Loja", description: "Vendas Loja de Suplementos — julho", amount: 16100, paymentMethod: "Cartão de débito", recurring: false },
  { id: "r-2607-5", date: "2026-07-19", unit: "academia", category: "Recovery", description: "Avulsos e day-use — julho", amount: 3100, paymentMethod: "Dinheiro", recurring: false },

  { id: "r-2608-1", date: "2026-08-01", unit: "academia", category: "Musculação", description: "Mensalidades Musculação — agosto", amount: 51500, paymentMethod: "Pix", recurring: true },
  { id: "r-2608-2", date: "2026-08-01", unit: "pilates", category: "Pilates", description: "Mensalidades Pilates — agosto", amount: 15600, paymentMethod: "Cartão de crédito", recurring: true },
  { id: "r-2608-3", date: "2026-08-02", unit: "nutricao", category: "Nutrição", description: "Consultas e pacotes — agosto", amount: 7600, paymentMethod: "Pix", recurring: false },
  { id: "r-2608-4", date: "2026-08-03", unit: "suplementos", category: "Loja", description: "Vendas Loja de Suplementos — agosto", amount: 17200, paymentMethod: "Cartão de débito", recurring: false },
  { id: "r-2608-5", date: "2026-08-04", unit: "academia", category: "Recovery", description: "Avulsos e day-use — agosto", amount: 3500, paymentMethod: "Dinheiro", recurring: false },
];

export const EXPENSES: Expense[] = [
  { id: "e-2603-1", date: "2026-03-05", category: "Folha", description: "Folha de pagamento — março", amount: 18500, recurring: true },
  { id: "e-2603-2", date: "2026-03-05", category: "Aluguel", description: "Aluguel das unidades — março", amount: 6200, recurring: true },
  { id: "e-2603-3", date: "2026-03-08", category: "Fornecedores", description: "Reposição de estoque — março", amount: 6800, recurring: false, unit: "suplementos" },
  { id: "e-2603-4", date: "2026-03-10", category: "Energia", description: "Energia elétrica — março", amount: 3100, recurring: true },
  { id: "e-2603-5", date: "2026-03-10", category: "Água", description: "Água — março", amount: 1200, recurring: true },
  { id: "e-2603-6", date: "2026-03-10", category: "Internet", description: "Internet e telefonia — março", amount: 800, recurring: true },
  { id: "e-2603-7", date: "2026-03-15", category: "Marketing", description: "Anúncios e redes sociais — março", amount: 2200, recurring: false },
  { id: "e-2603-8", date: "2026-03-18", category: "Manutenção", description: "Manutenção de equipamentos — março", amount: 1200, recurring: false },
  { id: "e-2603-9", date: "2026-03-20", category: "Impostos", description: "Impostos e taxas — março", amount: 1000, recurring: true },

  { id: "e-2604-1", date: "2026-04-05", category: "Folha", description: "Folha de pagamento — abril", amount: 19000, recurring: true },
  { id: "e-2604-2", date: "2026-04-05", category: "Aluguel", description: "Aluguel das unidades — abril", amount: 6200, recurring: true },
  { id: "e-2604-3", date: "2026-04-08", category: "Fornecedores", description: "Reposição de estoque — abril", amount: 7300, recurring: false, unit: "suplementos" },
  { id: "e-2604-4", date: "2026-04-10", category: "Energia", description: "Energia elétrica — abril", amount: 3300, recurring: true },
  { id: "e-2604-5", date: "2026-04-10", category: "Água", description: "Água — abril", amount: 1250, recurring: true },
  { id: "e-2604-6", date: "2026-04-10", category: "Internet", description: "Internet e telefonia — abril", amount: 800, recurring: true },
  { id: "e-2604-7", date: "2026-04-16", category: "Marketing", description: "Anúncios e redes sociais — abril", amount: 2400, recurring: false },
  { id: "e-2604-8", date: "2026-04-19", category: "Manutenção", description: "Manutenção de equipamentos — abril", amount: 1250, recurring: false },
  { id: "e-2604-9", date: "2026-04-20", category: "Impostos", description: "Impostos e taxas — abril", amount: 1000, recurring: true },

  { id: "e-2605-1", date: "2026-05-05", category: "Folha", description: "Folha de pagamento — maio", amount: 20000, recurring: true },
  { id: "e-2605-2", date: "2026-05-05", category: "Aluguel", description: "Aluguel das unidades — maio", amount: 6200, recurring: true },
  { id: "e-2605-3", date: "2026-05-09", category: "Fornecedores", description: "Reposição de estoque — maio", amount: 7800, recurring: false, unit: "suplementos" },
  { id: "e-2605-4", date: "2026-05-10", category: "Energia", description: "Energia elétrica — maio", amount: 3400, recurring: true },
  { id: "e-2605-5", date: "2026-05-10", category: "Água", description: "Água — maio", amount: 1300, recurring: true },
  { id: "e-2605-6", date: "2026-05-10", category: "Internet", description: "Internet e telefonia — maio", amount: 800, recurring: true },
  { id: "e-2605-7", date: "2026-05-17", category: "Marketing", description: "Anúncios e redes sociais — maio", amount: 2500, recurring: false },
  { id: "e-2605-8", date: "2026-05-20", category: "Manutenção", description: "Manutenção de equipamentos — maio", amount: 1200, recurring: false },
  { id: "e-2605-9", date: "2026-05-20", category: "Impostos", description: "Impostos e taxas — maio", amount: 1000, recurring: true },

  { id: "e-2606-1", date: "2026-06-05", category: "Folha", description: "Folha de pagamento — junho", amount: 21000, recurring: true },
  { id: "e-2606-2", date: "2026-06-05", category: "Aluguel", description: "Aluguel das unidades — junho", amount: 6200, recurring: true },
  { id: "e-2606-3", date: "2026-06-09", category: "Fornecedores", description: "Reposição de estoque — junho", amount: 8500, recurring: false, unit: "suplementos" },
  { id: "e-2606-4", date: "2026-06-10", category: "Energia", description: "Energia elétrica — junho", amount: 3600, recurring: true },
  { id: "e-2606-5", date: "2026-06-10", category: "Água", description: "Água — junho", amount: 1350, recurring: true },
  { id: "e-2606-6", date: "2026-06-10", category: "Internet", description: "Internet e telefonia — junho", amount: 800, recurring: true },
  { id: "e-2606-7", date: "2026-06-18", category: "Marketing", description: "Anúncios e redes sociais — junho", amount: 2800, recurring: false },
  { id: "e-2606-8", date: "2026-06-21", category: "Manutenção", description: "Manutenção de equipamentos — junho", amount: 1350, recurring: false },
  { id: "e-2606-9", date: "2026-06-22", category: "Impostos", description: "Impostos e taxas — junho", amount: 1200, recurring: true },

  { id: "e-2607-1", date: "2026-07-05", category: "Folha", description: "Folha de pagamento — julho", amount: 21500, recurring: true },
  { id: "e-2607-2", date: "2026-07-05", category: "Aluguel", description: "Aluguel das unidades — julho", amount: 6200, recurring: true },
  { id: "e-2607-3", date: "2026-07-09", category: "Fornecedores", description: "Reposição de estoque — julho", amount: 8700, recurring: false, unit: "suplementos" },
  { id: "e-2607-4", date: "2026-07-10", category: "Energia", description: "Energia elétrica — julho", amount: 3700, recurring: true },
  { id: "e-2607-5", date: "2026-07-10", category: "Água", description: "Água — julho", amount: 1350, recurring: true },
  { id: "e-2607-6", date: "2026-07-10", category: "Internet", description: "Internet e telefonia — julho", amount: 800, recurring: true },
  { id: "e-2607-7", date: "2026-07-19", category: "Marketing", description: "Anúncios e redes sociais — julho", amount: 2850, recurring: false },
  { id: "e-2607-8", date: "2026-07-22", category: "Manutenção", description: "Manutenção de equipamentos — julho", amount: 1300, recurring: false },
  { id: "e-2607-9", date: "2026-07-23", category: "Impostos", description: "Impostos e taxas — julho", amount: 1200, recurring: true },

  { id: "e-2608-1", date: "2026-08-01", category: "Folha", description: "Folha de pagamento — agosto", amount: 22000, recurring: true },
  { id: "e-2608-2", date: "2026-08-01", category: "Aluguel", description: "Aluguel das unidades — agosto", amount: 6200, recurring: true },
  { id: "e-2608-3", date: "2026-08-02", category: "Fornecedores", description: "Reposição de estoque — agosto", amount: 9200, recurring: false, unit: "suplementos" },
  { id: "e-2608-4", date: "2026-08-02", category: "Energia", description: "Energia elétrica — agosto", amount: 3850, recurring: true },
  { id: "e-2608-5", date: "2026-08-03", category: "Água", description: "Água — agosto", amount: 1400, recurring: true },
  { id: "e-2608-6", date: "2026-08-03", category: "Internet", description: "Internet e telefonia — agosto", amount: 800, recurring: true },
  { id: "e-2608-7", date: "2026-08-04", category: "Marketing", description: "Anúncios e redes sociais — agosto", amount: 3000, recurring: false },
  { id: "e-2608-8", date: "2026-08-04", category: "Manutenção", description: "Manutenção de equipamentos — agosto", amount: 1350, recurring: false },
  { id: "e-2608-9", date: "2026-08-04", category: "Impostos", description: "Impostos e taxas — agosto", amount: 1300, recurring: true },
];

export const RECEIVABLES: Receivable[] = [
  { id: "rc-1", studentName: "Marcos Andrade", unit: "academia", dueDate: "2026-08-05", amount: 149, status: "Pendente" },
  { id: "rc-2", studentName: "Julia Santos", unit: "academia", dueDate: "2026-08-05", amount: 229, status: "Pendente" },
  { id: "rc-3", studentName: "Roberto Lima", unit: "academia", dueDate: "2026-07-05", amount: 89, status: "Inadimplente" },
  { id: "rc-4", studentName: "Fernanda Costa", unit: "academia", dueDate: "2026-06-20", amount: 149, status: "Inadimplente" },
  { id: "rc-5", studentName: "Camila Souza", unit: "academia", dueDate: "2026-08-05", amount: 229, status: "Pago", paidAt: "2026-08-03" },
  { id: "rc-6", studentName: "Diego Martins", unit: "pilates", dueDate: "2026-08-10", amount: 149, status: "Pendente" },
  { id: "rc-7", studentName: "Ana Beatriz", unit: "nutricao", dueDate: "2026-07-28", amount: 180, status: "Inadimplente" },
];

export const PAYABLES: Payable[] = [
  { id: "py-1", supplier: "Imobiliária Guaiúba", category: "Aluguel", dueDate: "2026-08-05", amount: 6200, status: "Pago", recurring: true, paidAt: "2026-08-01" },
  { id: "py-2", supplier: "Enel Ceará (Energia)", category: "Energia", dueDate: "2026-08-10", amount: 3850, status: "Pendente", recurring: true },
  { id: "py-3", supplier: "Cagece (Água)", category: "Água", dueDate: "2026-08-12", amount: 1400, status: "Pendente", recurring: true },
  { id: "py-4", supplier: "Provedor Fibra Guaiúba", category: "Internet", dueDate: "2026-08-08", amount: 800, status: "Pendente", recurring: true },
  { id: "py-5", supplier: "Growth Supplements", category: "Fornecedores", dueDate: "2026-08-15", amount: 5200, status: "Pendente", recurring: false },
  { id: "py-6", supplier: "Agência Marca Local", category: "Marketing", dueDate: "2026-08-20", amount: 3000, status: "Pendente", recurring: false },
  { id: "py-7", supplier: "Manutenção Equipamentos JR", category: "Manutenção", dueDate: "2026-07-30", amount: 1350, status: "Pago", recurring: false, paidAt: "2026-07-29" },
];

export interface MonthlyTotal {
  month: string;
  receitas: number;
  despesas: number;
  lucro: number;
}

export function getMonthlySeries(revenues: Revenue[], expenses: Expense[], months: string[] = MONTHS_ORDER): MonthlyTotal[] {
  return months.map((month) => {
    const receitas = revenues.filter((r) => r.date.startsWith(month)).reduce((sum, r) => sum + r.amount, 0);
    const despesas = expenses.filter((e) => e.date.startsWith(month)).reduce((sum, e) => sum + e.amount, 0);
    return { month, receitas, despesas, lucro: receitas - despesas };
  });
}

export function sumByCategory<T extends { category: string; amount: number }>(records: T[], period?: string, dateKey: keyof T = "date" as keyof T) {
  const filtered = period ? records.filter((r) => String(r[dateKey]).startsWith(period)) : records;
  const map = new Map<string, number>();
  for (const r of filtered) map.set(r.category, (map.get(r.category) ?? 0) + r.amount);
  return Array.from(map.entries()).map(([category, total]) => ({ category, total })).sort((a, b) => b.total - a.total);
}

export function sumByUnit(revenues: Revenue[], period?: string) {
  const filtered = period ? revenues.filter((r) => r.date.startsWith(period)) : revenues;
  const map = new Map<string, number>();
  for (const r of filtered) map.set(r.unit, (map.get(r.unit) ?? 0) + r.amount);
  return Array.from(map.entries()).map(([unit, total]) => ({ unit, total })).sort((a, b) => b.total - a.total);
}

/** Variação percentual em relação ao período anterior, com 1 casa decimal. */
export function growthRate(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

export interface ProfitSummary {
  lucroBruto: number;
  lucroLiquido: number;
  margem: number;
}

/** Lucro líquido = bruto por ora — estrutura pronta para deduções futuras (ex.: impostos sobre o lucro). */
export function computeProfitSummary(receitas: number, despesas: number): ProfitSummary {
  const lucroBruto = receitas - despesas;
  const lucroLiquido = lucroBruto;
  const margem = receitas > 0 ? Math.round((lucroLiquido / receitas) * 1000) / 10 : 0;
  return { lucroBruto, lucroLiquido, margem };
}

/** Projeção simples por média móvel dos últimos 3 meses — não é previsão estatística, só uma tendência de referência. */
export function projectNextMonth(series: MonthlyTotal[]): { receitas: number; despesas: number } {
  const last3 = series.slice(-3);
  const avg = (key: "receitas" | "despesas") =>
    last3.length ? Math.round(last3.reduce((sum, m) => sum + m[key], 0) / last3.length) : 0;
  return { receitas: avg("receitas"), despesas: avg("despesas") };
}
