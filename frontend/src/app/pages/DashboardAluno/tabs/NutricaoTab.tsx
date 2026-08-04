import { useState } from "react";
import { Droplet, Camera, CheckCircle2, Bell, MessageCircle, UtensilsCrossed } from "lucide-react";
import { SectionCard } from "../../../components/dashboard/SectionCard";

const MEALS = [
  { name: "Café da manhã", time: "07:00", items: "2 ovos mexidos, aveia com banana, café sem açúcar", logged: true },
  { name: "Lanche da manhã", time: "10:00", items: "Iogurte natural + castanhas", logged: true },
  { name: "Almoço", time: "12:30", items: "Frango grelhado, arroz integral, brócolis, salada", logged: true },
  { name: "Lanche da tarde", time: "16:00", items: "Whey + fruta", logged: false },
  { name: "Jantar", time: "19:30", items: "Tilápia, batata-doce, legumes no vapor", logged: false },
];

const REMINDERS = [
  "Registrar o lanche da tarde",
  "Beber mais 2 copos de água até as 18h",
  "Confirmar presença na consulta de 15/08",
];

export const NutricaoTab = () => {
  const [waterCups, setWaterCups] = useState(6);
  const totalCups = 8;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Nutrição</h2>
        <p className="text-complexo-muted">
          Acompanhamento da nutricionista Lara Maia, integrado ao app de nutrição (WebDiet).
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SectionCard title="Hidratação hoje">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalCups }).map((_, i) => (
              <button key={i} onClick={() => setWaterCups(i + 1)} aria-label={`${i + 1} copos`}>
                <Droplet className={`h-6 w-6 ${i < waterCups ? "fill-complexo-red text-complexo-red" : "text-complexo-light/15"}`} />
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-complexo-muted">
            {waterCups} de {totalCups} copos — toque para atualizar
          </p>
        </SectionCard>

        <SectionCard title="Lembretes" className="lg:col-span-2">
          <ul className="space-y-3">
            {REMINDERS.map((r) => (
              <li key={r} className="flex items-center gap-3 text-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-complexo-red/10 text-complexo-red">
                  <Bell className="h-4 w-4" />
                </span>
                <span className="text-complexo-light/90">{r}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Plano alimentar de hoje">
        <div className="divide-y divide-complexo-light/10">
          {MEALS.map((meal) => (
            <div key={meal.name} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-complexo-red/10 text-complexo-red">
                <UtensilsCrossed className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-complexo-light">{meal.name}</p>
                  <span className="font-mono text-xs text-complexo-muted">{meal.time}</span>
                </div>
                <p className="truncate text-sm text-complexo-muted">{meal.items}</p>
              </div>
              {meal.logged ? (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" /> Registrada
                </span>
              ) : (
                <button className="flex items-center gap-1.5 rounded-full border border-complexo-light/15 px-3 py-1.5 text-xs font-semibold text-complexo-muted hover:text-complexo-light">
                  <Camera className="h-3.5 w-3.5" /> Registrar
                </button>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Observações da nutricionista">
        <div className="flex items-start gap-3 rounded-xl bg-complexo-red/5 p-4">
          <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-complexo-red" />
          <div>
            <p className="text-sm leading-relaxed text-complexo-light/90">
              "Rafael, ótima semana de adesão ao plano! Vamos ajustar o jantar de quinta para incluir mais
              fibras — conversamos na próxima consulta."
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-complexo-muted">Lara Maia · há 2 dias</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};
