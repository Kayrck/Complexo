interface BoltMarkProps {
  className?: string;
}

/**
 * The Complexo bolt mark. A single crisp glyph used for the logo and small
 * brand accents. Inherits `currentColor` so it adapts to light/dark contexts.
 */
export const BoltMark = ({ className = "" }: BoltMarkProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M13.6 2 L4 13.8 h6.2 L9.2 22 L20 9.4 h-6.1 z" />
  </svg>
);
