import { Link } from "react-router";
import {
  ArrowRight,
  Dumbbell,
  Activity,
  Zap,
  Users,
  Clock,
  MapPin,
  ShieldCheck,
  Smartphone,
  MessageCircle,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import ambiente1 from "../../imports/academia/Ambiente_academia_1.png";
import ambiente2 from "../../imports/academia/Ambiente_academia_2.png";
import ambiente4 from "../../imports/academia/Ambiente_academia_4.png";
import ambiente6 from "../../imports/academia/Ambiente_academia_6.png";

const FEATURES = [
  { icon: Dumbbell, title: "Musculação completa", desc: "Equipamentos de ponta para todos os grupos musculares." },
  { icon: Activity, title: "Cardio & funcional", desc: "Área dedicada a condicionamento e alta intensidade." },
  { icon: Zap, title: "Treinos no app", desc: "Sua ficha sempre na mão, com progressão automática." },
  { icon: Users, title: "Aulas coletivas", desc: "Energia em grupo todos os dias da semana." },
  { icon: ShieldCheck, title: "Avaliação física", desc: "Acompanhamento de evolução com profissionais." },
  { icon: Clock, title: "Horário estendido", desc: "Aberto cedo e até tarde para a sua rotina." },
];

const GALLERY = [ambiente1, ambiente2, ambiente4, ambiente6];

export const Academia = () => (
  <div className="bg-complexo-dark">
    {/* Hero */}
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1600&h=900&fit=crop&auto=format"
        alt="Academia Complexo"
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
            A maior academia de Guaiúba: equipamentos premium, ambiente
            climatizado e acompanhamento de verdade.
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

    {/* App MFIT Personal */}
    <section className="border-t border-complexo-light/10 bg-complexo-panel py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">
            Complexo no seu bolso
          </p>
          <h2 className="mt-3 font-rajdhani text-4xl font-bold uppercase leading-tight lg:text-5xl">
            Seu treino, direto no app MFIT Personal
          </h2>
          <p className="mt-5 max-w-md text-lg text-complexo-muted">
            Cada aluno recebe sua ficha, sua evolução e o contato direto com o
            personal pelo MFIT Personal — um acompanhamento individualizado,
            pensado pra você e disponível no seu celular.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              { icon: Dumbbell, text: "Treino do dia sempre atualizado pelo seu personal" },
              { icon: MessageCircle, text: "Feedback e ajustes de carga em tempo real" },
              { icon: Flame, text: "Progresso, frequência e metas acompanhados de perto" },
            ].map((item) => (
              <li key={item.text} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-complexo-red/10 text-complexo-red">
                  <item.icon className="h-4.5 w-4.5" />
                </span>
                <span className="mt-1.5 text-sm font-medium text-complexo-light/90">{item.text}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="flex justify-center">
          <div className="animate-float w-[260px]">
            <div className="rounded-[2.5rem] border border-complexo-light/10 bg-complexo-dark p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
              <div className="overflow-hidden rounded-[2rem] bg-complexo-surface">
                {/* status bar / notch */}
                <div className="flex items-center justify-center bg-complexo-dark py-3">
                  <div className="h-1.5 w-16 rounded-full bg-complexo-light/15" />
                </div>

                <div className="space-y-5 px-4 pb-6">
                  <div className="flex items-center gap-2 pt-1">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-complexo-red">
                      <Smartphone className="h-4 w-4 text-white" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest">MFIT Personal</p>
                      <p className="text-[10px] text-complexo-muted">Olá, Atleta</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-complexo-muted">
                      Treino de hoje
                    </p>
                    <div className="mt-2 space-y-2">
                      {[
                        { name: "Supino reto", sets: "4x10", done: true },
                        { name: "Puxada frente", sets: "4x12", done: true },
                        { name: "Elevação lateral", sets: "3x15", done: false },
                      ].map((ex) => (
                        <div
                          key={ex.name}
                          className="flex items-center justify-between rounded-xl bg-complexo-dark px-3 py-2.5"
                        >
                          <div>
                            <p className="text-xs font-semibold">{ex.name}</p>
                            <p className="text-[10px] text-complexo-muted">{ex.sets}</p>
                          </div>
                          <CheckCircle2
                            className={`h-4 w-4 ${ex.done ? "text-complexo-red" : "text-complexo-light/15"}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-complexo-red/10 p-3">
                    <div className="flex items-start gap-2">
                      <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-complexo-red" />
                      <p className="text-[11px] leading-relaxed text-complexo-light/90">
                        "Boa evolução essa semana! Vamos subir a carga no supino."
                      </p>
                    </div>
                    <p className="mt-1.5 text-[9px] uppercase tracking-widest text-complexo-muted">
                      Seu personal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
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
              <span>Ao lado do Depósito do Angelo, Guaiúba/CE</span>
            </div>
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
  </div>
);
