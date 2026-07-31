import { Instagram, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";
import { BoltMark } from "./BoltMark";

const COLUMNS = [
  {
    title: "Grupo",
    links: [
      { label: "Academia", to: "/academia" },
      { label: "Planos", to: "/planos" },
      { label: "Suplementos", to: "/suplementos" },
      { label: "Pilates", to: "/pilates" },
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

export const Footer = () => (
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
            O ecossistema fitness de Guaiúba: academia, suplementação e pilates
            em um só lugar. Energia em forma de evolução.
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

      <div className="mt-12 grid grid-cols-1 gap-6 border-t border-complexo-light/10 pt-8 text-sm text-complexo-muted sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-complexo-red" />
          <span>
            Academia — ao lado do Depósito do Angelo, Guaiúba/CE
            <br />
            Suplementos & Pilates — Rua Antônio Acioly, 196, Centro
          </span>
        </div>
        <div className="flex items-start gap-3 sm:justify-end">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-complexo-red" />
          <span>
            +55 85 98683-0769 · +55 85 98866-4882
          </span>
        </div>
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
