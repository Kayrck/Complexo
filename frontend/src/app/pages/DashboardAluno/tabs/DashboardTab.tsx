import {
  Flame,
  Dumbbell,
  Clock,
  CheckCircle2,
  Calendar,
  HeartPulse,
  Stethoscope,
  Target,
} from "lucide-react";
import { StatCard } from "../../../components/dashboard/StatCard";
import { SectionCard } from "../../../components/dashboard/SectionCard";

const UPCOMING = [
  { icon: Dumbbell, label: "Próximo treino", value: "Treino C — Pernas", when: "Hoje, 18:00" },
  { icon: Stethoscope, label: "Próxima avaliação física", value: "Avaliação trimestral", when: "12/08, 09:00" },
  { icon: HeartPulse, label: "Próxima consulta", value: "Nutricionista — Lara Maia", when: "15/08, 14:30" },
];

const GOALS = [
  { label: "Perder 5kg até outubro", progress: 62 },
  { label: "Treinar 4x por semana", progress: 85 },
  { label: "Aumentar carga no supino", progress: 40 },
];

export const DashboardTab = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Olá, Rafael</h2>
      <p className="text-complexo-muted">Aqui está o resumo da sua semana na Complexo.</p>
    </div>

    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatCard icon={Flame} label="Dias seguidos" value="12" suffix="dias" trend="+3" trendPositive />
      <StatCard icon={CheckCircle2} label="Frequência do mês" value="87" suffix="%" trend="+5%" trendPositive />
      <StatCard icon={Dumbbell} label="Treinos no mês" value="18" suffix="treinos" />
      <StatCard icon={Clock} label="Último check-in" value="Hoje" suffix="07:32" />
    </div>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <SectionCard title="Próximos compromissos" className="lg:col-span-2">
        <div className="divide-y divide-complexo-light/10">
          {UPCOMING.map((item) => (
            <div key={item.label} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-complexo-red/10 text-complexo-red">
                <item.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-wide text-complexo-muted">{item.label}</p>
                <p className="truncate font-semibold text-complexo-light">{item.value}</p>
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap text-sm text-complexo-muted">
                <Calendar className="h-3.5 w-3.5" />
                {item.when}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Metas em andamento">
        <div className="space-y-5">
          {GOALS.map((goal) => (
            <div key={goal.label}>
              <div className="mb-2 flex items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-2 font-medium text-complexo-light">
                  <Target className="h-3.5 w-3.5 text-complexo-red" />
                  {goal.label}
                </span>
                <span className="text-complexo-muted">{goal.progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-complexo-light/10">
                <div className="h-full rounded-full bg-complexo-red" style={{ width: `${goal.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>

    <SectionCard title="Evolução geral">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-complexo-light">
            Você perdeu <span className="font-bold text-complexo-red">4kg</span> e reduziu{" "}
            <span className="font-bold text-complexo-red">3%</span> de gordura nos últimos 6 meses.
          </p>
          <p className="mt-1 text-sm text-complexo-muted">Veja os gráficos completos na aba Evolução Física.</p>
        </div>
      </div>
    </SectionCard>
  </div>
);
