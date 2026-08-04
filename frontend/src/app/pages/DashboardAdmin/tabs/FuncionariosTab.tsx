import { useMemo, useState } from "react";
import {
  Search,
  UserPlus,
  X,
  Mail,
  Phone,
  Fingerprint,
  Calendar,
  Clock,
  Wallet,
  UserCog,
  ShieldAlert,
  KeyRound,
  RotateCcw,
  History,
} from "lucide-react";
import { StatCard } from "../../../components/dashboard/StatCard";
import { SectionCard } from "../../../components/dashboard/SectionCard";
import { StatusBadge } from "../../../components/dashboard/StatusBadge";
import { useAppContext } from "../../../context";
import { BUSINESSES, getBusiness } from "../../../data";
import {
  ALL_PERMISSIONS,
  PERMISSION_LABELS,
  ROLES,
  getRole,
  resolvePermissions,
  type PermissionKey,
} from "../../../rbac";
import { WEEK_DAYS, type Employee, type EmployeeStatus, type WeekDay } from "../../../hr";
import { AUDIT_ACTIONS, type AuditSeverity } from "../../../auditLog";

const STATUS_TONE: Record<EmployeeStatus, "positive" | "warning" | "negative"> = {
  Ativo: "positive",
  Afastado: "warning",
  Desligado: "negative",
};

const SEVERITY_LABEL: Record<AuditSeverity, string> = {
  info: "Informativo",
  warning: "Atenção",
  critical: "Crítico",
};

const SEVERITY_TONE: Record<AuditSeverity, "positive" | "warning" | "negative"> = {
  info: "positive",
  warning: "warning",
  critical: "negative",
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const formatDate = (isoDate: string) => {
  const [y, m, d] = isoDate.split("T")[0].split("-").map(Number);
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
};

const formatDateTime = (isoDate: string) =>
  new Date(isoDate).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Fortaleza",
  });

const unitsLabel = (employee: Employee) => {
  const role = getRole(employee.roleId);
  if (role?.scope === "global") return "Todas as unidades";
  if (employee.units.length === 0) return "Nenhuma unidade atribuída";
  return employee.units.map((id) => getBusiness(id)?.name ?? id).join(", ");
};

const emptyForm = {
  name: "",
  cpf: "",
  phone: "",
  email: "",
  roleId: ROLES[0].id,
  units: [] as string[],
  daysOfWeek: ["seg", "ter", "qua", "qui", "sex"] as WeekDay[],
  entryTime: "08:00",
  exitTime: "17:00",
  weeklyHours: "40",
  baseSalary: "",
  hourlyRate: "",
  admissionDate: new Date().toISOString().slice(0, 10),
  status: "Ativo" as EmployeeStatus,
};

