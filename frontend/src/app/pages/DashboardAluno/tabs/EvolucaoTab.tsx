import { useState } from "react";
import { Scale, Percent, Ruler, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { StatCard } from "../../../components/dashboard/StatCard";
import { SectionCard } from "../../../components/dashboard/SectionCard";

const EVOLUTION_DATA = [
  { month: "Mar", weight: 82, bodyFat: 18, muscle: 34 },
  { month: "Abr", weight: 81, bodyFat: 17, muscle: 34.5 },
  { month: "Mai", weight: 80, bodyFat: 16.2, muscle: 35 },
  { month: "Jun", weight: 79, bodyFat: 15, muscle: 35.6 },
  { month: "Jul", weight: 78.2, bodyFat: 13.8, muscle: 36.1 },
  { month: "Ago", weight: 78, bodyFat: 13, muscle: 36.4 },
];

const CIRCUNFERENCIAS = [
  { label: "Braço", current: "38cm", previous: "36cm", delta: "+2cm" },
  { label: "Cintura", current: "84cm", previous: "89cm", delta: "-5cm" },
  { label: "Quadril", current: "97cm", previous: "99cm", delta: "-2cm" },
  { label: "Coxa", current: "58cm", previous: "56cm", delta: "+2cm" },
];

export const EvolucaoTab = () => {
  const [range, setRange] = useState("6m");
  const latest = EVOLUTION_DATA[EVOLUTION_DATA.length - 1];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Evolução física</h2>
        <p className="text-complexo-muted">Seu progresso com base nas avaliações físicas realizadas na Complexo.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={Scale} label="Peso atual" value={`${latest.weight}`} suffix="kg" trend="-4kg" trendPositive />
        <StatCard icon={Activity} label="IMC" value="24.1" suffix="normal" trend="-1.2" trendPositive />
        <StatCard icon={Percent} label="Gordura corporal" value={`${latest.bodyFat}`} suffix="%" trend="-5%" trendPositive />
        <StatCard icon={Ruler} label="Massa muscular" value={`${latest.muscle}`} suffix="kg" trend="+2.4kg" trendPositive />
      </div>

      <SectionCard
        title="Peso, gordura e massa muscular"
        action={
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="rounded-lg border border-complexo-light/10 bg-complexo-panel px-3 py-1.5 text-sm text-complexo-light focus:outline-none"
          >
            <option value="6m">Últimos 6 meses</option>
            <option value="1y">Este ano</option>
          </select>
        }
      >
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={EVOLUTION_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }} />
              <Line type="monotone" dataKey="weight" name="Peso (kg)" stroke="#E10600" strokeWidth={3} dot={{ fill: "#E10600", strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="bodyFat" name="Gordura (%)" stroke="#2b6fff" strokeWidth={3} dot={{ fill: "#2b6fff", strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="muscle" name="Massa muscular (kg)" stroke="#16a34a" strokeWidth={3} dot={{ fill: "#16a34a", strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="Circunferências">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CIRCUNFERENCIAS.map((c) => (
            <div key={c.label} className="rounded-xl border border-complexo-light/10 bg-complexo-panel p-4">
              <p className="text-xs uppercase tracking-wide text-complexo-muted">{c.label}</p>
              <p className="mt-1 font-rajdhani text-2xl font-bold text-complexo-light">{c.current}</p>
              <p className="mt-1 text-xs text-complexo-muted">
                Anterior: {c.previous} ·{" "}
                <span className={c.delta.startsWith("-") ? "text-emerald-500" : "text-complexo-red"}>{c.delta}</span>
              </p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};
