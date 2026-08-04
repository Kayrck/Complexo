import { Link } from "react-router";
import {
  ArrowRight,
  Dumbbell,
  Activity,
  Zap,
  Users,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { MfitCinematicShowcase } from "../components/MfitCinematicShowcase";
import { getBusiness } from "../data";
import ambienteNovo from "../../imports/academia/academia-sala-vermelha.png";
import ambiente1 from "../../imports/academia/Ambiente_academia_1.png";
import ambiente2 from "../../imports/academia/Ambiente_academia_2.png";
import ambiente4 from "../../imports/academia/Ambiente_academia_4.png";
import ambiente6 from "../../imports/academia/Ambiente_academia_6.png";

const academia = getBusiness("academia")!;

const FEATURES = [
  { icon: Dumbbell, title: "Musculação completa", desc: "Equipamentos de ponta para todos os grupos musculares." },
  { icon: Activity, title: "Cardio & funcional", desc: "Área dedicada a condicionamento e alta intensidade." },
  { icon: Zap, title: "Treinos no app", desc: "Sua ficha sempre na mão, com progressão automática." },
  { icon: Users, title: "Aulas coletivas", desc: "Energia em grupo todos os dias da semana." },
  { icon: ShieldCheck, title: "Avaliação física", desc: "Acompanhamento de evolução com profissionais." },
  { icon: Clock, title: "Horário estendido", desc: "Aberto cedo e até tarde para a sua rotina." },
];

const GALLERY = [ambienteNovo, ambiente1, ambiente2, ambiente4, ambiente6];

export const Academia = () => (
  <div className="bg-complexo-dark">
    {/* Hero */}
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <ImageWithFallback
        src={academia.image}
        alt="Sala de musculação da Academia Complexo"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-complexo-dark via-complexo-dark/70 to-complexo-dark/40" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">
            Complexo Academia
          </p>
          <h1 className="mt-3 font-rajdhani text-5xl font-bold uppercase leading-[0.95] lg:text-7xl">
            Estrutura de elite para a sua evolução
          </h1>
          <p className="mt-5 max-w-lg text-lg text-complexo-muted">
            A academia mais completa de Guaiúba: equipamentos premium,
            estrutura pensada pra treino sério e acompanhamento de verdade.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/planos"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-complexo-red px-7 py-3.5 font-semibold text-white hover:bg-complexo-red-bright"
            >
              Ver planos <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contato"
              className="inline-flex items-center justify-center rounded-full border border-complexo-light/15 px-7 py-3.5 font-semibold hover:bg-complexo-light/5"
            >
              Agendar visita
            </Link>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Features */}
    <section className="border-t border-complexo-light/10 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <h2 className="font-rajdhani text-3xl font-bold uppercase lg:text-4xl">
            Tudo o que você precisa para treinar
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-complexo-light/10 bg-complexo-surface p-6 transition-colors hover:border-complexo-red/40">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-complexo-red/10 text-complexo-red transition-colors group-hover:bg-complexo-red group-hover:text-white">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-rajdhani text-xl font-bold uppercase">{f.title}</h3>
                <p className="mt-1.5 text-sm text-complexo-muted">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Gallery */}
    <section className="border-t border-complexo-light/10 bg-complexo-panel py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <h2 className="font-rajdhani text-3xl font-bold uppercase lg:text-4xl">A estrutura</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {GALLERY.map((src, i) => (
            <Reveal key={src} delay={i * 0.06}>
              <div className={`overflow-hidden rounded-2xl ${i % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/3] lg:mt-12"}`}>
                <ImageWithFallback
                  src={src}
                  alt={`Estrutura da academia ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Info + CTA */}
    <section className="border-t border-complexo-light/10 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div className="rounded-2xl border border-complexo-light/10 bg-complexo-surface p-7">
            <h3 className="font-rajdhani text-2xl font-bold uppercase">Horários</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex justify-between border-b border-complexo-light/5 pb-3">
                <span className="text-complexo-muted">Segunda a Sexta</span>
                <span className="font-mono">05h30 — 22h30</span>
              </li>
              <li className="flex justify-between border-b border-complexo-light/5 pb-3">
                <span className="text-complexo-muted">Sábado</span>
                <span className="font-mono">08h00 — 14h00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-complexo-muted">Domingo</span>
                <span className="font-mono">Fechado</span>
              </li>
            </ul>
            <div className="mt-6 flex items-start gap-3 text-sm text-complexo-muted">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-complexo-red" />
              <span>
                {academia.address} — {academia.addressCity}
              </span>
            </div>
            <a
              href={academia.phoneHref}
              className="mt-3 flex items-center gap-3 text-sm text-complexo-muted hover:text-complexo-light"
            >
              <Phone className="h-5 w-5 shrink-0 text-complexo-red" />
              <span>{academia.phone}</span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col justify-center rounded-2xl border border-complexo-red bg-complexo-surface p-8 glow-red">
            <h3 className="font-rajdhani text-3xl font-bold uppercase">Comece esta semana</h3>
            <p className="mt-3 text-complexo-muted">
              Primeira avaliação física gratuita ao se matricular. Vagas
              limitadas por horário.
            </p>
            <Link
              to="/planos"
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-complexo-red px-7 py-3.5 font-semibold text-white hover:bg-complexo-red-bright"
            >
              Matricule-se <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>

    {/* App MFIT Personal — cinematic showcase */}
    <MfitCinematicShowcase />
  </div>
);
