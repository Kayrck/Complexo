import { TrendingUp, TrendingDown, Wallet, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { StatCard } from "../../../components/dashboard/StatCard";
import { SectionCard } from "../../../components/dashboard/SectionCard";

const FLUXO = [
  { month: "Mar", receitas: 67200, despesas: 41000 },
  { month: "Abr", receitas: 70600, despesas: 42500 },
  { month: "Mai", receitas: 78100, despesas: 44200 },
  { month: "Jun", receitas: 86800, despesas: 46800 },
  { month: "Jul", receitas: 89400, despesas: 47600 },
  { month: "Ago", receitas: 95400, despesas: 49100 },
];

const INDICADORES = [
  { label: "Ticket médio por aluno", value: "R$168" },
  { label: "LTV médio (12 meses)", value: "R$2.016" },
  { label: "Margem líquida", value: "48,5%" },
  { label: "Custo de aquisição (CAC)", value: "R$62" },
];

export const FinanceiroTab = () => {
  const latest = FLUXO[FLUXO.length - 1];
  const lucro = latest.receitas - latest.despesas;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Financeiro</h2>
        <p className="text-complexo-muted">Visão consolidada de receitas, despesas e inadimplência.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={TrendingUp} label="Receitas do mês" value={`R$${(latest.receitas / 1000).toFixed(1)}k`} trend="+6.7%" trendPositive />
        <StatCard icon={TrendingDown} label="Despesas do mês" value={`R$${(latest.despesas / 1000).toFixed(1)}k`} trend="+3.2%" />
        <StatCard icon={Wallet} label="Lucro líquido" value={`R$${(lucro / 1000).toFixed(1)}k`} trend="+9.8%" trendPositive />
        <StatCard icon={AlertTriangle} label="Inadimplência" value="2.4" suffix="%" trend="-0.5%" trendPositive />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <SectionCard title="Fluxo de caixa" className="xl:col-span-2">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={FLUXO} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }} />
                <Line type="monotone" dataKey="receitas" name="Receitas" stroke="#16a34a" strokeWidth={3} dot={{ fill: "#16a34a", r: 4 }} />
                <Line type="monotone" dataKey="despesas" name="Despesas" stroke="#E10600" strokeWidth={3} dot={{ fill: "#E10600", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Indicadores financeiros">
          <div className="space-y-4">
            {INDICADORES.map((i) => (
              <div key={i.label} className="flex items-center justify-between border-b border-complexo-light/5 pb-4 last:border-0 last:pb-0">
                <span className="text-sm text-complexo-muted">{i.label}</span>
                <span className="font-rajdhani text-lg font-bold text-complexo-light">{i.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
};
