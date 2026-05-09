
import React from 'react';
import MoleculeBackground from '../components/MoleculeBackground';

const Technology: React.FC = () => {
  return (
    <div className="py-24 dot-grid-bg min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 size-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 size-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-40 animate-fade-up">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-8">
              Arquitectura de Datos
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1]">
              Inteligencia <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Sin Compromisos.</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-10">
              Nuestro stack tecnológico combina la velocidad de la analítica en tiempo real con la profundidad de los modelos de lenguaje más avanzados del mercado.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
               {[
                 { title: 'Gausix Engine v2', desc: 'Nuestro algoritmo propietario de estimación de probabilidad.' },
                 { title: 'Semantic Search', desc: 'Búsqueda vectorial que entiende la intención detrás de las bases.' },
                 { title: 'Real-time Feed', desc: 'Latencia de milisegundos en la sincronización con Mercado Público.' },
                 { title: 'Neural Risk Guard', desc: 'Detección automática de cláusulas riesgosas o direccionadas.' }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col gap-2">
                    <span className="material-symbols-outlined text-emerald-500">settings_suggest</span>
                    <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
             <div className="relative z-10 p-1 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-[3.5rem] shadow-2xl">
                <div className="bg-navy-900 rounded-[3.4rem] p-10 md:p-16 relative overflow-hidden group">
                   <MoleculeBackground />
                   <div className="relative z-20 text-center">
                      <div className="size-24 bg-white/5 border border-white/10 rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-inner animate-spin-slow">
                        <span className="material-symbols-outlined text-4xl text-emerald-400">memory</span>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-6">Kernel v2.5.0</h3>
                      <div className="flex flex-wrap justify-center gap-3">
                         {['Python', 'Rust', 'TensorFlow', 'PostgreSQL', 'Vector DB'].map(tech => (
                           <span key={tech} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                             {tech}
                           </span>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Floating stats card */}
             <div className="absolute -bottom-10 -left-10 z-30 p-6 glass-card rounded-3xl border border-white/20 shadow-2xl hidden md:block animate-bounce-slow">
                <div className="flex items-center gap-4">
                   <div className="size-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white">
                     <span className="material-symbols-outlined">bolt</span>
                   </div>
                   <div>
                     <p className="text-[10px] font-black uppercase text-slate-400">Procesamiento</p>
                     <p className="text-xl font-bold text-slate-900 dark:text-white">2.4 TB / día</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Data Points Históricos", val: "48M+", icon: "database" },
            { label: "Latencia de Alerta", val: "0.2s", icon: "shutter_speed" },
            { label: "Precisión Predicción", val: "94.2%", icon: "verified" },
            { label: "Integraciones API", val: "250+", icon: "api" }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-10 rounded-[2.5rem] text-center border-white/20 dark:border-white/5 hover:scale-105 transition-all shadow-xl group">
              <div className="size-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <p className="text-4xl font-black text-slate-900 dark:text-white mb-2">{stat.val}</p>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Security / Compliance section */}
        <div className="mt-40 text-center">
           <div className="inline-flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="text-xl font-black italic tracking-tighter">SOC2 COMPLIANT</span>
              <span className="text-xl font-black italic tracking-tighter">AWS CLOUD</span>
              <span className="text-xl font-black italic tracking-tighter">GDPR READY</span>
              <span className="text-xl font-black italic tracking-tighter">SECURE BY DESIGN</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Technology;
