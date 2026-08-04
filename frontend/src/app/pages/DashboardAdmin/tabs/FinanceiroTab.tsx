import { useMemo, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  AlertTriangle,
  HandCoins,
  Landmark,
  Receipt,
  CreditCard,
  FileDown,
  CheckCircle2,
  Percent,
  Banknote,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { StatCard } from "../../../components/dashboard/StatCard";
import { SectionCard } from "../../../components/dashboard/SectionCard";
import { StatusBadge } from "../../../components/dashboard/StatusBadge";
import { useAppContext } from "../../../context";
import { BUSINESSES, getBusiness } from "../../../data";
import { AUDIT_ACTIONS } from "../../../auditLog";
import {
  REVENUES,
  EXPENSES,
  MONTHS_ORDER,
  MONTH_LABELS,
  getMonthlySeries,
  sumByCategory,
  sumByUnit,
  growthRate,
  computeProfitSummary,
  projectNextMonth,
  type RevenueCategory,
  type PaymentMethod,
  type ExpenseCategory,
} from "../../../finance";

const SUB_TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "receitas", label: "Receitas" },
  { id: "despesas", label: "Despesas" },
  { id: "receber", label: "Contas a Receber" },
  { id: "pagar", label: "Contas a Pagar" },
  { id: "fluxo", label: "Fluxo de Caixa" },
  { id: "relatorios", label: "Relatórios" },
] as const;
type SubTab = (typeof SUB_TABS)[number]["id"];

const COLORS = ["#E10600", "#2b6fff", "#16a34a", "#ff7a00", "#9333ea", "#0891b2", "#db2777", "#ca8a04"];
const REVENUE_CATEGORIES: RevenueCategory[] = ["Musculação", "Pilates", "Nutrição", "Recovery", "Loja", "Outros"];
const PAYMENT_METHODS: PaymentMethod[] = ["Pix", "Cartão de crédito", "Cartão de débito", "Dinheiro", "Boleto"];
const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "Aluguel",
  "Energia",
  "Água",
  "Internet",
  "Folha",
  "Fornecedores",
  "Manutenção",
  "Marketing",
  "Impostos",
  "Diversas",
];

