import { Users, UserPlus, UserMinus, AlertTriangle, DollarSign, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { StatCard } from "../../../components/dashboard/StatCard";
import { SectionCard } from "../../../components/dashboard/SectionCard";

const REVENUE_DATA = [
  { month: "Mar", mensalidades: 48000, suplementos: 14000, nutricao: 5200 },
  { month: "Abr", mensalidades: 50000, suplementos: 15000, nutricao: 5600 },
  { month: "Mai", mensalidades: 54000, suplementos: 18000, nutricao: 6100 },
  { month: "Jun", mensalidades: 58000, suplementos: 22000, nutricao: 6800 },
  { month: "Jul", mensalidades: 61000, suplementos: 21000, nutricao: 7400 },
  { month: "Ago", mensalidades: 63500, suplementos: 24000, nutricao: 7900 },
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

const ACTIVITY_STATS = [
  { label: "Consultas de nutrição no mês", value: "64" },
  { label: "Aulas de Pilates no mês", value: "212" },
  { label: "Vendas da loja no mês", value: "R$24.000" },
];

export const OverviewTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <StatCard icon={Users} label="Alunos ativos" value="1.248" trend="+4.2%" trendPositive />
      <StatCard icon={UserPlus} label="Novos alunos" value="86" suffix="/mês" trend="+12%" trendPositive />
      <StatCard icon={UserMinus} label="Cancelamentos" value="14" suffix="/mês" trend="-3" trendPositive />
      <StatCard icon={AlertTriangle} label="Inadimplência" value="2.4" suffix="%" trend="-0.5%" trendPositive />
      <StatCard icon={DollarSign} label="Faturamento" value="95.4k" suffix="/mês" trend="+9.1%" trendPositive />
      <StatCard icon={CheckCircle2} label="Check-ins" value="3.9k" suffix="/mês" trend="+6%" trendPositive />
    </div>

    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <SectionCard title="Faturamento por categoria" className="xl:col-span-2">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
                itemStyle={{ color: "#fff" }}
              />
              <Bar dataKey="mensalidades" name="Mensalidades" fill="#E10600" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="suplementos" name="Loja" fill="#2b6fff" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="nutricao" name="Nutrição" fill="#16a34a" radius={[4, 4, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="Atividade do mês">
        <div className="space-y-5">
          {ACTIVITY_STATS.map((a) => (
            <div key={a.label}>
              <p className="text-xs text-complexo-muted">{a.label}</p>
              <p className="mt-1 font-rajdhani text-2xl font-bold text-complexo-light">{a.value}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>

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
  </div>
);
