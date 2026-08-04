import { Link } from "react-router";
import {
  ArrowRight,
  MapPin,
  Phone,
  Check,
  Target,
  Dumbbell,
  Pill,
  TrendingUp,
  Sparkles,
  Smartphone,
  UtensilsCrossed,
  Camera,
  Droplet,
  MessageCircle,
} from "lucide-react";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getBusiness } from "../data";
import laraImg from "../../imports/nutricao/lara-maia.jpg";

const nutricao = getBusiness("nutricao")!;

const AGENDAR_HREF = `${nutricao.whatsappHref}?text=${encodeURIComponent(
  "Olá! Quero agendar uma consulta com a nutricionista Lara Maia 🙂",
)}`;

const BENEFITS = [
  {
    icon: Target,
    title: "Acompanhamento personalizado",
    desc: "Um plano alimentar pensado pra sua rotina, seus objetivos e seu treino.",
  },
  {
    icon: Dumbbell,
    title: "Treine na Complexo com muito mais estratégia",
    desc: "Nutrição e musculação trabalhando juntas rumo ao mesmo resultado.",
  },
  {
    icon: Pill,
    title: "Orientação sobre a suplementação ideal",
    desc: "Entenda o que realmente faz sentido pra você — sem modismo, com critério.",
  },
  {
    icon: TrendingUp,
    title: "Acompanhamento durante toda sua evolução",
    desc: "Ajustes constantes ao longo da jornada, não só na primeira consulta.",
  },
];

const APP_FEATURES = [
  { icon: UtensilsCrossed, text: "Plano alimentar sempre à mão, com substituições liberadas pela nutricionista" },
  { icon: Camera, text: "Registro das refeições com fotos, direto no diário alimentar" },
  { icon: Droplet, text: "Lembretes e controle da sua ingestão de água ao longo do dia" },
  { icon: MessageCircle, text: "Comentários e ajustes da Lara sobre o que você registrou" },
  { icon: TrendingUp, text: "Evolução acompanhada continuamente, não só na consulta" },
];

const PRICING = [
  {
    id: "consulta",
    name: "Consulta Nutri Complexo",
    tagline: "Acompanhamento completo",
    price: 160,
    popular: false,
    features: [
      "Avaliação nutricional completa",
      "Plano alimentar personalizado",
      "Orientação sobre suplementação",
      "Acompanhamento da evolução",
    ],
  },
  {
    id: "metodo",
    name: "Método Nutri Complexo",
    tagline: "Musculação + Acompanhamento Nutricional",
    price: 210,
    popular: true,
    features: [
      "Tudo da Consulta Nutri Complexo",
      "Acesso à musculação Complexo",
      "Treino e alimentação alinhados",
      "Estratégia completa de evolução",
    ],
  },
];

