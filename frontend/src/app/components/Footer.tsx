import { Instagram, MapPin, Phone, MessageCircle, Snowflake } from "lucide-react";
import { Link, useLocation } from "react-router";
import { BoltMark } from "./BoltMark";
import { BUSINESSES } from "../data";

const COLUMNS = [
  {
    title: "Grupo",
    links: [
      { label: "Academia", to: "/academia" },
      { label: "Planos", to: "/planos" },
      { label: "Suplementos", to: "/suplementos" },
      { label: "Pilates", to: "/pilates" },
      { label: "Nutrição", to: "/nutricao" },
    ],
  },
  {
    title: "Conta",
    links: [
      { label: "Área do Aluno", to: "/login" },
      { label: "Matrícula", to: "/planos" },
      { label: "Contato", to: "/contato" },
    ],
  },
];

/** Shared city-area reference map — the group's units are all a few streets
 * apart in Guaiúba/CE, so one bbox is used rather than guessing per-address
 * coordinates we can't verify. */
const MAP_EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=-38.65%2C-4.06%2C-38.60%2C-4.02&layer=mapnik";

/** Footer scoped to whichever business unit the visitor is currently browsing. */
const BusinessFooter = ({ biz }: { biz: (typeof BUSINESSES)[number] }) => (
  <footer className="border-t border-complexo-light/10 bg-complexo-dark text-complexo-light">
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Link to="/" className="mb-5 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-complexo-red">
              <BoltMark className="h-5 w-5 text-white" />
            </span>
            <span className="font-rajdhani text-xl font-bold uppercase tracking-[0.18em]">
              Complexo
            </span>
          </Link>

          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-complexo-red">
            <biz.icon className="h-4 w-4" />
            {biz.fullName}
          </p>

          <div className="mt-5 space-y-3 text-sm text-complexo-light/80">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-complexo-red" />
              <span>
                {biz.address} — {biz.addressCity}
              </span>
            </div>
            <a
              href={biz.phoneHref}
              className="flex items-center gap-3 transition-colors hover:text-complexo-light"
            >
              <Phone className="h-5 w-5 shrink-0 text-complexo-red" />
              {biz.phone}
            </a>
            {biz.climatizado && (
              <div className="flex items-center gap-3">
                <Snowflake className="h-5 w-5 shrink-0 text-complexo-red" />
                Ambiente climatizado
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={biz.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-complexo-red px-5 py-2.5 text-sm font-semibold text-white hover:bg-complexo-red-bright"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-complexo-light/15 px-5 py-2.5 text-sm font-semibold hover:bg-complexo-light/5"
            >
              Ver todo o Complexo
            </Link>
          </div>
        </div>

        <div className="h-56 overflow-hidden rounded-2xl border border-complexo-light/10 lg:h-full lg:min-h-[220px]">
          <iframe
            title={`Mapa — ${biz.fullName}`}
            className="h-full w-full grayscale"
            loading="lazy"
            src={MAP_EMBED_SRC}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-complexo-light/10 pt-6 text-xs text-complexo-muted sm:flex-row">
        <p>© 2026 Grupo Complexo. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-complexo-red">Privacidade</a>
          <a href="#" className="hover:text-complexo-red">Termos</a>
        </div>
      </div>
    </div>
  </footer>
);

/** Default footer — shown on Home, Planos, Contato and every other page that
 * isn't scoped to one business unit. Lists every unit's contact info. */
const GenericFooter = () => (
  <footer className="border-t border-complexo-light/10 bg-complexo-dark text-complexo-light">
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="mb-5 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-complexo-red">
              <BoltMark className="h-5 w-5 text-white" />
            </span>
            <span className="font-rajdhani text-xl font-bold uppercase tracking-[0.18em]">
              Complexo
            </span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-complexo-muted">
            O ecossistema fitness de Guaiúba: academia, pilates, suplementação e
            nutrição em um só lugar. Energia em forma de evolução.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-complexo-light/10 text-complexo-light hover:border-complexo-red hover:bg-complexo-red"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-5 font-mono text-xs uppercase tracking-widest text-complexo-muted">
              {col.title}
            </h4>
            <ul className="space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-complexo-light/80 transition-colors hover:text-complexo-red"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 border-t border-complexo-light/10 pt-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {BUSINESSES.map((biz) => (
          <div key={biz.id}>
            <p className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-complexo-light/70">
              <biz.icon className="h-3.5 w-3.5 text-complexo-red" />
              {biz.name}
            </p>
            <p className="text-complexo-muted">
              {biz.address}
              <br />
              {biz.addressCity}
            </p>
            <a
              href={biz.phoneHref}
              className="mt-1 inline-block text-complexo-muted transition-colors hover:text-complexo-red"
            >
              {biz.phone}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-complexo-light/10 pt-6 text-xs text-complexo-muted sm:flex-row">
        <p>© 2026 Grupo Complexo. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-complexo-red">Privacidade</a>
          <a href="#" className="hover:text-complexo-red">Termos</a>
        </div>
      </div>
    </div>
  </footer>
);

export const Footer = () => {
  const { pathname } = useLocation();
  const activeBusiness = BUSINESSES.find((biz) => pathname.startsWith(biz.to));

  return activeBusiness ? <BusinessFooter biz={activeBusiness} /> : <GenericFooter />;
};
