import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import EmptyDataCard from '../../components/dashboard/EmptyDataCard';
import KPICard from '../../components/dashboard/KPICard';
import { hasFeature } from '../../lib/plans';

const Radar: React.FC = () => {
  const { plan } = useAuth();
  const isUnlimited = plan === 'Pro' || plan === 'Enterprise';
  const dailyLimit = isUnlimited ? null : 10;

  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('Todas');
  const [region, setRegion] = useState('Todas');

  return (
    <div className="space-y-6">
      {/* Filters */}
      <section className="rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-navy-900 p-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_180px_180px_auto] gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
              search
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar licitación, organismo o palabra clave"
              className="w-full h-10 pl-10 pr-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="h-10 px-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500"
          >
            <option>Todas</option>
            <option>Tecnología</option>
            <option>Construcción</option>
            <option>Salud</option>
            <option>Educación</option>
            <option>Servicios</option>
          </select>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="h-10 px-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500"
          >
            <option>Todas</option>
            <option>Metropolitana</option>
            <option>Valparaíso</option>
            <option>Biobío</option>
            <option>Otra</option>
          </select>
          <button
            disabled
            className="h-10 px-4 rounded-lg bg-emerald-500 text-white text-sm font-semibold opacity-50 cursor-not-allowed"
            title="Disponible cuando el modelo esté conectado"
          >
            Buscar
          </button>
        </div>
      </section>

      {/* KPIs del radar */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard
          label="Alertas hoy"
          icon="notifications"
          empty
          hint={isUnlimited ? 'Sin límite' : `Cuota diaria: ${dailyLimit}`}
        />
        <KPICard label="Match con tu perfil" icon="target" empty hint="Coincidencia ≥ 70%" />
        <KPICard label="Cierre próximos 7d" icon="calendar_month" empty hint="Próximos vencimientos" />
      </section>

      {/* Lista de licitaciones */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Oportunidades detectadas
          </h3>
          {!isUnlimited && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Plan {plan} · {dailyLimit} alertas / día
            </span>
          )}
        </div>
        <EmptyDataCard
          icon="radar"
          title="El Radar está esperando datos"
          description="Cuando se conecte el modelo, vas a ver acá las licitaciones priorizadas según tu industria, región y match histórico."
          minHeight="min-h-[320px]"
        />
      </section>

      {/* Upsell sutil para básico */}
      {!isUnlimited && (
        <section className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 flex items-start gap-4">
          <span className="material-symbols-outlined text-emerald-500">bolt</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Pasate a Pro y olvidate del límite diario
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Alertas ilimitadas, estimador Gausix y filtros avanzados.
            </p>
          </div>
          <a
            href="#/planes"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline whitespace-nowrap"
          >
            Comparar planes →
          </a>
        </section>
      )}
    </div>
  );
};

export default Radar;
