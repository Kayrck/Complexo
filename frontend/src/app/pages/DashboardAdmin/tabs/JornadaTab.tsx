import { useMemo, useState } from "react";
import {
  Clock,
  Timer,
  ArrowLeftRight,
  PiggyBank,
  HandCoins,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  CalendarClock,
} from "lucide-react";
import { StatCard } from "../../../components/dashboard/StatCard";
import { SectionCard } from "../../../components/dashboard/SectionCard";
import { StatusBadge } from "../../../components/dashboard/StatusBadge";
import { useAppContext } from "../../../context";
import { getBusiness } from "../../../data";
import { getRole } from "../../../rbac";
import {
  WEEK_DAYS,
  HOUR_BANK_LIMIT,
  computeHourBankBalance,
  generatePayrollStatement,
  type HourBankStatus,
} from "../../../hr";
import { AUDIT_ACTIONS } from "../../../auditLog";

const SUB_TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "escalas", label: "Escalas" },
  { id: "alteracoes", label: "Alterações" },
  { id: "banco", label: "Banco de Horas" },
  { id: "folha", label: "Folha" },
] as const;
type SubTab = (typeof SUB_TABS)[number]["id"];

const STATUS_TONE: Record<HourBankStatus, "positive" | "warning" | "negative" | "neutral"> = {
  Disponível: "positive",
  "Utilizado como folga": "neutral",
  "Pago em folha": "warning",
  Cancelado: "negative",
};

const formatDate = (isoDate: string) => {
  const [y, m, d] = isoDate.split("T")[0].split("-").map(Number);
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
};

const currentPeriod = new Date().toISOString().slice(0, 7);

