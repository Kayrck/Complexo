import { Download, TrendingUp, Users, DollarSign, CalendarCheck } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { SectionCard } from "../../../components/dashboard/SectionCard";

const PLANOS_VENDIDOS = [
  { name: "Essencial", value: 412, color: "#8b8b93" },
  { name: "Performance", value: 586, color: "#E10600" },
  { name: "Elite", value: 250, color: "#ff3b30" },
];

const REPORT_SUMMARIES = [
  { icon: Users, title: "Retenção de alunos", value: "91,4%", desc: "Alunos que renovaram o plano nos últimos 3 meses." },
  { icon: TrendingUp, title: "Crescimento da base", value: "+18,6%", desc: "Crescimento de alunos ativos em relação ao mesmo período do ano passado." },
  { icon: DollarSign, title: "Faturamento acumulado", value: "R$572k", desc: "Receita total do Grupo Complexo nos últimos 6 meses." },
  { icon: CalendarCheck, title: "Frequência média", value: "3,4x/semana", desc: "Média de check-ins por aluno ativo na Academia." },
];

export const RelatoriosTab = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Relatórios</h2>
      <p className="text-complexo-muted">Relatórios gerenciais para acompanhar a saúde do negócio.</p>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {REPORT_SUMMARIES.map((r) => (
        <SectionCard key={r.title}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-complexo-red/10 text-complexo-red">
                <r.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-complexo-muted">{r.title}</p>
                <p className="font-rajdhani text-2xl font-bold text-complexo-light">{r.value}</p>
              </div>
            </div>
            <button className="rounded-lg p-2 text-complexo-muted hover:bg-complexo-light/5 hover:text-complexo-light" aria-label="Exportar relatório">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-3 text-sm text-complexo-muted">{r.desc}</p>
        </SectionCard>
      ))}
    </div>

    <SectionCard
      title="Planos vendidos"
      action={
        <button className="flex items-center gap-1.5 rounded-lg border border-complexo-light/10 px-3 py-1.5 text-xs font-semibold text-complexo-muted hover:text-complexo-light">
          <Download className="h-3.5 w-3.5" /> Exportar
        </button>
      }
    >
      <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={PLANOS_VENDIDOS} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                {PLANOS_VENDIDOS.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} />
              <Legend wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          {PLANOS_VENDIDOS.map((p) => (
            <div key={p.name} className="flex items-center justify-between rounded-lg bg-complexo-panel px-4 py-3">
              <span className="flex items-center gap-2 text-sm text-complexo-light">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                {p.name}
              </span>
              <span className="font-semibold text-complexo-light">{p.value} alunos</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  </div>
);
