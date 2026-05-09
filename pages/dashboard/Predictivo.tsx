import React from 'react';
import TierGuard from '../../components/dashboard/TierGuard';
import EmptyDataCard from '../../components/dashboard/EmptyDataCard';
import KPICard from '../../components/dashboard/KPICard';
import { useAuth } from '../../contexts/AuthContext';
import { hasFeature } from '../../lib/plans';

const Predictivo: React.FC = () => {
  const { plan } = useAuth();
  const showCompetencia = plan ? hasFeature(plan, 'competencia') : false;

  return (
    <div className="space-y-8">
      {/* Sección 1: Estimador Gauss — requiere Pro+ */}
      <TierGuard
        feature="gauss"
        title="Estimador Gausix"
        description="Calculá el precio óptimo para una licitación con base en la distribución histórica de ofertas. Sabé en qué percentil quedás antes de presentar."
        benefits={[
          'Curva de campana de Gauss en tiempo real',
          'Percentil estimado de tu oferta',
          'Recomendación de precio óptimo según tu industria',
        ]}
      >
        <section>
          <header className="mb-4">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Estimador Gausix
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Ingresá una licitación para ver la distribución de precios y tu posición.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            <EmptyDataCard
              icon="show_chart"
              title="Curva de distribución sin datos"
              description="El gráfico de campana se renderizará cuando el modelo procese tu primera consulta."
              minHeight="min-h-[360px]"
            />
            <div className="space-y-4">
              <KPICard label="Percentil estimado" icon="leaderboard" empty />
              <KPICard label="Precio óptimo (UF)" icon="price_change" empty />
              <KPICard label="Evaluación" icon="verified" empty hint="Riesgo / oportunidad" />
            </div>
          </div>
        </section>
      </TierGuard>

      {/* Sección 2: Análisis competitivo — requiere Enterprise */}
      <TierGuard
        feature="competencia"
        title="Análisis de competencia"
        description="Visualizá contra qué empresas competís en cada licitación, su historial de adjudicaciones y patrones de oferta."
        benefits={[
          'Ranking de competidores por industria y región',
          'Histórico de adjudicaciones y montos',
          'Alertas cuando un competidor clave participa',
        ]}
      >
        <section>
          <header className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Análisis de competencia
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {showCompetencia ? 'Comparativa de competidores activos en tu sector.' : ''}
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <KPICard label="Competidores únicos" icon="groups" empty hint="Últimos 90 días" />
            <KPICard label="Adjudicaciones rivales" icon="emoji_events" empty />
            <KPICard label="Score promedio" icon="auto_graph" empty hint="0–100" />
          </div>

          <EmptyDataCard
            icon="table_view"
            title="Tabla de competidores"
            description="Listará a los principales rivales con sus métricas en cuanto el modelo se conecte."
            minHeight="min-h-[260px]"
          />
        </section>
      </TierGuard>
    </div>
  );
};

export default Predictivo;
