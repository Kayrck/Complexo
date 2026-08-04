import { useState } from "react";
import { Calendar, TrendingUp, MessageSquare, Link2, CheckCircle2 } from "lucide-react";
import { SectionCard } from "../../../components/dashboard/SectionCard";
import { StatCard } from "../../../components/dashboard/StatCard";
import { Users, CalendarCheck, Percent } from "lucide-react";

interface Paciente {
  id: string;
  name: string;
  plan: string;
  lastConsult: string;
  nextConsult: string;
  adherence: number;
  notes: string;
}

const PACIENTES: Paciente[] = [
  { id: "1", name: "Rafael Lima", plan: "Método Nutri Complexo", lastConsult: "18/07/2026", nextConsult: "15/08/2026", adherence: 88, notes: "Boa adesão. Ajustar jantar para incluir mais fibras." },
  { id: "2", name: "Camila Souza", plan: "Consulta Nutri Complexo", lastConsult: "22/07/2026", nextConsult: "19/08/2026", adherence: 74, notes: "Dificuldade em manter hidratação nos finais de semana." },
  { id: "3", name: "Diego Martins", plan: "Método Nutri Complexo", lastConsult: "05/08/2026", nextConsult: "02/09/2026", adherence: 95, notes: "Excelente evolução. Manter plano atual." },
];

export const NutricionistaTab = () => {
  const [selectedId, setSelectedId] = useState(PACIENTES[0].id);
  const selected = PACIENTES.find((p) => p.id === selectedId)!;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Gestão da nutricionista</h2>
        <p className="text-complexo-muted">Pacientes e agenda de Lara Maia — Nutri Complexo.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={Users} label="Pacientes ativos" value={`${PACIENTES.length}`} />
        <StatCard icon={CalendarCheck} label="Consultas no mês" value="64" />
        <StatCard icon={Percent} label="Adesão média" value="86" suffix="%" trend="+4%" trendPositive />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <SectionCard title="Pacientes" className="xl:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-complexo-muted">
                <tr className="border-b border-complexo-light/10">
                  <th className="py-3 pr-4 font-medium">Paciente</th>
                  <th className="py-3 pr-4 font-medium">Plano</th>
                  <th className="py-3 pr-4 font-medium">Próxima consulta</th>
                  <th className="py-3 pr-0 font-medium">Adesão</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-complexo-light/10">
                {PACIENTES.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`cursor-pointer transition-colors hover:bg-complexo-light/[0.03] ${
                      selectedId === p.id ? "bg-complexo-red/5" : ""
                    }`}
                  >
                    <td className="py-3 pr-4 font-medium text-complexo-light">{p.name}</td>
                    <td className="py-3 pr-4 text-complexo-muted">{p.plan}</td>
                    <td className="py-3 pr-4 text-complexo-muted">{p.nextConsult}</td>
                    <td className="py-3 pr-0 text-complexo-light">{p.adherence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-xl border border-dashed border-complexo-light/15 bg-complexo-panel p-4">
            <Link2 className="mt-0.5 h-4 w-4 shrink-0 text-complexo-muted" />
            <div>
              <p className="text-sm font-semibold text-complexo-light">Integração com o WebDiet</p>
              <p className="text-xs text-complexo-muted">
                Estrutura pronta para sincronizar planos alimentares, diário de refeições e evolução
                diretamente da conta WebDiet da Lara — ativação em breve.
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Histórico do paciente">
          <h3 className="font-rajdhani text-2xl font-bold uppercase text-complexo-light">{selected.name}</h3>
          <p className="text-sm text-complexo-muted">{selected.plan}</p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-complexo-panel p-3">
              <p className="flex items-center gap-1.5 text-[10px] uppercase text-complexo-muted">
                <Calendar className="h-3 w-3" /> Última consulta
              </p>
              <p className="mt-1 font-semibold text-complexo-light">{selected.lastConsult}</p>
            </div>
            <div className="rounded-lg bg-complexo-panel p-3">
              <p className="flex items-center gap-1.5 text-[10px] uppercase text-complexo-muted">
                <CalendarCheck className="h-3 w-3" /> Próxima consulta
              </p>
              <p className="mt-1 font-semibold text-complexo-light">{selected.nextConsult}</p>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-complexo-panel p-3">
            <p className="flex items-center gap-1.5 text-[10px] uppercase text-complexo-muted">
              <TrendingUp className="h-3 w-3" /> Adesão ao plano
            </p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-complexo-light/10">
              <div className="h-full rounded-full bg-complexo-red" style={{ width: `${selected.adherence}%` }} />
            </div>
            <p className="mt-1.5 text-xs text-complexo-muted">{selected.adherence}% de adesão nas últimas 4 semanas</p>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-lg bg-complexo-light/5 p-3 text-sm text-complexo-light/85">
            <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-complexo-red" />
            {selected.notes}
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-500">
            <CheckCircle2 className="h-3.5 w-3.5" /> Plano alimentar atualizado
          </div>
        </SectionCard>
      </div>
    </div>
  );
};
