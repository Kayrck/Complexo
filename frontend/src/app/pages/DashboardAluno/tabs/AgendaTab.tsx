import { Dumbbell, HeartPulse, Stethoscope, Salad, Snowflake, MapPin, Clock } from "lucide-react";
import { SectionCard } from "../../../components/dashboard/SectionCard";

const CATEGORY_STYLE = {
  musculacao: { icon: Dumbbell, label: "Musculação", color: "text-complexo-red bg-complexo-red/10" },
  pilates: { icon: HeartPulse, label: "Pilates", color: "text-pink-400 bg-pink-400/10" },
  avaliacao: { icon: Stethoscope, label: "Avaliação física", color: "text-blue-400 bg-blue-400/10" },
  nutricao: { icon: Salad, label: "Nutrição", color: "text-emerald-400 bg-emerald-400/10" },
  fisioterapia: { icon: Stethoscope, label: "Fisioterapia", color: "text-purple-400 bg-purple-400/10" },
  recovery: { icon: Snowflake, label: "Recovery", color: "text-cyan-400 bg-cyan-400/10" },
} as const;

type Category = keyof typeof CATEGORY_STYLE;

interface AgendaItem {
  time: string;
  title: string;
  category: Category;
  location: string;
}

const AGENDA: { day: string; items: AgendaItem[] }[] = [
  {
    day: "Hoje, quinta-feira",
    items: [
      { time: "07:00", title: "Treino C — Pernas", category: "musculacao", location: "Academia Complexo" },
      { time: "18:30", title: "Aula de Pilates", category: "pilates", location: "Complexo Pilates" },
    ],
  },
  {
    day: "Amanhã, sexta-feira",
    items: [
      { time: "07:00", title: "Treino A — Peito e Tríceps", category: "musculacao", location: "Academia Complexo" },
      { time: "17:00", title: "Banheira de gelo — Recovery", category: "recovery", location: "Complexo Pilates" },
    ],
  },
  {
    day: "Terça-feira, 12/08",
    items: [
      { time: "09:00", title: "Avaliação física trimestral", category: "avaliacao", location: "Academia Complexo" },
    ],
  },
  {
    day: "Sexta-feira, 15/08",
    items: [
      { time: "14:30", title: "Consulta com a nutricionista Lara", category: "nutricao", location: "Complexo Pilates" },
    ],
  },
];

export const AgendaTab = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Agenda</h2>
      <p className="text-complexo-muted">Todos os seus compromissos na Complexo, em um só lugar.</p>
    </div>

    <div className="flex flex-wrap gap-2">
      {(Object.entries(CATEGORY_STYLE) as [Category, (typeof CATEGORY_STYLE)[Category]][]).map(([key, cat]) => (
        <span key={key} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${cat.color}`}>
          <cat.icon className="h-3.5 w-3.5" /> {cat.label}
        </span>
      ))}
    </div>

    <div className="space-y-6">
      {AGENDA.map((group) => (
        <SectionCard key={group.day} title={group.day}>
          <div className="divide-y divide-complexo-light/10">
            {group.items.map((item, i) => {
              const cat = CATEGORY_STYLE[item.category];
              return (
                <div key={i} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${cat.color}`}>
                    <cat.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-complexo-light">{item.title}</p>
                    <p className="flex items-center gap-1.5 text-xs text-complexo-muted">
                      <MapPin className="h-3 w-3" /> {item.location}
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 whitespace-nowrap text-sm font-mono text-complexo-muted">
                    <Clock className="h-3.5 w-3.5" /> {item.time}
                  </span>
                </div>
              );
            })}
          </div>
        </SectionCard>
      ))}
    </div>
  </div>
);
