import { ReactNode } from "react";

interface SectionCardProps {
  title?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

export const SectionCard = ({ title, action, className = "", children }: SectionCardProps) => (
  <div className={`rounded-2xl border border-complexo-light/10 bg-complexo-surface p-6 ${className}`}>
    {(title || action) && (
      <div className="mb-5 flex items-center justify-between gap-3">
        {title && <h2 className="font-rajdhani text-xl font-bold uppercase text-complexo-light">{title}</h2>}
        {action}
      </div>
    )}
    {children}
  </div>
);
