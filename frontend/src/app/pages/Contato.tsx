import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react";
import { Reveal } from "../components/Reveal";

const INFO = [
  { icon: MapPin, label: "Endereço", value: "Rua Antônio Acioly, 196 — Centro, Guaiúba/CE" },
  { icon: Phone, label: "Telefone", value: "+55 85 98683-0769 · +55 85 98866-4882" },
  { icon: Mail, label: "E-mail", value: "contato@grupocomplexo.com.br" },
  { icon: Clock, label: "Atendimento", value: "Seg a Sex, 08h — 20h" },
];

export const Contato = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-complexo-dark pt-32 pb-24 lg:pt-40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">Contato</p>
          <h1 className="mt-3 font-rajdhani text-5xl font-bold uppercase lg:text-6xl">
            Vamos conversar
          </h1>
          <p className="mt-4 text-lg text-complexo-muted">
            Tire dúvidas, agende uma visita ou comece sua matrícula. Respondemos rápido.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Form */}
          <Reveal>
            {!sent ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-5 rounded-2xl border border-complexo-light/10 bg-complexo-surface p-7"
              >
                <Field label="Nome">
                  <input required className={inputCls} placeholder="Seu nome" />
                </Field>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="E-mail">
                    <input required type="email" className={inputCls} placeholder="voce@email.com" />
                  </Field>
                  <Field label="WhatsApp">
                    <input required className={inputCls} placeholder="(85) 90000-0000" />
                  </Field>
                </div>
                <Field label="Assunto">
                  <select className={inputCls} defaultValue="Academia">
                    <option className="bg-complexo-panel">Academia</option>
                    <option className="bg-complexo-panel">Planos</option>
                    <option className="bg-complexo-panel">Suplementos</option>
                    <option className="bg-complexo-panel">Pilates</option>
                  </select>
                </Field>
                <Field label="Mensagem">
                  <textarea rows={4} className={inputCls} placeholder="Como podemos ajudar?" />
                </Field>
                <button
                  type="submit"
                  className="w-full rounded-full bg-complexo-red px-7 py-4 font-semibold text-white hover:bg-complexo-red-bright"
                >
                  Enviar mensagem
                </button>
              </form>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-complexo-light/10 bg-complexo-surface p-12 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-complexo-red text-white">
                  <Check className="h-7 w-7" />
                </span>
                <h3 className="font-rajdhani text-2xl font-bold uppercase">Mensagem enviada!</h3>
                <p className="text-complexo-muted">
                  Obrigado pelo contato. Nossa equipe responderá em breve.
                </p>
              </div>
            )}
          </Reveal>

          {/* Info */}
          <Reveal delay={0.1}>
            <div className="space-y-4">
              {INFO.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 rounded-2xl border border-complexo-light/10 bg-complexo-surface p-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-complexo-red/10 text-complexo-red">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-complexo-muted">
                      {item.label}
                    </p>
                    <p className="mt-1 text-complexo-light/90">{item.value}</p>
                  </div>
                </div>
              ))}
              <div className="overflow-hidden rounded-2xl border border-complexo-light/10">
                <iframe
                  title="Mapa Complexo"
                  className="h-56 w-full grayscale"
                  loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-38.65%2C-4.06%2C-38.60%2C-4.02&layer=mapnik"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

const inputCls =
  "w-full rounded-xl border border-complexo-light/10 bg-complexo-panel px-4 py-3 text-complexo-light placeholder:text-complexo-muted/60 focus:border-complexo-red focus:outline-none";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-complexo-muted">
      {label}
    </span>
    {children}
  </label>
);
