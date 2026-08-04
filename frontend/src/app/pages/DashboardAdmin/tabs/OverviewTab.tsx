import {
  Users,
  UserPlus,
  UserMinus,
  AlertTriangle,
  DollarSign,
  CheckCircle2,
  Target,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "../../../components/Reveal";
import { SectionCard } from "../../../components/dashboard/SectionCard";
import { ClippedAreaChart } from "../../../components/dashboard/ClippedAreaChart";

const FATURAMENTO_DATA = [
  { month: "Mar", total: 67200 },
  { month: "Abr", total: 70600 },
  { month: "Mai", total: 78100 },
  { month: "Jun", total: 86800 },
  { month: "Jul", total: 89400 },
  { month: "Ago", total: 95400 },
];

const KPIS = [
  { icon: Users, label: "Alunos ativos", value: "1.248", change: "+4.2%", status: "up" as const },
  { icon: UserPlus, label: "Novos alunos", value: "86", change: "+12%", status: "up" as const },
  { icon: UserMinus, label: "Cancelamentos", value: "14", change: "-3", status: "down" as const },
  { icon: AlertTriangle, label: "Inadimplência", value: "2.4%", change: "-0.5%", status: "down" as const },
  { icon: DollarSign, label: "Faturamento", value: "R$95,4k", change: "+9.1%", status: "up" as const },
  { icon: CheckCircle2, label: "Check-ins", value: "3,9k", change: "+6%", status: "up" as const },
];

const OCUPACAO = [
  { hour: "06h–08h", value: 92 },
  { hour: "08h–10h", value: 58 },
  { hour: "10h–12h", value: 34 },
  { hour: "12h–14h", value: 46 },
  { hour: "14h–16h", value: 40 },
  { hour: "16h–18h", value: 71 },
  { hour: "18h–20h", value: 97 },
  { hour: "20h–22h", value: 63 },
];

export const OverviewTab = () => (
  <div className="flex flex-col gap-6">
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Hero chart */}
      <Reveal className="lg:col-span-2">
        <SectionCard
          title="Faturamento"
          action={<span className="font-mono text-xs uppercase tracking-widest text-complexo-muted">Últimos 6 meses</span>}
        >
          <ClippedAreaChart
            data={FATURAMENTO_DATA}
            xKey="month"
            dataKey="total"
            color="#E10600"
            valueFormatter={(v) => `${Math.round(v / 1000)}k`}
          />
        </SectionCard>
      </Reveal>

      {/* Goal + growth column */}
      <div className="flex flex-col gap-4">
        <Reveal delay={0.06}>
          <div className="flex h-full flex-col justify-between rounded-2xl border border-complexo-red/30 bg-[linear-gradient(150deg,#2a0705_0%,#0a0705_100%)] p-6 text-white shadow-lg">
            <div>
              <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-complexo-red">
                Meta principal
              </p>
              <h4 className="flex items-center gap-2 font-rajdhani text-xl font-bold uppercase tracking-tight">
                <Target className="h-5 w-5 text-complexo-red" /> Retenção de alunos
              </h4>
            </div>
            <div className="mt-8">
              <div className="mb-2 flex items-end justify-between">
                <span className="font-rajdhani text-3xl font-semibold tracking-tighter">91%</span>
                <span className="mb-1 text-xs font-medium text-white/50">Meta: 95%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[91%] rounded-full bg-white" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <SectionCard className="h-full">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg border border-complexo-light/10 bg-complexo-panel">
                <TrendingUp className="h-4 w-4 text-complexo-red" />
              </div>
              <h4 className="font-rajdhani text-lg font-bold uppercase text-complexo-light">Crescimento de alunos</h4>
            </div>
            <p className="text-sm text-complexo-muted">
              A base ativa cresceu <span className="font-semibold text-complexo-light">18,6%</span> em relação
              ao mesmo período do ano passado.
            </p>
          </SectionCard>
        </Reveal>
      </div>
    </div>

    {/* KPI row */}
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {KPIS.map((kpi, i) => (
        <Reveal key={kpi.label} delay={0.05 * i}>
          <div
            className={`h-full rounded-2xl border bg-complexo-surface p-5 transition-colors ${
              kpi.status === "up" ? "border-complexo-light/10 hover:border-emerald-500/40" : "border-complexo-light/10 hover:border-red-400/40"
            }`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-complexo-red/10 text-complexo-red">
              <kpi.icon className="h-4 w-4" />
            </span>
            <p className="mb-1.5 mt-3 text-[11px] font-bold uppercase tracking-widest text-complexo-muted">
              {kpi.label}
            </p>
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-rajdhani text-2xl font-black tracking-tight text-complexo-light">{kpi.value}</p>
              <span
                className={`rounded px-1.5 py-0.5 text-xs font-bold ${
                  kpi.status === "up" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-400/10 text-red-400"
                }`}
              >
                {kpi.change}
              </span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>

    {/* Occupancy */}
    <Reveal>
      <SectionCard title="Ocupação por horário — Academia">
        <div className="space-y-3">
          {OCUPACAO.map((slot) => (
            <div key={slot.hour} className="flex items-center gap-4">
              <span className="w-20 shrink-0 font-mono text-xs text-complexo-muted">{slot.hour}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-complexo-light/10">
                <div
                  className={`h-full rounded-full ${slot.value > 80 ? "bg-complexo-red" : "bg-complexo-red/50"}`}
                  style={{ width: `${slot.value}%` }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-sm font-semibold text-complexo-light">{slot.value}%</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </Reveal>
  </div>
);
