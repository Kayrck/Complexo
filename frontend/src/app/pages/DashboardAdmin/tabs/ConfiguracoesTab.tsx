import { Pencil, ShieldCheck, Building2, Clock, Users2 } from "lucide-react";
import { SectionCard } from "../../../components/dashboard/SectionCard";
import { StatusBadge } from "../../../components/dashboard/StatusBadge";
import { PLANS, BUSINESSES } from "../../../data";

const FUNCIONARIOS = [
  { name: "João Diretor", role: "Administrador", access: "Total", status: "Ativo" },
  { name: "André Nogueira", role: "Personal Trainer", access: "Alunos e Agenda", status: "Ativo" },
  { name: "Lara Maia", role: "Nutricionista", access: "Pacientes e Nutrição", status: "Ativo" },
  { name: "Renata Alves", role: "Instrutora de Pilates", access: "Agenda Pilates", status: "Ativo" },
  { name: "Camila Ferreira", role: "Recepção", access: "Alunos e Financeiro", status: "Ativo" },
];

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

    <SectionCard title="Funcionários e permissões" action={<Users2 className="h-4 w-4 text-complexo-muted" />}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-complexo-muted">
            <tr className="border-b border-complexo-light/10">
              <th className="py-3 pr-4 font-medium">Nome</th>
              <th className="py-3 pr-4 font-medium">Função</th>
              <th className="py-3 pr-4 font-medium">Acesso</th>
              <th className="py-3 pr-0 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-complexo-light/10">
            {FUNCIONARIOS.map((f) => (
              <tr key={f.name}>
                <td className="py-3 pr-4 font-medium text-complexo-light">{f.name}</td>
                <td className="py-3 pr-4 text-complexo-muted">{f.role}</td>
                <td className="py-3 pr-4 text-complexo-muted">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-complexo-red" /> {f.access}
                  </span>
                </td>
                <td className="py-3 pr-0">
                  <StatusBadge status={f.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  </div>
);
