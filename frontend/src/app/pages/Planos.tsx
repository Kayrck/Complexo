import { useState } from "react";
import { Link } from "react-router";
import { Check, X, Minus, ArrowRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { PLANS, PLAN_MATRIX } from "../data";

export const Planos = () => {
  const [annual, setAnnual] = useState(false);
  const factor = annual ? 10 : 1; // 12 meses pagando 10 no anual

  return (
    <div className="bg-complexo-dark pt-32 pb-24 lg:pt-40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">Planos</p>
          <h1 className="mt-3 font-rajdhani text-5xl font-bold uppercase lg:text-6xl">
            Escolha como quer evoluir
          </h1>
          <p className="mt-4 text-lg text-complexo-muted">
            Transparência total. Sem fidelidade obrigatória, cancele quando quiser.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-complexo-light/10 bg-complexo-surface p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-semibold ${
                !annual ? "bg-complexo-red text-white" : "text-complexo-muted"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-2 text-sm font-semibold ${
                annual ? "bg-complexo-red text-white" : "text-complexo-muted"
              }`}
            >
              Anual <span className="text-xs opacity-80">−16%</span>
            </button>
          </div>
        </Reveal>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-7 transition-transform duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? "border-complexo-red bg-complexo-surface glow-red"
                    : "border-complexo-light/10 bg-complexo-surface"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-complexo-red px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
                    Mais popular
                  </span>
                )}
                <h3 className="font-rajdhani text-2xl font-bold uppercase">{plan.name}</h3>
                <p className="mt-1 text-sm text-complexo-muted">{plan.tagline}</p>
                <div className="mt-6 flex items-end gap-1">
                  <span className="font-rajdhani text-5xl font-bold">
                    R${annual ? Math.round((plan.price * factor) / 12) : plan.price}
                  </span>
                  <span className="mb-2 text-sm text-complexo-muted">/mês</span>
                </div>
                {annual && (
                  <p className="mt-1 font-mono text-xs text-complexo-muted">
                    Cobrado R${plan.price * factor}/ano
                  </p>
                )}
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-complexo-red" />
                      <span className="text-complexo-light/85">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/cadastro`}
                  className={`mt-7 inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold ${
                    plan.popular
                      ? "bg-complexo-red text-white hover:bg-complexo-red-bright"
                      : "border border-complexo-light/15 text-complexo-light hover:bg-complexo-light/5"
                  }`}
                >
                  Assinar {plan.name}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Comparator */}
        <Reveal className="mt-20">
          <h2 className="text-center font-rajdhani text-3xl font-bold uppercase lg:text-4xl">
            Compare os planos
          </h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-complexo-light/10">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-complexo-light/10 bg-complexo-surface">
                  <th className="p-5 text-left font-mono text-xs uppercase tracking-widest text-complexo-muted">
                    Recurso
                  </th>
                  {PLANS.map((p) => (
                    <th key={p.id} className="p-5 text-center font-rajdhani text-lg font-bold uppercase">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLAN_MATRIX.map((row) => (
                  <tr key={row.label} className="border-b border-complexo-light/5 last:border-0">
                    <td className="p-5 text-complexo-light/85">{row.label}</td>
                    {row.values.map((v, idx) => (
                      <td key={idx} className="p-5 text-center">
                        {v === true ? (
                          <Check className="mx-auto h-5 w-5 text-complexo-red" />
                        ) : v === false ? (
                          <X className="mx-auto h-5 w-5 text-complexo-light/20" />
                        ) : v === "—" ? (
                          <Minus className="mx-auto h-4 w-4 text-complexo-light/20" />
                        ) : (
                          <span className="font-mono text-xs text-complexo-light/85">{v}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-complexo-light/10 bg-complexo-surface p-8 text-center">
          <h3 className="font-rajdhani text-2xl font-bold uppercase">Ainda em dúvida?</h3>
          <p className="max-w-md text-complexo-muted">
            Fale com a nossa equipe e encontre o plano ideal para o seu objetivo.
          </p>
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 rounded-full border border-complexo-light/15 px-7 py-3.5 font-semibold hover:bg-complexo-light/5"
          >
            Falar com a equipe <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </div>
  );
};
