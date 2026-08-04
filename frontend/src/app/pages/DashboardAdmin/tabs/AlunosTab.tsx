import { useMemo, useState } from "react";
import { Search, Plus, Mail, Phone, Calendar, TrendingUp, MessageSquare } from "lucide-react";
import { SectionCard } from "../../../components/dashboard/SectionCard";
import { StatusBadge } from "../../../components/dashboard/StatusBadge";

interface Aluno {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: string;
  frequency: number;
  joinDate: string;
  lastPayment: string;
  lastEvaluation: string;
  weightChange: string;
  notes: string;
}

const ALUNOS: Aluno[] = [
  { id: "1", name: "Marcos Andrade", email: "marcos@email.com", phone: "(85) 99111-2233", plan: "Performance", status: "Ativo", frequency: 91, joinDate: "14/02/2025", lastPayment: "05/08/2026", lastEvaluation: "12/07/2026", weightChange: "-4kg em 6 meses", notes: "Foco em hipertrofia. Sem restrições." },
  { id: "2", name: "Julia Santos", email: "julia@email.com", phone: "(85) 99222-3344", plan: "Elite", status: "Ativo", frequency: 96, joinDate: "03/11/2024", lastPayment: "05/08/2026", lastEvaluation: "20/07/2026", weightChange: "-2kg em 3 meses", notes: "Personal dedicado às terças e quintas." },
  { id: "3", name: "Roberto Lima", email: "roberto@email.com", phone: "(85) 99333-4455", plan: "Essencial", status: "Pendente", frequency: 62, joinDate: "28/05/2026", lastPayment: "05/07/2026", lastEvaluation: "01/06/2026", weightChange: "+1kg em 2 meses", notes: "Pagamento de agosto em aberto." },
  { id: "4", name: "Fernanda Costa", email: "fernanda@email.com", phone: "(85) 99444-5566", plan: "Performance", status: "Inativo", frequency: 12, joinDate: "10/01/2024", lastPayment: "20/05/2026", lastEvaluation: "15/04/2026", weightChange: "Sem dados recentes", notes: "Sem frequência há mais de 45 dias." },
  { id: "5", name: "Camila Souza", email: "camila@email.com", phone: "(85) 99555-6677", plan: "Elite", status: "Ativo", frequency: 88, joinDate: "22/09/2025", lastPayment: "05/08/2026", lastEvaluation: "18/07/2026", weightChange: "-6kg em 8 meses", notes: "Também frequenta o Pilates 1x/semana." },
];

export const AlunosTab = () => {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(ALUNOS[0].id);

  const filtered = useMemo(
    () => ALUNOS.filter((a) => a.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const selected = ALUNOS.find((a) => a.id === selectedId) ?? ALUNOS[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Gestão de alunos</h2>
          <p className="text-complexo-muted">{ALUNOS.length} alunos cadastrados nesta unidade.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-complexo-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-complexo-red-bright">
          <Plus className="h-4 w-4" /> Novo aluno
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <SectionCard className="xl:col-span-2" title="Todos os alunos">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-complexo-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome..."
              className="h-10 w-full rounded-lg border border-complexo-light/10 bg-complexo-panel pl-9 pr-4 text-sm text-complexo-light placeholder:text-complexo-muted focus:border-complexo-red focus:outline-none"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-complexo-muted">
                <tr className="border-b border-complexo-light/10">
                  <th className="py-3 pr-4 font-medium">Aluno</th>
                  <th className="py-3 pr-4 font-medium">Plano</th>
                  <th className="py-3 pr-4 font-medium">Frequência</th>
                  <th className="py-3 pr-0 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-complexo-light/10">
                {filtered.map((a) => (
                  <tr
                    key={a.id}
                    onClick={() => setSelectedId(a.id)}
                    className={`cursor-pointer transition-colors hover:bg-complexo-light/[0.03] ${
                      selectedId === a.id ? "bg-complexo-red/5" : ""
                    }`}
                  >
                    <td className="py-3 pr-4">
                      <p className="font-medium text-complexo-light">{a.name}</p>
                      <p className="text-xs text-complexo-muted">{a.email}</p>
                    </td>
                    <td className="py-3 pr-4 text-complexo-muted">{a.plan}</td>
                    <td className="py-3 pr-4 text-complexo-muted">{a.frequency}%</td>
                    <td className="py-3 pr-0">
                      <StatusBadge status={a.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Ficha do aluno">
          <div>
            <h3 className="font-rajdhani text-2xl font-bold uppercase text-complexo-light">{selected.name}</h3>
            <div className="mt-1 flex flex-col gap-1 text-xs text-complexo-muted">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3 w-3" /> {selected.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-3 w-3" /> {selected.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" /> Aluno desde {selected.joinDate}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-complexo-panel p-3">
                <p className="text-[10px] uppercase text-complexo-muted">Plano</p>
                <p className="font-semibold text-complexo-light">{selected.plan}</p>
              </div>
              <div className="rounded-lg bg-complexo-panel p-3">
                <p className="text-[10px] uppercase text-complexo-muted">Último pagamento</p>
                <p className="font-semibold text-complexo-light">{selected.lastPayment}</p>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-complexo-panel p-3">
              <p className="flex items-center gap-1.5 text-[10px] uppercase text-complexo-muted">
                <TrendingUp className="h-3 w-3" /> Última avaliação — {selected.lastEvaluation}
              </p>
              <p className="mt-1 font-semibold text-complexo-light">{selected.weightChange}</p>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-lg bg-complexo-light/5 p-3 text-sm text-complexo-light/85">
              <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-complexo-red" />
              {selected.notes}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};
