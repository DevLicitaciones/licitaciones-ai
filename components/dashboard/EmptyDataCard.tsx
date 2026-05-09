import React from 'react';

interface Props {
  icon?: string;
  title: string;
  description?: string;
  action?: { label: string; onClick?: () => void; href?: string };
  /** Altura mínima — útil para emular cards de gráfico. */
  minHeight?: string;
  className?: string;
}

const EmptyDataCard: React.FC<Props> = ({
  icon = 'insights',
  title,
  description = 'Conectaremos los datos en cuanto el modelo esté activo.',
  action,
  minHeight = 'min-h-[220px]',
  className = '',
}) => {
  return (
    <div
      className={`rounded-xl border border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] flex flex-col items-center justify-center text-center px-6 py-10 ${minHeight} ${className}`}
    >
      <span className="material-symbols-outlined text-slate-400 dark:text-slate-500" style={{ fontSize: 40 }}>
        {icon}
      </span>
      <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">{title}</p>
      {description && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-xs">{description}</p>
      )}
      {action && (
        action.href ? (
          <a
            href={action.href}
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            {action.label}
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
        ) : (
          <button
            onClick={action.onClick}
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            {action.label}
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        )
      )}
    </div>
  );
};

export default EmptyDataCard;