export const Nutricao = () => (
  <div className="bg-complexo-dark">
    {/* Hero */}
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute -left-40 top-20 h-[600px] w-[600px] rounded-full bg-complexo-red/10 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">
            Nutri Complexo
          </p>
          <h1 className="mt-3 font-rajdhani text-4xl font-bold uppercase leading-[1.05] lg:text-6xl">
            Você não precisa escolher entre treinar ou cuidar da sua alimentação
          </h1>
          <p className="mt-5 max-w-lg text-lg text-complexo-muted">
            Agora você pode ter os dois. Pensando em oferecer um cuidado mais completo,
            nasceu o <span className="text-complexo-light">Método Nutri Complexo</span>: um
            projeto que une musculação e acompanhamento nutricional para ajudar você a
            conquistar resultados com estratégia, constância e orientação profissional.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={AGENDAR_HREF}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-complexo-red px-7 py-3.5 font-semibold text-white hover:bg-complexo-red-bright"
            >
              Agendar consulta <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/contato"
              className="inline-flex items-center justify-center rounded-full border border-complexo-light/15 px-7 py-3.5 font-semibold hover:bg-complexo-light/5"
            >
              Falar com a equipe
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-complexo-muted">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-complexo-red" />
              {nutricao.address} — {nutricao.addressCity}
            </span>
            <a href={nutricao.phoneHref} className="inline-flex items-center gap-2 hover:text-complexo-light">
              <Phone className="h-4 w-4 text-complexo-red" />
              {nutricao.phone}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-complexo-light/10 bg-complexo-surface">
            <div className="aspect-[4/5] overflow-hidden">
              <ImageWithFallback
                src={laraImg}
                alt="Lara Maia, nutricionista do Grupo Complexo"
                className="h-full w-full object-cover"
                style={{ objectPosition: "center 20%" }}
              />
            </div>
            <div className="p-6">
              <p className="font-rajdhani text-2xl font-bold uppercase">Lara Maia</p>
              <p className="mt-1 text-sm text-complexo-muted">Nutricionista · Nutri Complexo</p>
              <p className="mt-3 text-sm leading-relaxed text-complexo-light/80">
                Une ciência e prática para criar planos alimentares reais, feitos pra sua
                rotina — sem dietas da moda, sem regras impossíveis de seguir.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Benefícios */}
    <section className="border-t border-complexo-light/10 bg-complexo-panel py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">Benefícios</p>
          <h2 className="mt-3 font-rajdhani text-3xl font-bold uppercase lg:text-4xl">
            Cuidado completo, feito pra durar
          </h2>
          <p className="mt-4 text-lg text-complexo-muted">
            Tudo pensado para tornar o cuidado com sua saúde mais completo e acessível.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-complexo-light/10 bg-complexo-surface p-6 transition-colors hover:border-complexo-red/40">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-complexo-red/10 text-complexo-red transition-colors group-hover:bg-complexo-red group-hover:text-white">
                  <b.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-rajdhani text-lg font-bold uppercase leading-tight">
                  {b.title}
                </h3>
                <p className="mt-1.5 text-sm text-complexo-muted">{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* App nutricional */}
    <section className="border-t border-complexo-light/10 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">
            Tecnologia + acompanhamento humano
          </p>
          <h2 className="mt-3 font-rajdhani text-4xl font-bold uppercase leading-tight lg:text-5xl">
            Sua jornada nutricional, sempre no seu bolso
          </h2>
          <p className="mt-5 max-w-md text-lg text-complexo-muted">
            A Lara acompanha cada paciente por um aplicativo de nutrição
            dedicado — a tecnologia não substitui o atendimento humano, ela
            completa: mais praticidade, organização e constância entre uma
            consulta e outra.
          </p>
          <ul className="mt-8 space-y-4">
            {APP_FEATURES.map((item) => (
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
          <div className="animate-float w-[280px]">
            <div className="rounded-[2.5rem] border border-complexo-light/10 bg-complexo-dark p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
              <div className="overflow-hidden rounded-[2rem] bg-complexo-surface">
                <div className="flex items-center justify-center bg-complexo-dark py-3">
                  <div className="h-1.5 w-16 rounded-full bg-complexo-light/15" />
                </div>

                <div className="flex min-h-[540px] flex-col justify-between space-y-8 px-4 pb-8 pt-2">
                  <div className="flex items-center gap-2 pt-1">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-complexo-red">
                      <Smartphone className="h-4 w-4 text-white" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest">App Nutricional</p>
                      <p className="text-[10px] text-complexo-muted">Olá, Aluno</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-complexo-muted">
                      Hidratação hoje
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <Droplet
                          key={i}
                          className={`h-4 w-4 ${i < 6 ? "fill-complexo-red text-complexo-red" : "text-complexo-light/15"}`}
                        />
                      ))}
                    </div>
                    <p className="mt-1.5 text-[10px] text-complexo-muted">6 de 8 copos</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-complexo-muted">
                      Refeições de hoje
                    </p>
                    <div className="mt-2 space-y-2">
                      {[
                        { name: "Café da manhã", done: true },
                        { name: "Almoço", done: true },
                        { name: "Lanche da tarde", done: false },
                      ].map((meal) => (
                        <div
                          key={meal.name}
                          className="flex items-center justify-between rounded-xl bg-complexo-dark px-3 py-2.5"
                        >
                          <span className="text-xs font-semibold">{meal.name}</span>
                          {meal.done ? (
                            <Check className="h-4 w-4 text-complexo-red" />
                          ) : (
                            <Camera className="h-4 w-4 text-complexo-light/25" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-complexo-red/10 p-3">
                    <div className="flex items-start gap-2">
                      <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-complexo-red" />
                      <p className="text-[11px] leading-relaxed text-complexo-light/90">
                        Ótimo controle essa semana! Vamos ajustar o jantar na próxima consulta.
                      </p>
                    </div>
                    <p className="mt-1.5 text-[9px] uppercase tracking-widest text-complexo-muted">
                      Sua nutricionista
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Valores */}
    <section className="border-t border-complexo-light/10 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">Valores</p>
          <h2 className="mt-3 font-rajdhani text-4xl font-bold uppercase lg:text-5xl">
            Escolha seu ponto de partida
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:mx-auto md:max-w-3xl">
          {PRICING.map((plan) => (
            <Reveal key={plan.id} delay={plan.popular ? 0.08 : 0}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                  plan.popular
                    ? "border-complexo-red bg-complexo-surface glow-red"
                    : "border-complexo-light/10 bg-complexo-surface"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-complexo-red px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
                    Melhor custo-benefício
                  </span>
                )}
                <h3 className="font-rajdhani text-2xl font-bold uppercase">{plan.name}</h3>
                <p className="mt-1 text-sm text-complexo-muted">{plan.tagline}</p>
                <div className="mt-6 flex items-end gap-1">
                  <span className="font-rajdhani text-5xl font-bold">R${plan.price}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-complexo-red" />
                      <span className="text-complexo-light/85">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={AGENDAR_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-7 inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold ${
                    plan.popular
                      ? "bg-complexo-red text-white hover:bg-complexo-red-bright"
                      : "border border-complexo-light/15 text-complexo-light hover:bg-complexo-light/5"
                  }`}
                >
                  Agendar {plan.name}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Destaque */}
        <Reveal delay={0.12} className="mt-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-complexo-red/40 bg-complexo-red/10 p-8 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-complexo-red text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <p className="max-w-xl text-lg leading-relaxed text-complexo-light">
              Você não precisa mais escolher entre começar pela academia ou pela alimentação.
              No Método Nutri Complexo, os dois caminham juntos.
            </p>
            <p className="max-w-xl text-complexo-muted">
              Resultados consistentes começam com um cuidado completo. Por apenas{" "}
              <span className="font-semibold text-complexo-light">R$50,00 a mais</span>, você
              transforma uma consulta em um plano completo de evolução.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
);
