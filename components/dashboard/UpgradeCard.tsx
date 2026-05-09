import React from 'react';
import { Link } from 'react-router-dom';
import { type PlanName, MIN_PLAN_FOR_FEATURE, type FeatureKey } from '../../lib/plans';

interface Props {
  feature: FeatureKey;
  title: string;
  description: string;
  benefits: string[];
  /** Override del plan mínimo si querés mostrar otro. */
  requiredPlan?: PlanName;
}

const UpgradeCard: React.FC<Props> = ({ feature, title, description, benefits, requiredPlan }) => {
  const plan = requiredPlan ?? MIN_PLAN_FOR_FEATURE[feature];

  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_320px]">
        <div className="p-8 lg:p-10">
          <div className="inline-flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 mb-5">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            Disponible en plan {plan}
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
            {description}
          </p>

          <ul className="mt-6 space-y-2.5">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                <span className="material-symbols-outlined text-[18px] text-emerald-500 mt-0.5">
                  check_circle
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/planes"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors"
            >
              Mejorar a {plan}
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
            <Link
              to="/dashboard/suscripcion"
              className="inline-flex items-center h-10 px-4 rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-semibold transition-colors"
            >
              Comparar planes
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center bg-slate-50 dark:bg-white/[0.02] border-l border-slate-200 dark:border-white/5 p-10">
          <div className="text-center">
            <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 mb-4">
              <span className="material-symbols-outlined text-3xl">workspace_premium</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[200px] leading-relaxed">
              Desbloqueá esta función al actualizar tu plan actual.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeCard;
