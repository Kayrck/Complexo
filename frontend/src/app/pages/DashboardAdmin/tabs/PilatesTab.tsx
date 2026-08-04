import { Users, CalendarCheck, TrendingUp, Snowflake } from "lucide-react";
import { StatCard } from "../../../components/dashboard/StatCard";
import { SectionCard } from "../../../components/dashboard/SectionCard";

const SESSOES = [
  { day: "Segunda", time: "07:00", instructor: "Renata Alves", capacity: 6, booked: 6 },
  { day: "Segunda", time: "18:30", instructor: "Renata Alves", capacity: 6, booked: 5 },
  { day: "Quarta", time: "09:00", instructor: "Renata Alves", capacity: 6, booked: 4 },
  { day: "Quinta", time: "17:00", instructor: "Bianca Torres", capacity: 6, booked: 6 },
  { day: "Sábado", time: "10:00", instructor: "Renata Alves", capacity: 6, booked: 3 },
];

const EVOLUCAO = [
  { name: "Fernanda Costa", focus: "Postura e mobilidade lombar", progress: 70 },
  { name: "Julia Santos", focus: "Fortalecimento do core", progress: 55 },
  { name: "Roberto Lima", focus: "Recuperação pós-lesão no ombro", progress: 40 },
];

export const PilatesTab = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Gestão do Pilates</h2>
      <p className="text-complexo-muted">Sessões, pacientes e evolução do estúdio Complexo Pilates.</p>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard icon={CalendarCheck} label="Sessões no mês" value="212" trend="+8%" trendPositive />
      <StatCard icon={Users} label="Pacientes ativos" value="58" />
      <StatCard icon={Snowflake} label="Recovery agendados" value="34" suffix="/mês" />
    </div>

    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <SectionCard title="Sessões da semana" className="xl:col-span-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-complexo-muted">
              <tr className="border-b border-complexo-light/10">
                <th className="py-3 pr-4 font-medium">Dia</th>
                <th className="py-3 pr-4 font-medium">Horário</th>
                <th className="py-3 pr-4 font-medium">Instrutora</th>
                <th className="py-3 pr-0 font-medium">Ocupação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-complexo-light/10">
              {SESSOES.map((s, i) => (
                <tr key={i}>
                  <td className="py-3 pr-4 font-medium text-complexo-light">{s.day}</td>
                  <td className="py-3 pr-4 font-mono text-complexo-muted">{s.time}</td>
                  <td className="py-3 pr-4 text-complexo-muted">{s.instructor}</td>
                  <td className="py-3 pr-0">
                    <span className={s.booked === s.capacity ? "font-semibold text-complexo-red" : "text-complexo-light"}>
                      {s.booked}/{s.capacity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Evolução dos pacientes">
        <div className="space-y-5">
          {EVOLUCAO.map((e) => (
            <div key={e.name}>
              <div className="mb-2 flex items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-2 font-medium text-complexo-light">
                  <TrendingUp className="h-3.5 w-3.5 text-complexo-red" /> {e.name}
                </span>
                <span className="text-complexo-muted">{e.progress}%</span>
              </div>
              <p className="mb-1.5 text-xs text-complexo-muted">{e.focus}</p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-complexo-light/10">
                <div className="h-full rounded-full bg-complexo-red" style={{ width: `${e.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  </div>
);
