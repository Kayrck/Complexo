import { Pencil, Building2, Clock } from "lucide-react";
import { SectionCard } from "../../../components/dashboard/SectionCard";
import { PLANS, BUSINESSES } from "../../../data";

const HORARIOS = [
  { day: "Segunda a Sexta", value: "05h30 — 22h30" },
  { day: "Sábado", value: "08h00 — 14h00" },
  { day: "Domingo", value: "Fechado" },
];

export const ConfiguracoesTab = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Configurações</h2>
      <p className="text-complexo-muted">Planos, unidades, horários, equipe e permissões do Grupo Complexo.</p>
    </div>

    <SectionCard title="Planos e preços" action={<Pencil className="h-4 w-4 text-complexo-muted" />}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {PLANS.map((plan) => (
          <div key={plan.id} className="rounded-xl border border-complexo-light/10 bg-complexo-panel p-4">
            <p className="font-rajdhani text-lg font-bold uppercase text-complexo-light">{plan.name}</p>
            <p className="mt-1 font-rajdhani text-2xl font-bold text-complexo-red">R${plan.price}<span className="text-xs text-complexo-muted">/mês</span></p>
            <p className="mt-1 text-xs text-complexo-muted">{plan.tagline}</p>
          </div>
        ))}
      </div>
    </SectionCard>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <SectionCard title="Unidades" action={<Building2 className="h-4 w-4 text-complexo-muted" />}>
        <div className="space-y-3">
          {BUSINESSES.map((b) => (
            <div key={b.id} className="flex items-start gap-3 rounded-lg bg-complexo-panel p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-complexo-red/10 text-complexo-red">
                <b.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="font-medium text-complexo-light">{b.fullName}</p>
                <p className="text-xs text-complexo-muted">{b.address} — {b.addressCity}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Horários — Academia" action={<Clock className="h-4 w-4 text-complexo-muted" />}>
        <div className="space-y-3">
          {HORARIOS.map((h) => (
            <div key={h.day} className="flex items-center justify-between rounded-lg bg-complexo-panel px-4 py-3 text-sm">
              <span className="text-complexo-muted">{h.day}</span>
              <span className="font-mono text-complexo-light">{h.value}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>

    <p className="text-sm text-complexo-muted">
      Cadastro de funcionários, papéis e permissões agora tem aba própria — veja <span className="font-semibold text-complexo-light">Funcionários</span> no menu.
    </p>
  </div>
);
