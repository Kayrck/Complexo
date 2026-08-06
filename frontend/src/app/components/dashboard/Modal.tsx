import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: string;
}

/** Modal genérico do painel administrativo — mesma linguagem visual do CartDrawer (overlay + painel), reutilizável por qualquer aba. */
export const Modal = ({ open, onClose, title, subtitle, children, maxWidth = "max-w-lg" }: ModalProps) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] ${maxWidth} -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-complexo-light/10 bg-complexo-surface p-6 shadow-2xl sm:p-7`}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-rajdhani text-2xl font-bold uppercase text-complexo-light">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-complexo-muted">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full p-2 text-complexo-muted hover:bg-complexo-light/5 hover:text-complexo-light"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </>
  );
};
