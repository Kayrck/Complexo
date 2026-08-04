import { useState } from "react";
import { Link } from "react-router";
import {
  Check,
  Wind,
  HeartPulse,
  Sparkles,
  ArrowRight,
  MapPin,
  Phone,
  Snowflake,
  Stethoscope,
  Hand,
  Flame,
  Droplets,
  Ear,
  Bandage,
  Waves,
  Footprints,
} from "lucide-react";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getBusiness } from "../data";
import massoterapiaImg from "../../imports/pilates/massoterapia.png";
import recoveryImg from "../../imports/pilates/recovery-banheira-gelo.png";

const pilates = getBusiness("pilates")!;

const BENEFITS = [
  { icon: Wind, title: "Mobilidade", desc: "Mais amplitude e liberdade de movimento no dia a dia." },
  { icon: HeartPulse, title: "Postura & alívio", desc: "Reduz dores e corrige padrões posturais." },
  { icon: Sparkles, title: "Bem-estar", desc: "Equilíbrio entre corpo e mente, no seu ritmo." },
];

const SERVICES = [
  { icon: Stethoscope, title: "Fisioterapia", desc: "Reabilitação e tratamento de lesões com acompanhamento especializado." },
  { icon: Hand, title: "Liberação Muscular / Miofascial", desc: "Alívio de tensões e pontos de gatilho para mais mobilidade." },
  { icon: Flame, title: "Pedras Quentes", desc: "Terapia com calor para relaxamento profundo e melhora da circulação." },
  { icon: Droplets, title: "Drenagem Linfática", desc: "Estímulo circulatório que reduz inchaço e retenção de líquidos." },
  { icon: Ear, title: "Auriculoterapia", desc: "Estímulo de pontos auriculares para equilíbrio e bem-estar." },
  { icon: Bandage, title: "Bandagem Funcional", desc: "Suporte articular e muscular para treinar e recuperar com mais segurança." },
];

const RECOVERY_ITEMS = [
  { icon: Snowflake, label: "Banheira de gelo" },
  { icon: Footprints, label: "Botas de compressão" },
];

const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const TIMES = ["07:00", "09:00", "11:00", "15:00", "17:00", "19:00"];

export const Pilates = () => {
  const [day, setDay] = useState("Seg");
  const [time, setTime] = useState("");
  const [booked, setBooked] = useState(false);

  return (
    <div className="bg-pilates-bg text-pilates-text">
      {/* Hero — composição editorial: título centralizado + 3 fotos assimétricas */}
      <section className="overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-2xl px-5 text-center lg:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">
              Complexo Pilates
            </p>
            <h1 className="mt-4 font-rajdhani text-5xl font-bold uppercase leading-[0.95] lg:text-7xl">
              Respire. Alongue. Recupere.
            </h1>
            <p className="mx-auto mt-6 max-w-md text-lg text-pilates-muted">
              Um estúdio leve e acolhedor para cuidar do corpo com método e
              atenção individual — o contraponto perfeito ao treino intenso.
            </p>
            <a
              href="#agendar"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-pilates-text px-7 py-3.5 font-semibold text-pilates-bg hover:bg-complexo-red hover:text-white"
            >
              Agendar aula experimental <ArrowRight className="h-4 w-4" />
            </a>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-pilates-muted">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-complexo-red" />
                {pilates.address} — {pilates.addressCity}
              </span>
              <a
                href={pilates.phoneHref}
                className="inline-flex items-center gap-2 hover:text-pilates-text"
              >
                <Phone className="h-4 w-4 text-complexo-red" />
                {pilates.phone}
              </a>
              <span className="inline-flex items-center gap-2">
                <Snowflake className="h-4 w-4 text-complexo-red" />
                Ambiente climatizado
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mx-auto mt-16 max-w-5xl px-5 sm:mt-20 lg:mt-24 lg:px-8">
          <div className="grid grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
            <div className="mt-10 sm:mt-14 lg:mt-20">
              <div className="aspect-[3/4] overflow-hidden rounded-[1.25rem] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)] sm:rounded-[1.75rem] lg:rounded-[2.25rem]">
                <ImageWithFallback
                  src={massoterapiaImg}
                  alt="Massoterapia — ambiente da Complexo Pilates"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="aspect-[3/5] overflow-hidden rounded-[1.25rem] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)] sm:rounded-[1.75rem] lg:rounded-[2.25rem]">
                <ImageWithFallback
                  src={pilates.image}
                  alt="Aula de Pilates na Complexo"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="mt-16 sm:mt-24 lg:mt-32">
              <div className="aspect-[3/4] overflow-hidden rounded-[1.25rem] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)] sm:rounded-[1.75rem] lg:rounded-[2.25rem]">
                <ImageWithFallback
                  src={recoveryImg}
                  alt="Recovery — banheira de gelo na Complexo Pilates"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
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

      {/* Serviços */}
      <section className="border-t border-pilates-text/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">
              Muito além do Pilates
            </p>
            <h2 className="mt-3 font-rajdhani text-3xl font-bold uppercase lg:text-4xl">
              Recuperação completa, em um só lugar
            </h2>
            <p className="mt-4 text-lg text-pilates-muted">
              Terapias complementares para aliviar, recuperar e manter o corpo pronto pra
              evoluir.
            </p>
          </Reveal>

          {/* Featured: Massoterapia + Recovery */}
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="relative h-72 overflow-hidden rounded-3xl">
                <ImageWithFallback
                  src={massoterapiaImg}
                  alt="Massoterapia na Complexo Pilates"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-7">
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-complexo-red text-white">
                    <Waves className="h-5 w-5" />
                  </span>
                  <h3 className="font-rajdhani text-2xl font-bold uppercase text-white">
                    Massoterapia
                  </h3>
                  <p className="mt-1 max-w-xs text-sm text-white/80">
                    Técnicas manuais para aliviar tensões e relaxar profundamente.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative h-72 overflow-hidden rounded-3xl">
                <ImageWithFallback
                  src={recoveryImg}
                  alt="Recovery — banheira de gelo na Complexo Pilates"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-7">
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-complexo-red text-white">
                    <Snowflake className="h-5 w-5" />
                  </span>
                  <h3 className="font-rajdhani text-2xl font-bold uppercase text-white">
                    Recovery
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/80">
                    {RECOVERY_ITEMS.map((r) => (
                      <span key={r.label} className="inline-flex items-center gap-1.5">
                        <r.icon className="h-3.5 w-3.5" /> {r.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Demais terapias */}
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="h-full rounded-3xl bg-white p-7 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-complexo-red/10 text-complexo-red">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-rajdhani text-xl font-bold uppercase">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-pilates-muted">{s.desc}</p>
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
