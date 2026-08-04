import { useState } from "react";
import { Users, Star, Clock } from "lucide-react";
import { SectionCard } from "../../../components/dashboard/SectionCard";

interface Professor {
  id: string;
  name: string;
  specialty: string;
  students: number;
  rating: number;
  weeklyHours: number;
  schedule: { day: string; time: string }[];
}

const PROFESSORES: Professor[] = [
  {
    id: "1",
    name: "André Nogueira",
    specialty: "Musculação e hipertrofia",
    students: 42,
    rating: 4.9,
    weeklyHours: 36,
    schedule: [
      { day: "Seg / Qua / Sex", time: "06h–14h" },
      { day: "Ter / Qui", time: "14h–22h" },
    ],
  },
  {
    id: "2",
    name: "Bianca Torres",
    specialty: "Funcional e condicionamento",
    students: 35,
    rating: 4.8,
    weeklyHours: 30,
    schedule: [{ day: "Seg a Sex", time: "16h–22h" }],
  },
  {
    id: "3",
    name: "Diego Martins",
    specialty: "Musculação e avaliação física",
    students: 51,
    rating: 4.7,
    weeklyHours: 40,
    schedule: [
      { day: "Seg a Sáb", time: "05h30–13h30" },
    ],
  },
];

export const ProfessoresTab = () => {
  const [selectedId, setSelectedId] = useState(PROFESSORES[0].id);
  const selected = PROFESSORES.find((p) => p.id === selectedId)!;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Gestão de professores</h2>
        <p className="text-complexo-muted">Equipe de personal trainers e instrutores da Academia.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {PROFESSORES.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-5 text-left transition-colors ${
                selectedId === p.id ? "border-complexo-red bg-complexo-red/5" : "border-complexo-light/10 bg-complexo-surface hover:border-complexo-light/25"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-complexo-red/15 font-rajdhani text-lg font-bold text-complexo-red">
                  {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="font-semibold text-complexo-light">{p.name}</p>
                  <p className="text-sm text-complexo-muted">{p.specialty}</p>
                </div>
              </div>
              <div className="hidden shrink-0 items-center gap-5 text-sm text-complexo-muted sm:flex">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> {p.students}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" /> {p.rating}
                </span>
              </div>
            </button>
          ))}
        </div>

        <SectionCard title="Agenda e desempenho">
          <h3 className="font-rajdhani text-2xl font-bold uppercase text-complexo-light">{selected.name}</h3>
          <p className="text-sm text-complexo-muted">{selected.specialty}</p>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-complexo-panel p-3">
              <p className="font-rajdhani text-xl font-bold text-complexo-light">{selected.students}</p>
              <p className="text-[10px] uppercase text-complexo-muted">Alunos</p>
            </div>
            <div className="rounded-lg bg-complexo-panel p-3">
              <p className="flex items-center justify-center gap-1 font-rajdhani text-xl font-bold text-complexo-light">
                <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" /> {selected.rating}
              </p>
              <p className="text-[10px] uppercase text-complexo-muted">Avaliação</p>
            </div>
            <div className="rounded-lg bg-complexo-panel p-3">
              <p className="font-rajdhani text-xl font-bold text-complexo-light">{selected.weeklyHours}h</p>
              <p className="text-[10px] uppercase text-complexo-muted">Por semana</p>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-complexo-muted">Horários fixos</p>
            {selected.schedule.map((s, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-complexo-panel px-3 py-2.5 text-sm">
                <span className="text-complexo-light/90">{s.day}</span>
                <span className="flex items-center gap-1.5 font-mono text-complexo-muted">
                  <Clock className="h-3.5 w-3.5" /> {s.time}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
};