const currency = (value: number) => `R$${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const currentPeriod = MONTHS_ORDER[MONTHS_ORDER.length - 1];
const previousPeriod = MONTHS_ORDER[MONTHS_ORDER.length - 2];

const formatDate = (isoDate: string) => {
  const [y, m, d] = isoDate.split("T")[0].split("-").map(Number);
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
};

const selectCls =
  "rounded-lg border border-complexo-light/10 bg-complexo-panel px-3 py-2 text-sm text-complexo-light focus:border-complexo-red focus:outline-none";

export const FinanceiroTab = () => {
  const { receivables, updateReceivableStatus, payables, updatePayableStatus, currentEmployee, logAudit } =
    useAppContext();
  const [subTab, setSubTab] = useState<SubTab>("dashboard");

  const [revUnit, setRevUnit] = useState("Todas");
  const [revCategory, setRevCategory] = useState("Todas");
  const [revPeriod, setRevPeriod] = useState("Todos");
  const [revMethod, setRevMethod] = useState("Todas");

  const [expCategory, setExpCategory] = useState("Todas");
  const [expPeriod, setExpPeriod] = useState("Todos");
  const [expRecurring, setExpRecurring] = useState("Todas");

  const [receivableFilter, setReceivableFilter] = useState<string>("Todos");
  const [payableFilter, setPayableFilter] = useState<string>("Todos");

  const [reportPeriod, setReportPeriod] = useState("Todos");
  const [reportUnit, setReportUnit] = useState("Todas");
  const [reportCategory, setReportCategory] = useState("Todas");

  const canManageFinance =
    currentEmployee?.roleId === "admin_master" ||
    currentEmployee?.roleId === "admin_unidade" ||
    currentEmployee?.roleId === "financeiro";

  const series = useMemo(() => getMonthlySeries(REVENUES, EXPENSES), []);
  const currentMonth = series.find((m) => m.month === currentPeriod)!;
  const previousMonth = series.find((m) => m.month === previousPeriod)!;
  const growth = growthRate(currentMonth.receitas, previousMonth.receitas);
  const profit = computeProfitSummary(currentMonth.receitas, currentMonth.despesas);
  const projection = projectNextMonth(series);

  const revenueByCategory = useMemo(() => sumByCategory(REVENUES, currentPeriod), []);
  const revenueByUnit = useMemo(
    () => sumByUnit(REVENUES, currentPeriod).map((r) => ({ ...r, label: getBusiness(r.unit)?.name ?? r.unit })),
    [],
  );

  const filteredRevenues = useMemo(
    () =>
      REVENUES.filter((r) => revUnit === "Todas" || r.unit === revUnit)
        .filter((r) => revCategory === "Todas" || r.category === revCategory)
        .filter((r) => revPeriod === "Todos" || r.date.startsWith(revPeriod))
        .filter((r) => revMethod === "Todas" || r.paymentMethod === revMethod)
        .sort((a, b) => (a.date < b.date ? 1 : -1)),
    [revUnit, revCategory, revPeriod, revMethod],
  );

  const filteredExpenses = useMemo(
    () =>
      EXPENSES.filter((e) => expCategory === "Todas" || e.category === expCategory)
        .filter((e) => expPeriod === "Todos" || e.date.startsWith(expPeriod))
        .filter((e) => expRecurring === "Todas" || (expRecurring === "Recorrentes" ? e.recurring : !e.recurring))
        .sort((a, b) => (a.date < b.date ? 1 : -1)),
    [expCategory, expPeriod, expRecurring],
  );

  const pendingReceivables = receivables.filter((r) => r.status === "Pendente");
  const overdueReceivables = receivables.filter((r) => r.status === "Inadimplente");
  const dueSoonReceivables = pendingReceivables.filter((r) => {
    const days = (new Date(r.dueDate).getTime() - new Date(currentPeriod + "-04").getTime()) / 86400000;
    return days >= 0 && days <= 7;
  });

  const pendingPayables = payables.filter((p) => p.status === "Pendente");
  const totalPendingPayables = pendingPayables.reduce((sum, p) => sum + p.amount, 0);

  const filteredReceivables = receivableFilter === "Todos" ? receivables : receivables.filter((r) => r.status === receivableFilter);
  const filteredPayables = payableFilter === "Todos" ? payables : payables.filter((p) => p.status === payableFilter);

  const handleMarkReceivablePaid = (id: string) => {
    if (!canManageFinance) return;
    const rec = receivables.find((r) => r.id === id);
    updateReceivableStatus(id, "Pago");
    logAudit({
      actorId: currentEmployee?.id ?? null,
      actorName: currentEmployee?.name ?? "Sessão não autenticada",
      action: AUDIT_ACTIONS.FINANCE_UPDATE,
      details: `Deu baixa na mensalidade de ${rec?.studentName ?? id} (${currency(rec?.amount ?? 0)}).`,
      severity: "info",
    });
  };

  const handleMarkPayablePaid = (id: string) => {
    if (!canManageFinance) return;
    const pay = payables.find((p) => p.id === id);
    updatePayableStatus(id, "Pago");
    logAudit({
      actorId: currentEmployee?.id ?? null,
      actorName: currentEmployee?.name ?? "Sessão não autenticada",
      action: AUDIT_ACTIONS.FINANCE_UPDATE,
      details: `Marcou como pago o fornecedor ${pay?.supplier ?? id} (${currency(pay?.amount ?? 0)}).`,
      severity: "info",
    });
  };

  const reportRevenues = REVENUES.filter((r) => reportPeriod === "Todos" || r.date.startsWith(reportPeriod))
    .filter((r) => reportUnit === "Todas" || r.unit === reportUnit)
    .filter((r) => reportCategory === "Todas" || r.category === reportCategory);
  const reportExpenses = EXPENSES.filter((e) => reportPeriod === "Todos" || e.date.startsWith(reportPeriod)).filter(
    (e) => reportCategory === "Todas" || e.category === reportCategory,
  );
  const reportReceitas = reportRevenues.reduce((sum, r) => sum + r.amount, 0);
  const reportDespesas = reportExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Financeiro</h2>
        <p className="text-complexo-muted">Painel gerencial de receitas, despesas, contas e fluxo de caixa do grupo.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {SUB_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              subTab === t.id
                ? "border-complexo-red bg-complexo-red/10 text-complexo-red"
                : "border-complexo-light/10 text-complexo-muted hover:text-complexo-light"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {subTab === "dashboard" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={TrendingUp} label={`Faturamento — ${MONTH_LABELS[currentPeriod]}`} value={currency(currentMonth.receitas)} trend={`${growth > 0 ? "+" : ""}${growth}%`} trendPositive={growth >= 0} />
            <StatCard icon={TrendingDown} label={`Despesas — ${MONTH_LABELS[currentPeriod]}`} value={currency(currentMonth.despesas)} />
            <StatCard icon={Wallet} label="Lucro líquido do mês" value={currency(profit.lucroLiquido)} suffix={`margem ${profit.margem}%`} />
            <StatCard icon={AlertTriangle} label="Inadimplência" value={`${overdueReceivables.length}`} suffix="alunos" />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <SectionCard title="Receitas × despesas — últimos 6 meses" className="xl:col-span-2">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={series.map((m) => ({ ...m, label: MONTH_LABELS[m.month] }))} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="label" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
                      itemStyle={{ color: "#fff" }}
                      formatter={(value: number) => currency(value)}
                    />
                    <Legend wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }} />
                    <Line type="monotone" dataKey="receitas" name="Receitas" stroke="#16a34a" strokeWidth={3} dot={{ fill: "#16a34a", r: 4 }} />
                    <Line type="monotone" dataKey="despesas" name="Despesas" stroke="#E10600" strokeWidth={3} dot={{ fill: "#E10600", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>

            <SectionCard title="Receita por categoria">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={revenueByCategory} dataKey="total" nameKey="category" cx="50%" cy="50%" outerRadius={80}>
                      {revenueByCategory.map((entry, i) => (
                        <Cell key={entry.category} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => currency(value)} contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} />
                    <Legend wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>
          </div>

          <SectionCard title="Receita por unidade">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByUnit} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="label" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} axisLine={false} tickLine={false} width={110} />
                  <Tooltip formatter={(value: number) => currency(value)} contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} />
                  <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                    {revenueByUnit.map((entry, i) => (
                      <Cell key={entry.unit} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>
      )}

      {subTab === "receitas" && (
        <SectionCard title="Receitas">
          <div className="mb-4 flex flex-wrap gap-3">
            <select value={revPeriod} onChange={(e) => setRevPeriod(e.target.value)} className={selectCls}>
              <option value="Todos">Todos os períodos</option>
              {MONTHS_ORDER.map((m) => <option key={m} value={m}>{MONTH_LABELS[m]}/2026</option>)}
            </select>
            <select value={revUnit} onChange={(e) => setRevUnit(e.target.value)} className={selectCls}>
              <option value="Todas">Todas as unidades</option>
              {BUSINESSES.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <select value={revCategory} onChange={(e) => setRevCategory(e.target.value)} className={selectCls}>
              <option value="Todas">Todas as categorias</option>
              {REVENUE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={revMethod} onChange={(e) => setRevMethod(e.target.value)} className={selectCls}>
              <option value="Todas">Todas as formas de pagamento</option>
              {PAYMENT_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="mb-3 text-sm text-complexo-muted">
            {filteredRevenues.length} lançamentos · total {currency(filteredRevenues.reduce((s, r) => s + r.amount, 0))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-complexo-muted">
                <tr className="border-b border-complexo-light/10">
                  <th className="py-3 pr-4 font-medium">Data</th>
                  <th className="py-3 pr-4 font-medium">Descrição</th>
                  <th className="py-3 pr-4 font-medium">Unidade</th>
                  <th className="py-3 pr-4 font-medium">Categoria</th>
                  <th className="py-3 pr-4 font-medium">Pagamento</th>
                  <th className="py-3 pr-0 font-medium">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-complexo-light/10">
                {filteredRevenues.map((r) => (
                  <tr key={r.id}>
                    <td className="py-3 pr-4 whitespace-nowrap text-complexo-muted">{formatDate(r.date)}</td>
                    <td className="py-3 pr-4 font-medium text-complexo-light">
                      {r.description}
                      {r.recurring && <span className="ml-2 rounded-full bg-complexo-light/10 px-2 py-0.5 text-[10px] uppercase text-complexo-muted">Recorrente</span>}
                    </td>
                    <td className="py-3 pr-4 text-complexo-muted">{getBusiness(r.unit)?.name ?? r.unit}</td>
                    <td className="py-3 pr-4 text-complexo-muted">{r.category}</td>
                    <td className="py-3 pr-4 text-complexo-muted">{r.paymentMethod}</td>
                    <td className="py-3 pr-0 font-semibold text-emerald-500">{currency(r.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {subTab === "despesas" && (
        <SectionCard title="Despesas">
          <div className="mb-4 flex flex-wrap gap-3">
            <select value={expPeriod} onChange={(e) => setExpPeriod(e.target.value)} className={selectCls}>
              <option value="Todos">Todos os períodos</option>
              {MONTHS_ORDER.map((m) => <option key={m} value={m}>{MONTH_LABELS[m]}/2026</option>)}
            </select>
            <select value={expCategory} onChange={(e) => setExpCategory(e.target.value)} className={selectCls}>
              <option value="Todas">Todas as categorias</option>
              {EXPENSE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={expRecurring} onChange={(e) => setExpRecurring(e.target.value)} className={selectCls}>
              <option value="Todas">Recorrentes e pontuais</option>
              <option value="Recorrentes">Só recorrentes</option>
              <option value="Pontuais">Só pontuais</option>
            </select>
          </div>
          <div className="mb-3 text-sm text-complexo-muted">
            {filteredExpenses.length} lançamentos · total {currency(filteredExpenses.reduce((s, e) => s + e.amount, 0))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-complexo-muted">
                <tr className="border-b border-complexo-light/10">
                  <th className="py-3 pr-4 font-medium">Data</th>
                  <th className="py-3 pr-4 font-medium">Descrição</th>
                  <th className="py-3 pr-4 font-medium">Categoria</th>
                  <th className="py-3 pr-0 font-medium">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-complexo-light/10">
                {filteredExpenses.map((e) => (
                  <tr key={e.id}>
                    <td className="py-3 pr-4 whitespace-nowrap text-complexo-muted">{formatDate(e.date)}</td>
                    <td className="py-3 pr-4 font-medium text-complexo-light">
                      {e.description}
                      {e.recurring && <span className="ml-2 rounded-full bg-complexo-light/10 px-2 py-0.5 text-[10px] uppercase text-complexo-muted">Recorrente</span>}
                    </td>
                    <td className="py-3 pr-4 text-complexo-muted">{e.category}</td>
                    <td className="py-3 pr-0 font-semibold text-red-400">{currency(e.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {subTab === "receber" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard icon={Receipt} label="Pendentes" value={`${pendingReceivables.length}`} suffix={currency(pendingReceivables.reduce((s, r) => s + r.amount, 0))} />
            <StatCard icon={AlertTriangle} label="Inadimplentes" value={`${overdueReceivables.length}`} suffix={currency(overdueReceivables.reduce((s, r) => s + r.amount, 0))} />
            <StatCard icon={Landmark} label="Vencendo em 7 dias" value={`${dueSoonReceivables.length}`} />
          </div>
          <SectionCard title="Contas a receber">
            <div className="mb-4 flex flex-wrap gap-2">
              {["Todos", "Pendente", "Inadimplente", "Pago"].map((s) => (
                <button
                  key={s}
                  onClick={() => setReceivableFilter(s)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    receivableFilter === s ? "border-complexo-red bg-complexo-red/10 text-complexo-red" : "border-complexo-light/10 text-complexo-muted hover:text-complexo-light"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase text-complexo-muted">
                  <tr className="border-b border-complexo-light/10">
                    <th className="py-3 pr-4 font-medium">Aluno</th>
                    <th className="py-3 pr-4 font-medium">Unidade</th>
                    <th className="py-3 pr-4 font-medium">Vencimento</th>
                    <th className="py-3 pr-4 font-medium">Valor</th>
                    <th className="py-3 pr-4 font-medium">Status</th>
                    {canManageFinance && <th className="py-3 pr-0 font-medium">Ações</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-complexo-light/10">
                  {filteredReceivables.map((r) => (
                    <tr key={r.id}>
                      <td className="py-3 pr-4 font-medium text-complexo-light">{r.studentName}</td>
                      <td className="py-3 pr-4 text-complexo-muted">{getBusiness(r.unit)?.name ?? r.unit}</td>
                      <td className="py-3 pr-4 text-complexo-muted">{formatDate(r.dueDate)}</td>
                      <td className="py-3 pr-4 font-semibold text-complexo-light">{currency(r.amount)}</td>
                      <td className="py-3 pr-4">
                        <StatusBadge status={r.status} />
                      </td>
                      {canManageFinance && (
                        <td className="py-3 pr-0">
                          {r.status !== "Pago" && (
                            <button
                              onClick={() => handleMarkReceivablePaid(r.id)}
                              className="flex items-center gap-1.5 text-xs font-semibold text-complexo-muted hover:text-emerald-500"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" /> Dar baixa
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
      )}

      {subTab === "pagar" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatCard icon={CreditCard} label="A pagar" value={`${pendingPayables.length}`} suffix={currency(totalPendingPayables)} />
            <StatCard icon={Banknote} label="Recorrentes" value={`${payables.filter((p) => p.recurring).length}`} />
          </div>
          <SectionCard title="Contas a pagar">
            <div className="mb-4 flex flex-wrap gap-2">
              {["Todos", "Pendente", "Pago"].map((s) => (
                <button
                  key={s}
                  onClick={() => setPayableFilter(s)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    payableFilter === s ? "border-complexo-red bg-complexo-red/10 text-complexo-red" : "border-complexo-light/10 text-complexo-muted hover:text-complexo-light"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase text-complexo-muted">
                  <tr className="border-b border-complexo-light/10">
                    <th className="py-3 pr-4 font-medium">Fornecedor</th>
                    <th className="py-3 pr-4 font-medium">Categoria</th>
                    <th className="py-3 pr-4 font-medium">Vencimento</th>
                    <th className="py-3 pr-4 font-medium">Valor</th>
                    <th className="py-3 pr-4 font-medium">Status</th>
                    {canManageFinance && <th className="py-3 pr-0 font-medium">Ações</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-complexo-light/10">
                  {filteredPayables.map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 pr-4 font-medium text-complexo-light">
                        {p.supplier}
                        {p.recurring && <span className="ml-2 rounded-full bg-complexo-light/10 px-2 py-0.5 text-[10px] uppercase text-complexo-muted">Recorrente</span>}
                      </td>
                      <td className="py-3 pr-4 text-complexo-muted">{p.category}</td>
                      <td className="py-3 pr-4 text-complexo-muted">{formatDate(p.dueDate)}</td>
                      <td className="py-3 pr-4 font-semibold text-complexo-light">{currency(p.amount)}</td>
                      <td className="py-3 pr-4">
                        <StatusBadge status={p.status} />
                      </td>
                      {canManageFinance && (
                        <td className="py-3 pr-0">
                          {p.status !== "Pago" && (
                            <button
                              onClick={() => handleMarkPayablePaid(p.id)}
                              className="flex items-center gap-1.5 text-xs font-semibold text-complexo-muted hover:text-emerald-500"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" /> Marcar como pago
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
      )}

      {subTab === "fluxo" && (
        <div className="space-y-6">
          <SectionCard title="Fluxo de caixa acumulado">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={series.reduce<{ label: string; receitas: number; despesas: number; saldoAcumulado: number }[]>((acc, m) => {
                    const prevSaldo = acc.length ? acc[acc.length - 1].saldoAcumulado : 0;
                    acc.push({ label: MONTH_LABELS[m.month], receitas: m.receitas, despesas: m.despesas, saldoAcumulado: prevSaldo + m.lucro });
                    return acc;
                  }, [])}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="label" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value: number) => currency(value)} contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }} />
                  <Line type="monotone" dataKey="receitas" name="Entradas" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="despesas" name="Saídas" stroke="#E10600" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="saldoAcumulado" name="Saldo acumulado" stroke="#2b6fff" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title={`Projeção — ${MONTH_LABELS[MONTHS_ORDER[MONTHS_ORDER.length - 1]]} + 1 (média móvel de 3 meses)`}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-complexo-light/10 bg-complexo-panel p-4">
                <p className="text-[10px] uppercase text-complexo-muted">Receitas projetadas</p>
                <p className="mt-1 font-rajdhani text-2xl font-bold text-emerald-500">{currency(projection.receitas)}</p>
              </div>
              <div className="rounded-xl border border-complexo-light/10 bg-complexo-panel p-4">
                <p className="text-[10px] uppercase text-complexo-muted">Despesas projetadas</p>
                <p className="mt-1 font-rajdhani text-2xl font-bold text-red-400">{currency(projection.despesas)}</p>
              </div>
              <div className="rounded-xl border border-complexo-red/30 bg-complexo-red/5 p-4">
                <p className="text-[10px] uppercase text-complexo-muted">Lucro projetado</p>
                <p className="mt-1 font-rajdhani text-2xl font-bold text-complexo-red">{currency(projection.receitas - projection.despesas)}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-complexo-muted">
              Projeção de referência por média móvel dos últimos 3 meses — não substitui uma previsão orçamentária formal.
            </p>
          </SectionCard>
        </div>
      )}

      {subTab === "relatorios" && (
        <SectionCard title="Relatórios">
          <div className="mb-5 flex flex-wrap items-end gap-3">
            <div>
              <p className="mb-1.5 font-mono text-xs uppercase tracking-widest text-complexo-muted">Período</p>
              <select value={reportPeriod} onChange={(e) => setReportPeriod(e.target.value)} className={selectCls}>
                <option value="Todos">Todos</option>
                {MONTHS_ORDER.map((m) => <option key={m} value={m}>{MONTH_LABELS[m]}/2026</option>)}
              </select>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs uppercase tracking-widest text-complexo-muted">Unidade</p>
              <select value={reportUnit} onChange={(e) => setReportUnit(e.target.value)} className={selectCls}>
                <option value="Todas">Todas</option>
                {BUSINESSES.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs uppercase tracking-widest text-complexo-muted">Categoria / serviço</p>
              <select value={reportCategory} onChange={(e) => setReportCategory(e.target.value)} className={selectCls}>
                <option value="Todas">Todas</option>
                {REVENUE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button disabled title="Em breve" className="flex items-center gap-2 rounded-lg border border-complexo-light/10 px-4 py-2 text-sm font-semibold text-complexo-muted opacity-50">
                <FileDown className="h-4 w-4" /> Exportar PDF
              </button>
              <button disabled title="Em breve" className="flex items-center gap-2 rounded-lg border border-complexo-light/10 px-4 py-2 text-sm font-semibold text-complexo-muted opacity-50">
                <FileDown className="h-4 w-4" /> Exportar Excel
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard icon={TrendingUp} label="Receitas no filtro" value={currency(reportReceitas)} />
            <StatCard icon={TrendingDown} label="Despesas no filtro" value={currency(reportDespesas)} />
            <StatCard icon={Percent} label="Resultado" value={currency(reportReceitas - reportDespesas)} />
          </div>

          <p className="mt-5 text-xs text-complexo-muted">
            Exportação em PDF/Excel e o filtro por funcionário têm a estrutura pronta nesta tela — passam a funcionar
            quando o relatório for gerado por um serviço no back-end e os lançamentos passarem a referenciar o
            funcionário responsável.
          </p>
        </SectionCard>
      )}
    </div>
  );
};