export const JornadaTab = () => {
  const { employees, currentEmployee, hourBankEntries, updateHourBankStatus, scheduleChanges, logAudit } =
    useAppContext();
  const [subTab, setSubTab] = useState<SubTab>("dashboard");
  const [statusFilter, setStatusFilter] = useState<HourBankStatus | "Todos">("Todos");
  const [periodFilter, setPeriodFilter] = useState<string>("Todos");
  const [payrollEmployeeId, setPayrollEmployeeId] = useState(employees[0]?.id ?? "");
  const [payrollPeriod, setPayrollPeriod] = useState(currentPeriod);

  const canApprove = currentEmployee?.roleId === "admin_master" || currentEmployee?.roleId === "admin_unidade";
  const activeEmployees = useMemo(() => employees.filter((e) => e.status === "Ativo"), [employees]);

  const balances = useMemo(
    () =>
      activeEmployees
        .map((e) => ({ employee: e, balance: computeHourBankBalance(e.id, hourBankEntries) }))
        .sort((a, b) => Math.abs(b.balance) - Math.abs(a.balance)),
    [activeEmployees, hourBankEntries],
  );
  const totalBank = balances.reduce((sum, b) => sum + b.balance, 0);
  const nearLimit = balances.filter((b) => Math.abs(b.balance) >= HOUR_BANK_LIMIT * 0.75);
  const extraHoursThisMonth = scheduleChanges
    .filter((c) => c.date.startsWith(currentPeriod))
    .reduce((sum, c) => sum + c.extraHoursGenerated, 0);
  const payrollExtraCost = activeEmployees.reduce(
    (sum, e) => sum + generatePayrollStatement(e, currentPeriod, hourBankEntries, scheduleChanges).extraHoursValue,
    0,
  );

  const availablePeriods = useMemo(
    () => Array.from(new Set(hourBankEntries.map((e) => e.date.slice(0, 7)))).sort().reverse(),
    [hourBankEntries],
  );

  const filteredEntries = useMemo(
    () =>
      hourBankEntries
        .filter((e) => statusFilter === "Todos" || e.status === statusFilter)
        .filter((e) => periodFilter === "Todos" || e.date.startsWith(periodFilter))
        .sort((a, b) => (a.date < b.date ? 1 : -1)),
    [hourBankEntries, statusFilter, periodFilter],
  );

  const handleResolve = (entryId: string, status: HourBankStatus) => {
    if (!canApprove) return;
    const entry = hourBankEntries.find((e) => e.id === entryId);
    const employee = entry ? employees.find((e) => e.id === entry.employeeId) : undefined;
    updateHourBankStatus(entryId, status);
    logAudit({
      actorId: currentEmployee?.id ?? null,
      actorName: currentEmployee?.name ?? "Sessão não autenticada",
      action: AUDIT_ACTIONS.HOUR_BANK_UPDATE,
      details: `Marcou ${entry ? `${entry.hours}h de ${employee?.name ?? entry.employeeId}` : "um lançamento"} como "${status}".`,
      severity: "info",
    });
  };

  const payrollEmployee = employees.find((e) => e.id === payrollEmployeeId);
  const statement = payrollEmployee
    ? generatePayrollStatement(payrollEmployee, payrollPeriod, hourBankEntries, scheduleChanges)
    : undefined;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Jornada e banco de horas</h2>
        <p className="text-complexo-muted">Escalas, coberturas, banco de horas e folha por período.</p>
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
            <StatCard icon={Timer} label="Horas extras no mês" value={`${extraHoursThisMonth}h`} />
            <StatCard icon={PiggyBank} label="Banco de horas total" value={`${totalBank}h`} />
            <StatCard icon={HandCoins} label="Custo extra na folha (mês)" value={`R$${payrollExtraCost.toFixed(2)}`} />
            <StatCard icon={AlertTriangle} label="Perto do limite" value={`${nearLimit.length}`} />
          </div>

          <SectionCard title={`Maiores saldos (limite: ${HOUR_BANK_LIMIT}h)`}>
            <div className="space-y-2">
              {balances.slice(0, 6).map(({ employee, balance }) => {
                const ratio = Math.min(Math.abs(balance) / HOUR_BANK_LIMIT, 1);
                return (
                  <div key={employee.id} className="flex items-center gap-3">
                    <span className="w-36 shrink-0 truncate text-sm text-complexo-light">{employee.name}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-complexo-panel">
                      <div
                        className={`h-full rounded-full ${
                          Math.abs(balance) >= HOUR_BANK_LIMIT * 0.75 ? "bg-yellow-500" : balance < 0 ? "bg-red-400" : "bg-complexo-red"
                        }`}
                        style={{ width: `${ratio * 100}%` }}
                      />
                    </div>
                    <span className="w-14 shrink-0 text-right font-mono text-sm font-semibold text-complexo-light">
                      {balance > 0 ? "+" : ""}
                      {balance}h
                    </span>
                  </div>
                );
              })}
              {balances.length === 0 && <p className="text-sm text-complexo-muted">Nenhum funcionário ativo com saldo registrado.</p>}
            </div>
          </SectionCard>
        </div>
      )}

      {subTab === "escalas" && (
        <SectionCard title="Escalas padrão por funcionário">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-complexo-muted">
                <tr className="border-b border-complexo-light/10">
                  <th className="py-3 pr-4 font-medium">Funcionário</th>
                  <th className="py-3 pr-4 font-medium">Unidade</th>
                  <th className="py-3 pr-4 font-medium">Dias</th>
                  <th className="py-3 pr-4 font-medium">Horário</th>
                  <th className="py-3 pr-0 font-medium">Carga semanal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-complexo-light/10">
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="py-3 pr-4 font-medium text-complexo-light">{emp.name}</td>
                    <td className="py-3 pr-4 text-complexo-muted">
                      {getRole(emp.roleId)?.scope === "global"
                        ? "Todas"
                        : emp.units.map((u) => getBusiness(u)?.name ?? u).join(", ") || "—"}
                    </td>
                    <td className="py-3 pr-4 text-complexo-muted">
                      {emp.schedule.daysOfWeek.map((d) => WEEK_DAYS.find((w) => w.id === d)?.label).join(" · ")}
                    </td>
                    <td className="py-3 pr-4 font-mono text-complexo-muted">
                      {emp.schedule.entryTime}–{emp.schedule.exitTime}
                    </td>
                    <td className="py-3 pr-0 text-complexo-muted">{emp.schedule.weeklyHours}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {subTab === "alteracoes" && (
        <SectionCard title="Alterações de escala e coberturas">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-complexo-muted">
                <tr className="border-b border-complexo-light/10">
                  <th className="py-3 pr-4 font-medium">Data</th>
                  <th className="py-3 pr-4 font-medium">Substituído</th>
                  <th className="py-3 pr-4 font-medium">Cobriu</th>
                  <th className="py-3 pr-4 font-medium">Motivo</th>
                  <th className="py-3 pr-4 font-medium">Previsto → Efetivo</th>
                  <th className="py-3 pr-0 font-medium">Horas extras</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-complexo-light/10">
                {scheduleChanges
                  .slice()
                  .sort((a, b) => (a.date < b.date ? 1 : -1))
                  .map((c) => (
                    <tr key={c.id}>
                      <td className="py-3 pr-4 whitespace-nowrap text-complexo-muted">{formatDate(c.date)}</td>
                      <td className="py-3 pr-4 font-medium text-complexo-light">
                        {employees.find((e) => e.id === c.substitutedEmployeeId)?.name ?? c.substitutedEmployeeId}
                      </td>
                      <td className="py-3 pr-4 text-complexo-light">
                        {employees.find((e) => e.id === c.coveringEmployeeId)?.name ?? c.coveringEmployeeId}
                      </td>
                      <td className="py-3 pr-4 text-complexo-muted">{c.reason}</td>
                      <td className="py-3 pr-4 whitespace-nowrap font-mono text-xs text-complexo-muted">
                        {c.expectedTime} → {c.actualTime}
                      </td>
                      <td className="py-3 pr-0">
                        {c.extraHoursGenerated > 0 ? (
                          <span className="font-semibold text-complexo-red">+{c.extraHoursGenerated}h</span>
                        ) : (
                          <span className="text-complexo-muted">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {subTab === "banco" && (
        <SectionCard title="Lançamentos do banco de horas">
          <div className="mb-4 flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as HourBankStatus | "Todos")}
              className="rounded-lg border border-complexo-light/10 bg-complexo-panel px-3 py-2 text-sm text-complexo-light focus:border-complexo-red focus:outline-none"
            >
              <option value="Todos">Todos os status</option>
              <option value="Disponível">Disponível</option>
              <option value="Utilizado como folga">Utilizado como folga</option>
              <option value="Pago em folha">Pago em folha</option>
              <option value="Cancelado">Cancelado</option>
            </select>
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="rounded-lg border border-complexo-light/10 bg-complexo-panel px-3 py-2 text-sm text-complexo-light focus:border-complexo-red focus:outline-none"
            >
              <option value="Todos">Todos os períodos</option>
              {availablePeriods.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-complexo-muted">
                <tr className="border-b border-complexo-light/10">
                  <th className="py-3 pr-4 font-medium">Data</th>
                  <th className="py-3 pr-4 font-medium">Funcionário</th>
                  <th className="py-3 pr-4 font-medium">Motivo</th>
                  <th className="py-3 pr-4 font-medium">Horas</th>
                  <th className="py-3 pr-4 font-medium">Aprovado por</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  {canApprove && <th className="py-3 pr-0 font-medium">Ações</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-complexo-light/10">
                {filteredEntries.map((entry) => {
                  const employee = employees.find((e) => e.id === entry.employeeId);
                  const approver = employees.find((e) => e.id === entry.approvedBy);
                  return (
                    <tr key={entry.id}>
                      <td className="py-3 pr-4 whitespace-nowrap text-complexo-muted">{formatDate(entry.date)}</td>
                      <td className="py-3 pr-4 font-medium text-complexo-light">{employee?.name ?? entry.employeeId}</td>
                      <td className="py-3 pr-4 max-w-xs text-complexo-muted">{entry.reason}</td>
                      <td className={`py-3 pr-4 font-mono font-semibold ${entry.hours < 0 ? "text-red-400" : "text-complexo-light"}`}>
                        {entry.hours > 0 ? "+" : ""}
                        {entry.hours}h
                      </td>
                      <td className="py-3 pr-4 text-complexo-muted">{approver?.name ?? "—"}</td>
                      <td className="py-3 pr-4">
                        <StatusBadge status={entry.status} tone={STATUS_TONE[entry.status]} />
                      </td>
                      {canApprove && (
                        <td className="py-3 pr-0">
                          {entry.status === "Disponível" && entry.hours > 0 ? (
                            <div className="flex gap-1.5">
                              <button
                                title="Compensar como folga"
                                onClick={() => handleResolve(entry.id, "Utilizado como folga")}
                                className="rounded-lg p-1.5 text-complexo-muted hover:bg-complexo-light/5 hover:text-emerald-500"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </button>
                              <button
                                title="Pagar em folha"
                                onClick={() => handleResolve(entry.id, "Pago em folha")}
                                className="rounded-lg p-1.5 text-complexo-muted hover:bg-complexo-light/5 hover:text-yellow-500"
                              >
                                <HandCoins className="h-4 w-4" />
                              </button>
                              <button
                                title="Cancelar"
                                onClick={() => handleResolve(entry.id, "Cancelado")}
                                className="rounded-lg p-1.5 text-complexo-muted hover:bg-complexo-light/5 hover:text-red-400"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-complexo-muted">—</span>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {subTab === "folha" && (
        <SectionCard title="Demonstrativo do período">
          <div className="mb-5 flex flex-wrap gap-3">
            <select
              value={payrollEmployeeId}
              onChange={(e) => setPayrollEmployeeId(e.target.value)}
              className="rounded-lg border border-complexo-light/10 bg-complexo-panel px-3 py-2 text-sm text-complexo-light focus:border-complexo-red focus:outline-none"
            >
              {employees.map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
            <input
              type="month"
              value={payrollPeriod}
              onChange={(e) => setPayrollPeriod(e.target.value)}
              className="rounded-lg border border-complexo-light/10 bg-complexo-panel px-3 py-2 text-sm text-complexo-light focus:border-complexo-red focus:outline-none"
            />
          </div>

          {statement && payrollEmployee && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MiniStat icon={CalendarClock} label="Horas previstas" value={`${statement.expectedHours}h`} />
              <MiniStat icon={Clock} label="Horas trabalhadas" value={`${statement.workedHours}h`} />
              <MiniStat icon={Timer} label="Horas extras no período" value={`${statement.extraHours}h`} />
              <MiniStat icon={PiggyBank} label="Saldo do banco de horas" value={`${statement.hourBankBalance}h`} />
              <MiniStat icon={HandCoins} label="Valor das horas extras" value={`R$${statement.extraHoursValue.toFixed(2)}`} />
              <MiniStat icon={ArrowLeftRight} label="Descontos (estrutura futura)" value={`R$${statement.discounts.toFixed(2)}`} />
              <MiniStat icon={ArrowLeftRight} label="Adicionais (estrutura futura)" value={`R$${statement.additions.toFixed(2)}`} />
              <div className="rounded-xl border border-complexo-red/30 bg-complexo-red/5 p-4 sm:col-span-2 lg:col-span-1">
                <p className="text-[10px] uppercase text-complexo-muted">Salário final</p>
                <p className="mt-1 font-rajdhani text-2xl font-bold text-complexo-red">R${statement.finalSalary.toFixed(2)}</p>
              </div>
            </div>
          )}
          <p className="mt-5 text-xs text-complexo-muted">
            Salário base R${payrollEmployee?.baseSalary.toFixed(2)} + horas extras pagas em folha no período, com adicional de 50% sobre o valor da hora (mínimo CLT). Descontos e adicionais têm a estrutura pronta e entram em vigor quando as regras forem definidas.
          </p>
        </SectionCard>
      )}
    </div>
  );
};

const MiniStat = ({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) => (
  <div className="rounded-xl border border-complexo-light/10 bg-complexo-panel p-4">
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-complexo-red/10 text-complexo-red">
      <Icon className="h-4 w-4" />
    </span>
    <p className="mt-2 text-[10px] uppercase text-complexo-muted">{label}</p>
    <p className="font-rajdhani text-lg font-bold text-complexo-light">{value}</p>
  </div>
);
