import React, { useState } from 'react';
import KPICard from '../../components/dashboard/KPICard';
import EmptyDataCard from '../../components/dashboard/EmptyDataCard';

const TABS = [
  { id: 'activas', label: 'Activas' },
  { id: 'presentadas', label: 'Presentadas' },
  { id: 'adjudicadas', label: 'Adjudicadas' },
  { id: 'cerradas', label: 'Cerradas' },
] as const;

const Seguimiento: React.FC = () => {
  const [tab, setTab] = useState<typeof TABS[number]['id']>('activas');

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Activas" icon="hourglass_top" empty />
        <KPICard label="Presentadas" icon="upload_file" empty />
        <KPICard label="Adjudicadas" icon="check_circle" empty />
        <KPICard label="Tasa de éxito" icon="trending_up" empty hint="Histórica" />
      </section>

      {/* Tabs */}
      <section>
        <div className="flex items-center gap-1 border-b border-slate-200 dark:border-white/5 mb-5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
                tab === t.id
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {t.label}
              {tab === t.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-t" />
              )}
            </button>
          ))}
        </div>

        <EmptyDataCard
          icon="flag"
          title={`Sin licitaciones en "${TABS.find(t => t.id === tab)?.label}"`}
          description="Marcá una oportunidad desde el Radar para empezar a seguirla acá."
          action={{ label: 'Ir al Radar', href: '#/dashboard/radar' }}
          minHeight="min-h-[320px]"
        />
      </section>
    </div>
  );
};

export default Seguimiento;
