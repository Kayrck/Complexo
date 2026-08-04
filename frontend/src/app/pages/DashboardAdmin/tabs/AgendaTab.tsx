import { useState } from "react";
import { Dumbbell, HeartPulse, Stethoscope, Salad, Snowflake, PartyPopper, Clock, User } from "lucide-react";
import { SectionCard } from "../../../components/dashboard/SectionCard";

const CATEGORY_STYLE = {
  musculacao: { icon: Dumbbell, label: "Musculação", color: "text-complexo-red bg-complexo-red/10" },
  pilates: { icon: HeartPulse, label: "Pilates", color: "text-pink-400 bg-pink-400/10" },
  fisioterapia: { icon: Stethoscope, label: "Fisioterapia", color: "text-purple-400 bg-purple-400/10" },
  nutricao: { icon: Salad, label: "Consultas", color: "text-emerald-400 bg-emerald-400/10" },
  recovery: { icon: Snowflake, label: "Recovery", color: "text-cyan-400 bg-cyan-400/10" },
  eventos: { icon: PartyPopper, label: "Eventos", color: "text-orange-400 bg-orange-400/10" },
} as const;

type Category = keyof typeof CATEGORY_STYLE;

interface Compromisso {
  time: string;
  title: string;
  category: Category;
  professional: string;
  capacity?: string;
}

const AGENDA_HOJE: Compromisso[] = [
  { time: "07:00", title: "Aula de Pilates — turma manhã", category: "pilates", professional: "Renata Alves", capacity: "6/6" },
  { time: "08:00", title: "Personal — Marcos Andrade", category: "musculacao", professional: "André Nogueira" },
  { time: "09:00", title: "Sessão de fisioterapia — Fernanda Costa", category: "fisioterapia", professional: "Dra. Patrícia Nunes" },
  { time: "10:30", title: "Avaliação física trimestral — Julia Santos", category: "musculacao", professional: "Diego Martins" },
  { time: "14:30", title: "Consulta nutricional — Camila Souza", category: "nutricao", professional: "Lara Maia" },
  { time: "17:00", title: "Recovery — banheira de gelo", category: "recovery", professional: "Equipe Pilates", capacity: "1/2" },
  { time: "18:30", title: "Aula de Pilates — turma noite", category: "pilates", professional: "Bianca Torres", capacity: "5/6" },
  { time: "19:00", title: "Workshop — Nutrição esportiva", category: "eventos", professional: "Lara Maia" },
];

export const AgendaTab = () => {
  const [activeCategories, setActiveCategories] = useState<Category[]>(Object.keys(CATEGORY_STYLE) as Category[]);

  const toggleCategory = (cat: Category) =>
    setActiveCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));

  const filtered = AGENDA_HOJE.filter((c) => activeCategories.includes(c.category));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Agenda geral</h2>
        <p className="text-complexo-muted">Todos os compromissos da unidade — hoje, quinta-feira.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.entries(CATEGORY_STYLE) as [Category, (typeof CATEGORY_STYLE)[Category]][]).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => toggleCategory(key)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-opacity ${cat.color} ${
              activeCategories.includes(key) ? "opacity-100" : "opacity-30"
            }`}
          >
            <cat.icon className="h-3.5 w-3.5" /> {cat.label}
          </button>
        ))}
      </div>

      <SectionCard title={`${filtered.length} compromissos hoje`}>
        <div className="divide-y divide-complexo-light/10">
          {filtered.map((item, i) => {
            const cat = CATEGORY_STYLE[item.category];
            return (
              <div key={i} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <span className="flex items-center gap-1.5 whitespace-nowrap font-mono text-sm text-complexo-muted">
                  <Clock className="h-3.5 w-3.5" /> {item.time}
                </span>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${cat.color}`}>
                  <cat.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-complexo-light">{item.title}</p>
                  <p className="flex items-center gap-1.5 text-xs text-complexo-muted">
                    <User className="h-3 w-3" /> {item.professional}
                  </p>
                </div>
                {item.capacity && (
                  <span className="shrink-0 font-mono text-xs text-complexo-muted">{item.capacity}</span>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-complexo-muted">Nenhum compromisso nas categorias selecionadas.</p>
          )}
        </div>
      </SectionCard>
    </div>
  );
};
