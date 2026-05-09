
import React from 'react';
import PageCTA from '../components/PageCTA';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: "01",
      title: "Extracción continua",
      desc: "Sincronizamos Mercado Público en tiempo real. Capturamos no solo el resumen, también las bases administrativas, técnicas y resoluciones adjuntas.",
      icon: "dataset",
      tag: "Datos"
    },
    {
      id: "02",
      title: "Categorización con IA",
      desc: "Modelos de lenguaje leen las bases y clasifican cada licitación en categorías específicas. Filtran el ruido y te muestran solo lo relevante para tu rubro.",
      icon: "segment",
      tag: "NLP"
    },
    {
      id: "03",
      title: "Predicción de precios",
      desc: "El estimador Gausix analiza adjudicaciones similares de los últimos años, la competencia activa y el presupuesto fiscal para sugerirte un precio óptimo.",
      icon: "trending_up",
      tag: "Estimador Gausix"
    },
    {
      id: "04",
      title: "Gestión de postulación",
      desc: "Checklist automático para que no se te escape ningún documento. Seguís el estado de tu oferta hasta la adjudicación, con alertas en cada cambio.",
      icon: "task_alt",
      tag: "Seguimiento"
    }
  ];

  return (
    <div className="py-24 dot-grid-bg min-h-screen relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-24 animate-fade-up">
          <h2 className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-4">Cómo funciona</h2>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.05]">De los datos a <br /><span className="text-emerald-500">la adjudicación.</span></h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Un pipeline automatizado de extracción y análisis. Convertimos los miles de documentos de Mercado Público en oportunidades concretas para tu empresa.
          </p>
        </div>

        <div className="relative grid gap-12 lg:grid-cols-2">
          {/* Vertical Timeline line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/20 to-transparent -translate-x-1/2"></div>
          
          {steps.map((step, idx) => (
            <div key={step.id} className={`relative group animate-fade-up`} style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className={`flex flex-col gap-6 p-8 md:p-10 rounded-[3rem] glass-card border border-white/20 dark:border-white/5 hover:border-emerald-500/50 transition-all shadow-xl hover:-translate-y-2 relative overflow-hidden ${idx % 2 === 1 ? 'lg:mt-24' : ''}`}>
                <div className="absolute top-0 right-0 p-6 text-6xl font-black text-slate-100 dark:text-white/5 pointer-events-none select-none">
                  {step.id}
                </div>
                
                <div className="size-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                </div>
                
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
                    {step.tag}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-white/5 mt-auto">
                   <button className="text-sm font-bold text-emerald-500 flex items-center gap-2 group/btn">
                     Saber más <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA — usa PageCTA estandarizado */}
        <PageCTA
          title="¿Listo para ganar tu próxima licitación?"
          subtitle="Creá una cuenta gratis y descubrí las oportunidades que tu competencia no está viendo."
          primary={{ label: 'Comenzar gratis', href: '/register' }}
          secondary={{ label: 'Ver planes', href: '/planes' }}
        />
      </div>
    </div>
  );
};

export default HowItWorks;
