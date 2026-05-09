
import React, { useEffect, useState } from 'react';
import MoleculeBackground from '../components/MoleculeBackground';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
        <MoleculeBackground />
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col items-start gap-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 shadow-sm backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Motor de Ingeniería de Ventas B2G</span>
              </div>
              
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl leading-[1.1]">
                Domina Mercado Público con <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
                  el poder de la analítica predictiva.
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 sm:text-xl max-w-xl leading-relaxed font-medium">
                Analizamos millones de registros históricos de Mercado Público para que tu oferta sea la ganadora.
              </p>
              
              <div className="flex flex-col w-full sm:w-auto gap-4 sm:flex-row pt-4">
                <button className="flex h-14 items-center justify-center rounded-full bg-emerald-500 px-10 text-base font-bold text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-400 hover:scale-105 active:scale-95 group">
                  Empezar <span className="material-symbols-outlined ml-2 text-[20px] group-hover:translate-x-1 transition-transform">bolt</span>
                </button>
                <button className="flex h-14 items-center justify-center rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-8 text-base font-bold text-slate-700 dark:text-white transition-all hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20">
                  Ver Demo
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full max-w-xl mx-auto rounded-[2.5rem] bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden p-8 sm:p-10 group">
                <div className="absolute top-0 right-0 p-4">
                  <span className="text-[10px] font-bold text-slate-300 dark:text-white/20 tracking-widest uppercase">Kernel v2.5.0</span>
                </div>
                <div className="space-y-12">
                   {/* Placeholder for Dynamic Gauss Visual */}
                   <div className="p-8 border border-emerald-500/20 rounded-2xl bg-emerald-500/5 text-center">
                     <span className="material-symbols-outlined text-emerald-500 text-5xl mb-4">insights</span>
                     <h4 className="text-xl font-bold mb-2">Tasador IA</h4>
                     <p className="text-sm text-slate-500">Calculando probabilidad de adjudicación...</p>
                   </div>
                   <div className="space-y-3">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-navy-950/50">
                         <div className="size-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                           <span className="material-symbols-outlined text-sm">notifications</span>
                         </div>
                         <div className="flex-1">
                           <div className="h-2 w-24 bg-slate-200 dark:bg-white/10 rounded mb-1"></div>
                           <div className="h-2 w-16 bg-slate-100 dark:bg-white/5 rounded"></div>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
