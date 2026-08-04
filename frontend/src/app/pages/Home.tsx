import { Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Dumbbell,
  Salad,
  Moon,
  Check,
  Star,
  Users,
  MessageCircle,
} from "lucide-react";
import { Bolt3D } from "../components/Bolt3D";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PLANS, UNIVERSE, getBusiness } from "../data";
import { useAppContext } from "../context";

export const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <Hero />
      <StatStrip />
      <Universo />
      <Experiencia />
      <PlanosPreview />
      <Loja />
      <PilatesTease />
      <Avaliacoes />
      <CTAFinal />
    </div>
  );
};

/* ----------------------------- HERO ----------------------------- */

const Hero = () => (
  <section className="relative min-h-screen overflow-hidden bg-complexo-dark">
    {/* soft radial accent — quiet, not loud */}
    <div className="pointer-events-none absolute -right-40 top-0 h-[700px] w-[700px] rounded-full bg-complexo-red/10 blur-[140px]" />

    <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-5 pt-24 pb-16 lg:grid-cols-2 lg:px-8 lg:pt-16">
      {/* Copy */}
      <div className="relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-complexo-light/10 bg-complexo-light/5 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-complexo-muted"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-complexo-red" />
          O ecossistema fitness de Guaiúba
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-6 font-rajdhani text-5xl font-bold uppercase leading-[0.95] sm:text-6xl lg:text-7xl"
        >
          Seu próximo
          <br />
          nível começa
          <br />
          <span className="text-gradient-red">aqui.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 max-w-md text-lg leading-relaxed text-complexo-muted"
        >
          Academia, suplementos e pilates em um só lugar. Estrutura premium,
          tecnologia e acompanhamento para transformar seu corpo de verdade.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            to="/planos"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-complexo-red px-7 py-3.5 font-semibold text-white hover:bg-complexo-red-bright"
          >
            Matricule-se
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/academia"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-complexo-light/15 px-7 py-3.5 font-semibold text-complexo-light hover:bg-complexo-light/5"
          >
            Conhecer a estrutura
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex items-center gap-2.5 text-sm text-complexo-muted"
        >
          <Users className="h-4 w-4 text-complexo-red" />
          <span>+1.500 alunos já evoluindo</span>
        </motion.div>
      </div>

      {/* 3D bolt */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative h-[260px] sm:h-[320px] lg:h-[420px]"
      >
        <Bolt3D className="h-full w-full" />
      </motion.div>
    </div>
  </section>
);

/* --------------------------- STAT STRIP --------------------------- */

const STATS = [
  { value: "1.500+", label: "Alunos ativos" },
  { value: "4", label: "Anos de mercado" },
  { value: "3", label: "Unidades de negócio" },
  { value: "9+", label: "Serviços de bem-estar" },
];

const StatStrip = () => (
  <section className="border-y border-complexo-light/10 bg-complexo-panel">
    <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-complexo-light/10 px-5 lg:grid-cols-4 lg:px-8">
      {STATS.map((s) => (
        <div key={s.label} className="flex flex-col items-center gap-1 py-8">
          <span className="font-rajdhani text-3xl font-bold lg:text-4xl">{s.value}</span>
          <span className="font-mono text-xs uppercase tracking-widest text-complexo-muted">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  </section>
);

/* -------------------------- UNIVERSO --------------------------- */

const Universo = () => (
  <section className="bg-complexo-dark py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">
          Universo Complexo
        </p>
        <h2 className="mt-3 font-rajdhani text-4xl font-bold uppercase lg:text-5xl">
          Quatro negócios, um só ecossistema
        </h2>
        <p className="mt-4 text-lg text-complexo-muted">
          Tudo conectado para acelerar sua evolução, do treino à recuperação e à alimentação.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {UNIVERSE.map((biz, i) => (
          <Reveal key={biz.id} delay={i * 0.08}>
            <Link
              to={biz.to}
              className="relative block h-[440px] overflow-hidden rounded-2xl border border-complexo-light/10 bg-complexo-surface"
            >
              {biz.image ? (
                <>
                  <ImageWithFallback
                    src={biz.image}
                    alt={`${biz.fullName} — ${biz.desc}`}
                    className="absolute inset-0 h-full w-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-complexo-dark via-complexo-dark/40 to-transparent" />
                </>
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(160deg, #3a0b09 0%, #0a0705 65%, #050403 100%)" }}
                >
                  <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-complexo-red/20 blur-[70px]" />
                </div>
              )}
              <div className="relative flex h-full flex-col justify-end p-7">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-complexo-red text-white">
                  <biz.icon className="h-5 w-5" />
                </span>
                <h3 className="font-rajdhani text-2xl font-bold uppercase">{biz.name}</h3>
                <p className="mt-2 max-w-xs text-sm text-complexo-light/70">{biz.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-complexo-red">
                  Explorar
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------- EXPERIÊNCIA ------------------------- */

const PILLARS = [
  {
    icon: Dumbbell,
    title: "Treino",
    desc: "Programas guiados por especialistas, do iniciante ao avançado, com tecnologia de acompanhamento.",
  },
  {
    icon: Salad,
    title: "Nutrição",
    desc: "Suplementação certa no momento certo, com orientação para potencializar cada resultado.",
  },
  {
    icon: Moon,
    title: "Recuperação",
    desc: "Pilates, mobilidade e descanso ativo para o corpo evoluir de forma sustentável.",
  },
];

const Experiencia = () => (
  <section className="border-t border-complexo-light/10 bg-complexo-panel py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">
            A experiência Complexo
          </p>
          <h2 className="mt-3 font-rajdhani text-4xl font-bold uppercase lg:text-5xl">
            Um método que une os três pilares da evolução
          </h2>
          <p className="mt-4 max-w-md text-lg text-complexo-muted">
            Não basta treinar. A transformação real acontece quando treino,
            nutrição e recuperação trabalham juntos. É isso que conecta todo o
            ecossistema Complexo.
          </p>
          <Link
            to="/academia"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-complexo-light/15 px-6 py-3 font-semibold hover:bg-complexo-light/5"
          >
            Como funciona <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="flex flex-col gap-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="group flex gap-5 rounded-2xl border border-complexo-light/10 bg-complexo-surface p-6 transition-colors hover:border-complexo-red/40">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-complexo-red/10 text-complexo-red transition-colors group-hover:bg-complexo-red group-hover:text-white">
                  <p.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-rajdhani text-xl font-bold uppercase">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-complexo-muted">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ------------------------ PLANOS PREVIEW ------------------------ */

const PlanosPreview = () => (
  <section className="bg-complexo-dark py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">Planos</p>
        <h2 className="mt-3 font-rajdhani text-4xl font-bold uppercase lg:text-5xl">
          Escolha como quer evoluir
        </h2>
        <p className="mt-4 text-lg text-complexo-muted">
          Sem letras miúdas. Cancele quando quiser.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
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
                <span className="font-rajdhani text-5xl font-bold">R${plan.price}</span>
                <span className="mb-2 text-sm text-complexo-muted">/mês</span>
              </div>
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

      <Reveal className="mt-8 text-center">
        <Link
          to="/planos"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-complexo-red"
        >
          Comparar todos os planos <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </div>
  </section>
);

/* ---------------------------- LOJA ---------------------------- */

const Loja = () => {
  const { products } = useAppContext();

  return (
  <section className="border-t border-complexo-light/10 bg-complexo-panel py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">Loja</p>
          <h2 className="mt-3 font-rajdhani text-4xl font-bold uppercase lg:text-5xl">
            Suplementos que entregam
          </h2>
        </div>
        <Link
          to="/suplementos"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-complexo-red"
        >
          Ver loja completa <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </div>

    {/* horizontal snap carousel */}
    <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 lg:px-8 [scrollbar-width:none]">
      {products.map((p) => (
        <Link
          key={p.id}
          to={`/suplementos/${p.id}`}
          className="relative w-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-complexo-light/10 bg-complexo-surface"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <div
              className="absolute inset-0 opacity-45 blur-2xl"
              style={{ background: p.accent }}
            />
            <ImageWithFallback
              src={p.image}
              alt={p.name}
              className="relative h-full w-full object-cover"
            />
          </div>
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-complexo-muted">
              {p.category}
            </p>
            <h3 className="mt-1 font-semibold">{p.name}</h3>
            <p className="mt-3 font-rajdhani text-xl font-bold">R${p.price}</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
  );
};

/* ------------------------ PILATES TEASE ------------------------ */

const PilatesTease = () => (
  <section className="bg-pilates-bg py-24 text-pilates-text lg:py-32">
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
      <Reveal>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-pilates-surface">
          <ImageWithFallback
            src={getBusiness("pilates")!.image}
            alt="Estúdio de Pilates Complexo"
            className="h-full w-full object-cover"
          />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">
          Complexo Pilates
        </p>
        <h2 className="mt-3 font-rajdhani text-4xl font-bold uppercase lg:text-5xl">
          O lado humano da evolução
        </h2>
        <p className="mt-4 max-w-md text-lg text-pilates-muted">
          Um ambiente leve e acolhedor para mobilidade, postura e recuperação.
          Porque cuidar do corpo também é cuidar de como você se sente.
        </p>
        <Link
          to="/pilates"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-pilates-text px-7 py-3.5 font-semibold text-pilates-bg hover:bg-complexo-red hover:text-white"
        >
          Agendar uma aula <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </div>
  </section>
);

/* ------------------------ AVALIAÇÕES ------------------------ */

const Avaliacoes = () => (
  <section className="border-t border-complexo-light/10 bg-complexo-dark py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">
          Avaliações
        </p>
        <h2 className="mt-3 font-rajdhani text-4xl font-bold uppercase lg:text-5xl">
          Sua opinião constrói a Complexo
        </h2>
        <p className="mt-4 text-lg text-complexo-muted">
          Ainda não temos avaliações públicas por aqui. Preferimos deixar em branco a
          inventar alguma. Assim que os primeiros alunos avaliarem, elas aparecem nesta seção.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-dashed border-complexo-light/15 bg-complexo-surface px-6 py-14 text-center">
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-6 w-6 text-complexo-light/15" />
            ))}
          </div>
          <div>
            <h3 className="font-rajdhani text-2xl font-bold uppercase">
              Nenhuma avaliação ainda
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-complexo-muted">
              Treinou, fez pilates, consultou com a nutricionista ou comprou na loja? Conte
              como foi: sua avaliação ajuda outras pessoas a conhecerem a Complexo.
            </p>
          </div>
          <a
            href={`https://wa.me/5585986830769?text=${encodeURIComponent(
              "Olá! Gostaria de deixar minha avaliação sobre a Complexo 🙂",
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-complexo-red px-7 py-3.5 font-semibold text-white hover:bg-complexo-red-bright"
          >
            <MessageCircle className="h-4 w-4" />
            Deixar minha avaliação
          </a>
          <p className="text-xs text-complexo-muted">
            Em breve, integradas ao Google Reviews. Por enquanto, enviadas direto pra nossa equipe.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ------------------------- CTA FINAL ------------------------- */

const CTAFinal = () => (
  <section className="relative overflow-hidden bg-complexo-red py-24 lg:py-32">
    <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_center,rgba(0,0,0,0.6),transparent_60%)]" />
    <Reveal className="relative mx-auto max-w-3xl px-5 text-center text-white">
      <h2 className="font-rajdhani text-4xl font-bold uppercase leading-tight sm:text-6xl">
        Pronto para o seu próximo nível?
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-lg text-white/85">
        Comece hoje. Primeira semana com avaliação física gratuita.
      </p>
      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          to="/planos"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 font-semibold text-white hover:bg-black/80"
        >
          Matricule-se agora <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/contato"
          className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-4 font-semibold text-white hover:bg-white/10"
        >
          Falar com a equipe
        </Link>
      </div>
    </Reveal>
  </section>
);
