import { CreditCard, QrCode, FileText, Download, Calendar } from "lucide-react";
import { SectionCard } from "../../../components/dashboard/SectionCard";
import { StatusBadge } from "../../../components/dashboard/StatusBadge";

const PAGAMENTOS = [
  { date: "05/08/2026", desc: "Mensalidade — Plano Performance", method: "Cartão final 4821", value: "R$149", status: "Pago" },
  { date: "05/07/2026", desc: "Mensalidade — Plano Performance", method: "Cartão final 4821", value: "R$149", status: "Pago" },
  { date: "05/06/2026", desc: "Mensalidade — Plano Performance", method: "PIX", value: "R$149", status: "Pago" },
  { date: "22/05/2026", desc: "Whey Isolate — Loja", method: "Cartão final 4821", value: "R$189", status: "Pago" },
  { date: "05/05/2026", desc: "Mensalidade — Plano Performance", method: "Cartão final 4821", value: "R$149", status: "Atrasado" },
];

export const FinanceiroTab = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Financeiro</h2>
      <p className="text-complexo-muted">Seu plano, formas de pagamento e histórico de cobranças.</p>
    </div>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <SectionCard className="lg:col-span-2">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-complexo-muted">Plano contratado</p>
            <h3 className="mt-1 font-rajdhani text-3xl font-bold uppercase text-complexo-light">Performance</h3>
            <p className="mt-1 text-complexo-muted">Musculação + 1 aula de Pilates por semana + 10% off na loja</p>
          </div>
          <StatusBadge status="Ativo" />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-complexo-light/10 pt-6 sm:grid-cols-3">
          <div>
            <p className="text-xs text-complexo-muted">Valor mensal</p>
            <p className="font-rajdhani text-xl font-bold text-complexo-light">R$149</p>
          </div>
          <div>
            <p className="text-xs text-complexo-muted">Próximo vencimento</p>
            <p className="flex items-center gap-1.5 font-rajdhani text-xl font-bold text-complexo-light">
              <Calendar className="h-4 w-4 text-complexo-red" /> 05/09
            </p>
          </div>
          <div>
            <p className="text-xs text-complexo-muted">Forma de pagamento</p>
            <p className="font-rajdhani text-xl font-bold text-complexo-light">Cartão •• 4821</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Pagar agora">
        <div className="space-y-3">
          <button className="flex w-full items-center gap-3 rounded-xl border border-complexo-light/10 bg-complexo-panel p-4 text-left hover:border-complexo-red/40">
            <QrCode className="h-5 w-5 text-complexo-red" />
            <div>
              <p className="font-semibold text-complexo-light">Pagar com PIX</p>
              <p className="text-xs text-complexo-muted">Aprovação imediata</p>
            </div>
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl border border-complexo-light/10 bg-complexo-panel p-4 text-left hover:border-complexo-red/40">
            <CreditCard className="h-5 w-5 text-complexo-red" />
            <div>
              <p className="font-semibold text-complexo-light">Pagar com cartão</p>
              <p className="text-xs text-complexo-muted">Cartão salvo •• 4821</p>
            </div>
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl border border-complexo-light/10 bg-complexo-panel p-4 text-left hover:border-complexo-red/40">
            <FileText className="h-5 w-5 text-complexo-red" />
            <div>
              <p className="font-semibold text-complexo-light">2ª via do boleto</p>
              <p className="text-xs text-complexo-muted">Gerar para a próxima fatura</p>
            </div>
          </button>
        </div>
      </SectionCard>
    </div>

    <SectionCard title="Histórico de pagamentos">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-complexo-muted">
            <tr className="border-b border-complexo-light/10">
              <th className="py-3 pr-4 font-medium">Data</th>
              <th className="py-3 pr-4 font-medium">Descrição</th>
              <th className="py-3 pr-4 font-medium">Forma</th>
              <th className="py-3 pr-4 font-medium">Valor</th>
              <th className="py-3 pr-4 font-medium">Status</th>
              <th className="py-3 pr-0 text-right font-medium">Recibo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-complexo-light/10">
            {PAGAMENTOS.map((p, i) => (
              <tr key={i}>
                <td className="py-3 pr-4 text-complexo-muted">{p.date}</td>
                <td className="py-3 pr-4 font-medium text-complexo-light">{p.desc}</td>
                <td className="py-3 pr-4 text-complexo-muted">{p.method}</td>
                <td className="py-3 pr-4 font-semibold text-complexo-light">{p.value}</td>
                <td className="py-3 pr-4">
                  <StatusBadge status={p.status} />
                </td>
                <td className="py-3 pr-0 text-right">
                  <button className="text-complexo-muted hover:text-complexo-red" aria-label="Baixar recibo">
                    <Download className="ml-auto h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  </div>
);
