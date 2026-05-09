import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import KPICard from '../../components/dashboard/KPICard';
import EmptyDataCard from '../../components/dashboard/EmptyDataCard';
import PlanBadge from '../../components/dashboard/PlanBadge';
import { hasFeature, PLAN_BY_NAME } from '../../lib/plans';

const Overview: React.FC = () => {
  const { profile, plan } = useAuth();

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Buenos días';
    if (h < 19) return 'Buenas tardes';
    return 'Buenas noches';
  })();

  const showRenovaciones = plan ? hasFeature(plan, 'renovaciones') : false;
  const planObj = plan ? PLAN_BY_NAME[plan] : null;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{greeting},</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {profile?.firstName ?? 'Bienvenido'}{profile && '.'}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Acá vas a ver el estado de tus oportunidades en compras públicas. Los datos se actualizan automáticamente cuando el modelo procesa nuevas licitaciones.
          </p>
        </div>
        {plan && <PlanBadge plan={plan} size="md" />}
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Oportunidades nuevas" icon="auto_awesome" empty hint="Últimos 7 días" />
        <KPICard label="En seguimiento" icon="flag" empty hint="Procesos activos" />
        <KPICard label="Tasa de éxito" icon="trending_up" empty hint="Histórica del año" />
        <KPICard label="Valor total estimado" icon="payments" empty hint="UF" />
      </section>

      {/* Two-column: Radar preview + Plan summary */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Últimas oportunidades del Radar
            </h3>
            <Link
              to="/dashboard/radar"
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Ver todo
            </Link>
          </div>
          <EmptyDataCard
            icon="radar"
            title="Sin oportunidades por el momento"
            description="El Radar mostrará licitaciones filtradas por tu industria en cuanto el modelo se conecte."
            minHeight="min-h-[280px]"
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
            Tu plan {plan}
          </h3>
          <div className="rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-navy-900 p-5">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              {planObj?.desc ?? 'Plan activo.'}
            </p>
            <ul className="space-y-2.5 mb-5">
              {planObj?.features.filter(f => f.included).slice(0, 5).map(f => (
                <li key={f.key} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-[16px] text-emerald-500 mt-0.5">
                    check
                  </span>
                  <span>{f.name}{f.variant ? <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">· {f.variant}</span> : null}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/dashboard/suscripcion"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Gestionar suscripción
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Predictivo + Renovaciones */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
            Estimador de precios (Gauss)
          </h3>
          <EmptyDataCard
            icon="show_chart"
            title="Distribución de precios sin datos"
            description="Ingresá una licitación en Análisis predictivo para ver la curva y tu posición."
            action={{ label: 'Ir al estimador', href: '#/dashboard/predictivo' }}
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
            {showRenovaciones ? 'Radar de renovaciones' : 'Análisis competitivo'}
          </h3>
          <EmptyDataCard
            icon={showRenovaciones ? 'autorenew' : 'groups'}
            title={
              showRenovaciones
                ? 'Próximas renovaciones de contratos'
                : 'Comparativa de competidores'
            }
            description={
              showRenovaciones
                ? 'Te avisamos cuando contratos vigentes en tu sector estén por vencer.'
                : 'Disponible al activar el módulo de competencia.'
            }
          />
        </div>
      </section>
    </div>
  );
};

export default Overview;
