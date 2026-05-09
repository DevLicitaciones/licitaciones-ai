import React from 'react';
import { Link } from 'react-router-dom';

interface Action {
  label: string;
  href: string;
}

interface Props {
  title: string;
  subtitle?: string;
  primary: Action;
  secondary?: Action;
  /** Si querés que el background sea sólido en vez del gradiente emerald→cyan. */
  variant?: 'gradient' | 'solid';
  className?: string;
}

/**
 * Bloque CTA estandarizado para los pies de página marketing.
 * Lo usan AboutUs, Technology y opcionalmente Home para evitar que cada
 * página invente su propia estética.
 */
const PageCTA: React.FC<Props> = ({
  title,
  subtitle,
  primary,
  secondary,
  variant = 'gradient',
  className = '',
}) => {
  const bg =
    variant === 'gradient'
      ? 'bg-gradient-to-br from-emerald-500 to-cyan-600'
      : 'bg-navy-900 dark:bg-white/5 border border-white/10';

  return (
    <section
      className={`mt-24 lg:mt-32 rounded-3xl ${bg} p-10 md:p-16 text-center text-white shadow-xl relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none grid-pattern" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
        {subtitle && (
          <p className="text-base md:text-lg text-white/80 leading-relaxed mb-10">{subtitle}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={primary.href}
            className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-white text-navy-950 font-semibold text-sm hover:bg-slate-100 transition-colors active:scale-95"
          >
            {primary.label}
            <span className="material-symbols-outlined ml-1.5 text-[18px]">arrow_forward</span>
          </Link>
          {secondary && (
            <Link
              to={secondary.href}
              className="inline-flex items-center justify-center h-12 px-6 rounded-lg border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors active:scale-95"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageCTA;
