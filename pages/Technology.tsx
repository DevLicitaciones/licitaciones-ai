
import React from 'react';
import PageCTA from '../components/PageCTA';

const Technology: React.FC = () => {
  const features = [
    {
      title: 'Estimador Gausix',
      desc: 'Modelo estadístico que calcula la distribución de precios y tu probabilidad de adjudicación.',
      icon: 'insights',
    },
    {
      title: 'Búsqueda semántica',
      desc: 'Filtrado vectorial que entiende la intención de las bases, no solo palabras clave.',
      icon: 'search',
    },
    {
      title: 'Sincronización en tiempo real',
      desc: 'Conexión continua con Mercado Público — las oportunidades aparecen en cuanto se publican.',
      icon: 'sync',
    },
    {
      title: 'Análisis de riesgo',
      desc: 'Detección automática de cláusulas riesgosas o requisitos direccionados en las bases.',
      icon: 'shield',
    },
  ];

  const stack = ['Python', 'TypeScript', 'PostgreSQL', 'pgvector', 'Supabase'];

  const metrics = [
    { label: 'Licitaciones analizadas', val: '+2M', icon: 'database' },
    { label: 'Latencia de alerta', val: '<1s', icon: 'shutter_speed' },
    { label: 'Precisión del estimador', val: '94%', icon: 'verified' },
    { label: 'Disponibilidad', val: '99.9%', icon: 'cloud_done' },
  ];

  return (
    <div className="py-24 dot-grid-bg min-h-screen relative overflow-hidden">
      {/* Solo un blur globe para no sobrecargar */}
      <div className="absolute bottom-0 left-0 size-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-32 animate-fade-up">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-8">
              Cómo está construido
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.05]">
              Inteligencia precisa, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">transparente.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Combinamos un pipeline de análisis en tiempo real con modelos estadísticos y de lenguaje. Sin promesas vagas — cada predicción es trazable hasta sus datos de entrada.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((item) => (
                <div key={item.title} className="flex flex-col gap-2">
                  <span className="material-symbols-outlined text-emerald-500">{item.icon}</span>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative z-10 p-1 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-3xl shadow-xl">
              <div className="bg-navy-950 rounded-[1.4rem] p-10 md:p-14 relative overflow-hidden">
                <div className="text-center">
                  <div className="size-20 bg-white/5 border border-white/10 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-inner">
                    <span className="material-symbols-outlined text-3xl text-emerald-400">memory</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2 tracking-tight">Stack del producto</h3>
                  <p className="text-sm text-slate-400 mb-6">Las piezas que mueven todo por debajo.</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((stat, i) => (
            <div
              key={i}
              className="rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/5 p-6 hover:border-emerald-500/30 transition-colors animate-fade-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="size-10 bg-emerald-500/10 text-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
              </div>
              <p className="text-3xl font-semibold tabular-nums text-slate-900 dark:text-white mb-1">{stat.val}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <PageCTA
          title="Construido para que confíes en cada predicción"
          subtitle="Creá tu cuenta gratis y revisá los datos detrás de cada análisis."
          primary={{ label: 'Probar gratis', href: '/register' }}
          secondary={{ label: 'Ver planes', href: '/planes' }}
        />
      </div>
    </div>
  );
};

export default Technology;