export const FuncionariosTab = () => {
  const { employees, currentEmployee, addEmployee, updateEmployeePermissions, auditLog, logAudit } = useAppContext();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(employees[0]?.id ?? "");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  // Só o Admin Master gerencia cadastro e permissões de outros usuários —
  // os demais papéis, mesmo com acesso a esta aba, só visualizam.
  const canManageEmployees = currentEmployee?.roleId === "admin_master";

  const filtered = useMemo(
    () => employees.filter((e) => e.name.toLowerCase().includes(query.toLowerCase())),
    [employees, query],
  );
  const selected = employees.find((e) => e.id === selectedId) ?? employees[0];
  const selectedRole = selected ? getRole(selected.roleId) : undefined;

  const deniedLast7Days = useMemo(() => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return auditLog.filter((a) => a.action === AUDIT_ACTIONS.ACCESS_DENIED && new Date(a.timestamp).getTime() >= weekAgo)
      .length;
  }, [auditLog]);

  const customPermissionCount = useMemo(
    () => employees.filter((e) => Object.keys(e.permissionOverrides).length > 0).length,
    [employees],
  );

  const handleTogglePermission = (key: PermissionKey) => {
    if (!canManageEmployees || !selected) return;
    const currentlyGranted = resolvePermissions(selected).includes(key);
    const nextOverrides = { ...selected.permissionOverrides, [key]: !currentlyGranted };
    updateEmployeePermissions(selected.id, nextOverrides);
    logAudit({
      actorId: currentEmployee?.id ?? null,
      actorName: currentEmployee?.name ?? "Sessão não autenticada",
      action: AUDIT_ACTIONS.PERMISSION_CHANGE,
      details: `Alterou a permissão "${PERMISSION_LABELS[key]}" de ${selected.name} para ${!currentlyGranted ? "concedida" : "revogada"}.`,
      severity: "warning",
    });
  };

  const handleResetPermissions = () => {
    if (!canManageEmployees || !selected) return;
    updateEmployeePermissions(selected.id, {});
    logAudit({
      actorId: currentEmployee?.id ?? null,
      actorName: currentEmployee?.name ?? "Sessão não autenticada",
      action: AUDIT_ACTIONS.PERMISSION_CHANGE,
      details: `Restaurou as permissões de ${selected.name} para o padrão do papel "${selectedRole?.name ?? selected.roleId}".`,
      severity: "warning",
    });
  };

  const toggleFormUnit = (unitId: string) => {
    setForm((f) => ({
      ...f,
      units: f.units.includes(unitId) ? f.units.filter((u) => u !== unitId) : [...f.units, unitId],
    }));
  };

  const toggleFormDay = (day: WeekDay) => {
    setForm((f) => ({
      ...f,
      daysOfWeek: f.daysOfWeek.includes(day) ? f.daysOfWeek.filter((d) => d !== day) : [...f.daysOfWeek, day],
    }));
  };

  const formRole = getRole(form.roleId);
  const suggestedHourlyRate =
    Number(form.baseSalary) > 0 && Number(form.weeklyHours) > 0
      ? Number(form.baseSalary) / (Number(form.weeklyHours) * 4.345)
      : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.cpf.trim() || !form.email.trim()) return;

    const id = `${slugify(form.name)}-${Date.now().toString(36).slice(-4)}`;
    const newEmployee: Employee = {
      id,
      name: form.name.trim(),
      cpf: form.cpf.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      roleId: form.roleId,
      units: formRole?.scope === "global" ? [] : form.units,
      schedule: {
        weeklyHours: Number(form.weeklyHours) || 0,
        entryTime: form.entryTime,
        exitTime: form.exitTime,
        daysOfWeek: form.daysOfWeek,
      },
      baseSalary: Number(form.baseSalary) || 0,
      hourlyRate: Number(form.hourlyRate) || Math.round(suggestedHourlyRate * 100) / 100,
      admissionDate: form.admissionDate,
      status: form.status,
      permissionOverrides: {},
    };

    addEmployee(newEmployee);
    logAudit({
      actorId: currentEmployee?.id ?? null,
      actorName: currentEmployee?.name ?? "Sessão não autenticada",
      action: AUDIT_ACTIONS.EMPLOYEE_CREATED,
      details: `Cadastrou ${newEmployee.name} (${formRole?.name ?? form.roleId}).`,
      severity: "info",
    });
    setSelectedId(id);
    setForm(emptyForm);
    setShowForm(false);
  };

  if (!selected) {
    return <p className="text-complexo-muted">Nenhum funcionário cadastrado ainda.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Funcionários e permissões</h2>
          <p className="text-complexo-muted">Cadastro de equipe, papéis e controle de acesso granular por módulo.</p>
        </div>
        {canManageEmployees && (
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 rounded-lg bg-complexo-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-complexo-red-bright"
          >
            {showForm ? <X className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
            {showForm ? "Cancelar" : "Cadastrar funcionário"}
          </button>
        )}
      </div>

      {!canManageEmployees && (
        <div className="flex items-center gap-2.5 rounded-xl border border-dashed border-complexo-light/15 bg-complexo-surface px-4 py-3 text-sm text-complexo-muted">
          <ShieldAlert className="h-4 w-4 shrink-0 text-complexo-red" />
          Apenas o Admin Master pode cadastrar funcionários e alterar permissões. Você está em modo de visualização.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={UserCog} label="Funcionários ativos" value={`${employees.filter((e) => e.status === "Ativo").length}`} />
        <StatCard icon={KeyRound} label="Permissões personalizadas" value={`${customPermissionCount}`} />
        <StatCard icon={ShieldAlert} label="Tentativas negadas (7 dias)" value={`${deniedLast7Days}`} />
        <StatCard icon={History} label="Eventos no log" value={`${auditLog.length}`} />
      </div>

      {showForm && canManageEmployees && (
        <SectionCard title="Cadastrar funcionário">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Nome completo">
                <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Nome do funcionário" className={inputCls} />
              </Field>
              <Field label="CPF">
                <input required value={form.cpf} onChange={(e) => setForm((f) => ({ ...f, cpf: e.target.value }))} placeholder="000.000.000-00" className={inputCls} />
              </Field>
              <Field label="Telefone">
                <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="(85) 90000-0000" className={inputCls} />
              </Field>
              <Field label="E-mail">
                <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="nome@complexo.com" className={inputCls} />
              </Field>
              <Field label="Cargo / papel">
                <select value={form.roleId} onChange={(e) => setForm((f) => ({ ...f, roleId: e.target.value }))} className={inputCls}>
                  {ROLES.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Data de admissão">
                <input required type="date" value={form.admissionDate} onChange={(e) => setForm((f) => ({ ...f, admissionDate: e.target.value }))} className={inputCls} />
              </Field>
              <Field label="Salário base (R$)">
                <input required type="number" min={0} step="0.01" value={form.baseSalary} onChange={(e) => setForm((f) => ({ ...f, baseSalary: e.target.value }))} placeholder="2500" className={inputCls} />
              </Field>
              <Field label="Valor da hora (R$)">
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.hourlyRate}
                  onChange={(e) => setForm((f) => ({ ...f, hourlyRate: e.target.value }))}
                  placeholder={suggestedHourlyRate ? suggestedHourlyRate.toFixed(2) : "0.00"}
                  className={inputCls}
                />
                {suggestedHourlyRate > 0 && (
                  <span className="mt-1 block text-xs text-complexo-muted">
                    Sugestão com base no salário e carga horária: R${suggestedHourlyRate.toFixed(2)}
                  </span>
                )}
              </Field>
              <Field label="Status">
                <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as EmployeeStatus }))} className={inputCls}>
                  <option value="Ativo">Ativo</option>
                  <option value="Afastado">Afastado</option>
                  <option value="Desligado">Desligado</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Carga horária semanal">
                <input type="number" min={0} max={44} value={form.weeklyHours} onChange={(e) => setForm((f) => ({ ...f, weeklyHours: e.target.value }))} className={inputCls} />
              </Field>
              <Field label="Entrada">
                <input type="time" value={form.entryTime} onChange={(e) => setForm((f) => ({ ...f, entryTime: e.target.value }))} className={inputCls} />
              </Field>
              <Field label="Saída">
                <input type="time" value={form.exitTime} onChange={(e) => setForm((f) => ({ ...f, exitTime: e.target.value }))} className={inputCls} />
              </Field>
            </div>

            <Field label="Dias de trabalho">
              <div className="flex flex-wrap gap-2">
                {WEEK_DAYS.map((d) => (
                  <button
                    type="button"
                    key={d.id}
                    onClick={() => toggleFormDay(d.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      form.daysOfWeek.includes(d.id)
                        ? "border-complexo-red bg-complexo-red/10 text-complexo-red"
                        : "border-complexo-light/10 text-complexo-muted hover:text-complexo-light"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </Field>

            {formRole?.scope === "unidade" ? (
              <Field label="Unidade(s)">
                <div className="flex flex-wrap gap-2">
                  {BUSINESSES.map((b) => (
                    <button
                      type="button"
                      key={b.id}
                      onClick={() => toggleFormUnit(b.id)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        form.units.includes(b.id)
                          ? "border-complexo-red bg-complexo-red/10 text-complexo-red"
                          : "border-complexo-light/10 text-complexo-muted hover:text-complexo-light"
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </Field>
            ) : (
              <p className="text-xs text-complexo-muted">
                O papel "{formRole?.name}" tem escopo global — acesso automático a todas as unidades.
              </p>
            )}

            <div className="flex justify-end">
              <button type="submit" className="rounded-full bg-complexo-red px-7 py-3 font-semibold text-white hover:bg-complexo-red-bright">
                Cadastrar funcionário
              </button>
            </div>
          </form>
        </SectionCard>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <SectionCard className="xl:col-span-2" title="Todos os funcionários">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-complexo-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome..."
              className="h-10 w-full rounded-lg border border-complexo-light/10 bg-complexo-panel pl-9 pr-4 text-sm text-complexo-light placeholder:text-complexo-muted focus:border-complexo-red focus:outline-none"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-complexo-muted">
                <tr className="border-b border-complexo-light/10">
                  <th className="py-3 pr-4 font-medium">Funcionário</th>
                  <th className="py-3 pr-4 font-medium">Papel</th>
                  <th className="py-3 pr-4 font-medium">Unidade(s)</th>
                  <th className="py-3 pr-0 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-complexo-light/10">
                {filtered.map((emp) => (
                  <tr
                    key={emp.id}
                    onClick={() => setSelectedId(emp.id)}
                    className={`cursor-pointer transition-colors hover:bg-complexo-light/[0.03] ${
                      selectedId === emp.id ? "bg-complexo-red/5" : ""
                    }`}
                  >
                    <td className="py-3 pr-4">
                      <p className="font-medium text-complexo-light">{emp.name}</p>
                      <p className="text-xs text-complexo-muted">{emp.email}</p>
                    </td>
                    <td className="py-3 pr-4 text-complexo-muted">{getRole(emp.roleId)?.name ?? emp.roleId}</td>
                    <td className="py-3 pr-4 text-complexo-muted">{unitsLabel(emp)}</td>
                    <td className="py-3 pr-0">
                      <StatusBadge status={emp.status} tone={STATUS_TONE[emp.status]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Ficha do funcionário">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-rajdhani text-2xl font-bold uppercase text-complexo-light">{selected.name}</h3>
                <p className="text-sm text-complexo-red">{selectedRole?.name ?? selected.roleId}</p>
              </div>
              <StatusBadge status={selected.status} tone={STATUS_TONE[selected.status]} />
            </div>

            <div className="mt-4 flex flex-col gap-1.5 text-xs text-complexo-muted">
              <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {selected.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {selected.phone || "Não informado"}</span>
              <span className="flex items-center gap-1.5"><Fingerprint className="h-3 w-3" /> {selected.cpf}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> Admissão em {formatDate(selected.admissionDate)}</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> {selected.schedule.entryTime}–{selected.schedule.exitTime} ({selected.schedule.weeklyHours}h/semana)
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-complexo-panel p-3">
                <p className="text-[10px] uppercase text-complexo-muted">Salário base</p>
                <p className="flex items-center gap-1.5 font-semibold text-complexo-light">
                  <Wallet className="h-3.5 w-3.5 text-complexo-red" /> R${selected.baseSalary.toLocaleString("pt-BR")}
                </p>
              </div>
              <div className="rounded-lg bg-complexo-panel p-3">
                <p className="text-[10px] uppercase text-complexo-muted">Unidade(s)</p>
                <p className="font-semibold text-complexo-light">{unitsLabel(selected)}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-widest text-complexo-muted">Permissões</p>
              {canManageEmployees && (
                <button
                  onClick={handleResetPermissions}
                  className="flex items-center gap-1.5 text-xs font-semibold text-complexo-muted hover:text-complexo-red"
                >
                  <RotateCcw className="h-3 w-3" /> Restaurar padrão do papel
                </button>
              )}
            </div>
            <div className="mt-3 space-y-1.5">
              {ALL_PERMISSIONS.map((key) => {
                const granted = resolvePermissions(selected).includes(key);
                const isOverride = selected.permissionOverrides[key] !== undefined;
                return (
                  <label
                    key={key}
                    className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm ${
                      canManageEmployees ? "cursor-pointer hover:bg-complexo-light/5" : ""
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={granted}
                        disabled={!canManageEmployees}
                        onChange={() => handleTogglePermission(key)}
                        className="h-4 w-4 rounded border-complexo-light/20 accent-complexo-red disabled:opacity-50"
                      />
                      <span className={granted ? "text-complexo-light" : "text-complexo-muted"}>{PERMISSION_LABELS[key]}</span>
                    </span>
                    {isOverride && (
                      <span className="rounded-full bg-complexo-red/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-complexo-red">
                        Personalizado
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Logs de auditoria">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-complexo-muted">
              <tr className="border-b border-complexo-light/10">
                <th className="py-3 pr-4 font-medium">Quando</th>
                <th className="py-3 pr-4 font-medium">Quem</th>
                <th className="py-3 pr-4 font-medium">Detalhes</th>
                <th className="py-3 pr-0 font-medium">Severidade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-complexo-light/10">
              {auditLog.slice(0, 25).map((entry) => (
                <tr key={entry.id}>
                  <td className="py-3 pr-4 whitespace-nowrap font-mono text-xs text-complexo-muted">{formatDateTime(entry.timestamp)}</td>
                  <td className="py-3 pr-4 font-medium text-complexo-light">{entry.actorName}</td>
                  <td className="py-3 pr-4 text-complexo-muted">{entry.details}</td>
                  <td className="py-3 pr-0">
                    <StatusBadge status={SEVERITY_LABEL[entry.severity]} tone={SEVERITY_TONE[entry.severity]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
};

const inputCls =
  "w-full rounded-xl border border-complexo-light/10 bg-complexo-panel px-4 py-2.5 text-complexo-light placeholder:text-complexo-muted/60 focus:border-complexo-red focus:outline-none";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-complexo-muted">{label}</span>
    {children}
  </label>
);
