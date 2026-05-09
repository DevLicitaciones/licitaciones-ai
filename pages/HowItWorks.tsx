
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: "01",
      title: "Extracción Masiva",
      desc: "Nuestros bots rastrean Mercado Público 24/7. Extraemos no solo el resumen, sino las bases administrativas, técnicas y resoluciones adjuntas.",
      icon: "dataset",
      tag: "Big Data"
    },
    {
      id: "02",
      title: "Categorización Inteligente",
      desc: "Nuestra IA 'lee' las bases y clasifica la licitación en categorías hiper-específicas, descartando el ruido y enfocándose en lo que realmente haces.",
      icon: "segment",
      tag: "NLP"
    },
    {
      id: "03",
      title: "Predicción de Precios",
      desc: "El modelo Gausix analiza los últimos 3 años de adjudicaciones similares, la competencia activa y el presupuesto fiscal para darte el 'Precio de Oro'.",
      icon: "trending_up",
      tag: "Gausix Engine"
    },
    {
      id: "04",
      title: "Gestión de Postulación",
      desc: "Preparamos un checklist inteligente para que no olvides ningún documento. Monitorea el estado de tu oferta en tiempo real hasta la adjudicación.",
      icon: "task_alt",
      tag: "Workflow"
    }
  ];

  return (
    <div className="py-24 dot-grid-bg min-h-screen relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-4">Metodología de Éxito</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">De los Datos a <br /><span className="text-emerald-500">la Adjudicación.</span></h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Eliminamos la incertidumbre del proceso de compra pública mediante un flujo de trabajo analítico de grado militar.
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

        {/* Final CTA section */}
        <div className="mt-40 rounded-[3.5rem] bg-gradient-to-br from-emerald-500 to-cyan-600 p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none grid-pattern"></div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 relative z-10">¿Listo para ganar tu próxima licitación?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 relative z-10">Crea una cuenta gratuita y descubre las oportunidades que tu competencia no está viendo.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
             <button className="h-16 px-10 rounded-full bg-white text-navy-950 font-black text-lg shadow-xl hover:scale-105 transition-all active:scale-95">Comenzar Gratis</button>
             <button className="h-16 px-10 rounded-full bg-navy-950 text-white font-black text-lg shadow-xl hover:bg-navy-900 transition-all active:scale-95">Ver Video Demo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
