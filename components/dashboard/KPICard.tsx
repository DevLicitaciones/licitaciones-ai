import React from 'react';

interface Props {
  label: string;
  value?: string | number | null;
  icon?: string;
  /** Texto pequeño debajo del valor (ej: "vs mes anterior"). */
  hint?: string;
  /** Cambio porcentual o absoluto (positivo / negativo afecta el color). */
  delta?: { value: string; positive?: boolean };
  /** Si true, renderiza placeholder de "—" estilo empty state. */
  empty?: boolean;
}

const KPICard: React.FC<Props> = ({ label, value, icon, hint, delta, empty }) => {
  const showEmpty = empty || value === null || value === undefined || value === '';

  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-navy-900 p-5 transition-colors hover:border-slate-300 dark:hover:border-white/10">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </span>
        {icon && (
          <span className="material-symbols-outlined text-[18px] text-slate-400 dark:text-slate-500">
            {icon}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span
          className={`text-3xl font-semibold tabular-nums ${
            showEmpty ? 'text-slate-300 dark:text-white/20' : 'text-slate-900 dark:text-white'
          }`}
        >
          {showEmpty ? '—' : value}
        </span>
        {delta && !showEmpty && (
          <span
            className={`text-xs font-semibold ${
              delta.positive
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-500 dark:text-rose-400'
            }`}
          >
            {delta.value}
          </span>
        )}
      </div>
      {hint && (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      )}
    </div>
  );
};

export default KPICard;
