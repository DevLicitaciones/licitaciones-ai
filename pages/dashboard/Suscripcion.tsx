import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PlanBadge from '../../components/dashboard/PlanBadge';
import { PLANS, PLAN_BY_NAME, type PlanName } from '../../lib/plans';

const Suscripcion: React.FC = () => {
  const { plan, profile } = useAuth();
  const currentPlan = plan ? PLAN_BY_NAME[plan] : null;
  const cycle = profile?.billingCycle ?? 'annual';
  const price = currentPlan
    ? cycle === 'annual'
      ? currentPlan.annual
      : currentPlan.monthly
    : '—';

  return (
    <div className="space-y-8">
      {/* Plan actual */}
      <section className="rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-navy-900 overflow-hidden">
        <div className="p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Plan activo
              </p>
              <div className="mt-2 flex items-baseline gap-3">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
                  Plan {currentPlan?.name ?? '—'}
                </h2>
                {plan && <PlanBadge plan={plan} />}
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {currentPlan?.desc}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold tabular-nums text-slate-900 dark:text-white">
                {price}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                / mes · facturación {cycle === 'annual' ? 'anual' : 'mensual'}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentPlan?.features.filter(f => f.included).map(f => (
              <div
                key={f.key}
                className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
              >
                <span className="material-symbols-outlined text-[18px] text-emerald-500 mt-0.5">
                  check_circle
                </span>
                <span>
                  {f.name}
                  {f.variant && (
                    <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
                      · {f.variant}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 lg:px-8 py-4 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/5 flex flex-wrap items-center gap-3">
          <Link
            to="/planes"
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors"
          >
            {plan === 'Enterprise' ? 'Contactar ventas' : 'Mejorar plan'}
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
          <button
            className="inline-flex items-center h-9 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-white/5 text-sm font-medium transition-colors"
          >
            Cambiar a {cycle === 'annual' ? 'mensual' : 'anual'}
          </button>
          <button className="inline-flex items-center h-9 px-3.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors">
            Cancelar suscripción
          </button>
        </div>
      </section>

      {/* Comparación de planes */}
      <section>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
          Compará con otros planes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map((p) => {
            const isCurrent = p.name === plan;
            return (
              <div
                key={p.id}
                className={`rounded-xl border p-5 transition-colors ${
                  isCurrent
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : 'border-slate-200 dark:border-white/5 bg-white dark:bg-navy-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Plan {p.name}
                  </h4>
                  {isCurrent && <PlanBadge plan={p.name as PlanName} />}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{p.desc}</p>
                <p className="text-2xl font-semibold tabular-nums text-slate-900 dark:text-white">
                  {cycle === 'annual' ? p.annual : p.monthly}
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-1">/mes</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {p.features.slice(0, 4).map((f) => (
                    <li
                      key={f.key}
                      className={`flex items-start gap-2 text-xs ${
                        f.included ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600 line-through'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[14px] mt-0.5 ${
                          f.included ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-600'
                        }`}
                      >
                        {f.included ? 'check' : 'close'}
                      </span>
                      {f.name}
                    </li>
                  ))}
                </ul>
                {!isCurrent && (
                  <Link
                    to="/planes"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    {p.cta}
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Facturación */}
      <section>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
          Historial de pagos
        </h3>
        <div className="rounded-xl border border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] p-8 text-center">
          <span className="material-symbols-outlined text-slate-400" style={{ fontSize: 36 }}>
            receipt_long
          </span>
          <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">
            Sin movimientos por ahora
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Tus facturas y comprobantes aparecerán acá.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Suscripcion;
