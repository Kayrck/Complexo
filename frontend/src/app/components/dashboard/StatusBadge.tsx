type Tone = "positive" | "warning" | "negative" | "neutral";

const TONE_CLASSES: Record<Tone, string> = {
  positive: "bg-emerald-500/10 text-emerald-500",
  warning: "bg-yellow-500/10 text-yellow-500",
  negative: "bg-red-500/10 text-red-400",
  neutral: "bg-complexo-light/10 text-complexo-muted",
};

const STATUS_TONE: Record<string, Tone> = {
  Ativo: "positive",
  Ativa: "positive",
  Pago: "positive",
  Confirmado: "positive",
  Concluído: "positive",
  Pendente: "warning",
  "Aguardando": "warning",
  Inativo: "negative",
  Cancelado: "negative",
  Atrasado: "negative",
  Inadimplente: "negative",
};

interface StatusBadgeProps {
  status: string;
  tone?: Tone;
}

export const StatusBadge = ({ status, tone }: StatusBadgeProps) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
      TONE_CLASSES[tone ?? STATUS_TONE[status] ?? "neutral"]
    }`}
  >
    {status}
  </span>
);
