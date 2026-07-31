import { useState } from "react";
import { Link } from "react-router";
import { Check, Wind, HeartPulse, Sparkles, ArrowRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const BENEFITS = [
  { icon: Wind, title: "Mobilidade", desc: "Mais amplitude e liberdade de movimento no dia a dia." },
  { icon: HeartPulse, title: "Postura & alívio", desc: "Reduz dores e corrige padrões posturais." },
  { icon: Sparkles, title: "Bem-estar", desc: "Equilíbrio entre corpo e mente, no seu ritmo." },
];

const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const TIMES = ["07:00", "09:00", "11:00", "15:00", "17:00", "19:00"];

export const Pilates = () => {
  const [day, setDay] = useState("Seg");
  const [time, setTime] = useState("");
  const [booked, setBooked] = useState(false);

  return (
    <div className="bg-pilates-bg text-pilates-text">
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">
              Complexo Pilates
            </p>
            <h1 className="mt-3 font-rajdhani text-5xl font-bold uppercase leading-[0.95] lg:text-6xl">
              Respire. Alongue. Recupere.
            </h1>
            <p className="mt-5 max-w-md text-lg text-pilates-muted">
              Um estúdio leve e acolhedor para cuidar do corpo com método e
              atenção individual. O contraponto perfeito ao treino intenso.
            </p>
            <a
              href="#agendar"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-pilates-text px-7 py-3.5 font-semibold text-pilates-bg hover:bg-complexo-red hover:text-white"
            >
              Agendar aula experimental <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-pilates-surface">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&h=1100&fit=crop&auto=format"
                alt="Aula de Pilates"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl bg-white p-8 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-complexo-red/10 text-complexo-red">
                    <b.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-rajdhani text-2xl font-bold uppercase">{b.title}</h3>
                  <p className="mt-2 text-pilates-muted">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Scheduling */}
      <section id="agendar" className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Reveal>
            <div className="rounded-3xl bg-white p-8 shadow-sm lg:p-10">
              <h2 className="font-rajdhani text-3xl font-bold uppercase">Agende sua aula</h2>
              <p className="mt-2 text-pilates-muted">
                Escolha o melhor dia e horário. Confirmamos por WhatsApp.
              </p>

              {!booked ? (
                <>
                  <p className="mt-8 mb-3 font-mono text-xs uppercase tracking-widest text-pilates-muted">
                    Dia
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {DAYS.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDay(d)}
                        className={`h-12 w-14 rounded-xl text-sm font-semibold ${
                          day === d
                            ? "bg-pilates-text text-pilates-bg"
                            : "bg-pilates-surface text-pilates-text hover:bg-pilates-surface/70"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  <p className="mt-7 mb-3 font-mono text-xs uppercase tracking-widest text-pilates-muted">
                    Horário
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {TIMES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`h-12 rounded-xl text-sm font-semibold ${
                          time === t
                            ? "bg-complexo-red text-white"
                            : "bg-pilates-surface text-pilates-text hover:bg-pilates-surface/70"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => time && setBooked(true)}
                    disabled={!time}
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-complexo-red px-7 py-4 font-semibold text-white enabled:hover:bg-complexo-red-bright disabled:opacity-40"
                  >
                    {time ? `Confirmar ${day} às ${time}` : "Selecione um horário"}
                  </button>
                </>
              ) : (
                <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl bg-pilates-surface p-8 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-complexo-red text-white">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="font-rajdhani text-2xl font-bold uppercase">Aula reservada!</h3>
                  <p className="text-pilates-muted">
                    {day} às {time}. Em breve entraremos em contato para confirmar.
                  </p>
                  <button
                    onClick={() => {
                      setBooked(false);
                      setTime("");
                    }}
                    className="font-semibold text-complexo-red"
                  >
                    Agendar outra
                  </button>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal className="mt-8 text-center text-sm text-pilates-muted">
            <p>
              Também faz parte da academia?{" "}
              <Link to="/planos" className="font-semibold text-complexo-red">
                Pilates está incluso nos planos Performance e Elite.
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
