
import React from 'react';
import MoleculeBackground from '../components/MoleculeBackground';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen dot-grid-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>
      
      <section className="relative pt-24 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-24 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
            Nuestra Esencia
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
            Ingeniería Chilena para el <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Mundo B2G.</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            No somos solo una plataforma de software; somos el socio estratégico que las empresas necesitan para navegar la complejidad de las compras públicas con datos reales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
          {[
            { 
              title: "Propósito", 
              icon: "rocket_launch", 
              desc: "Aceleramos el crecimiento de las PYMES y grandes empresas facilitando su éxito en licitaciones estatales.",
              color: "emerald" 
            },
            { 
              title: "Innovación", 
              icon: "auto_awesome", 
              desc: "Utilizamos los últimos avances en LLMs y algoritmos de Machine Learning para predecir comportamientos de mercado.",
              color: "cyan"
            },
            { 
              title: "Integridad", 
              icon: "verified_user", 
              desc: "Promovemos la transparencia en el mercado público a través del libre acceso a la analítica de datos.",
              color: "blue"
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-10 rounded-[2.5rem] relative group overflow-hidden border-white/20 dark:border-white/5 shadow-xl hover:-translate-y-2 transition-all">
              <div className={`absolute top-0 right-0 size-32 bg-${item.color}-500/5 blur-3xl rounded-full`}></div>
              <div className="size-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="relative rounded-[3.5rem] bg-navy-900 dark:bg-white/5 overflow-hidden p-12 md:p-20 shadow-2xl border border-white/10">
          <MoleculeBackground />
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8">De una frustración a una solución global.</h2>
               <div className="space-y-6">
                 <p className="text-slate-300 text-lg leading-relaxed">
                   Todo comenzó en 2021, analizando miles de documentos de Mercado Público manualmente. Nos dimos cuenta que las empresas no perdían por falta de capacidad, sino por falta de <strong>información estratégica.</strong>
                 </p>
                 <p className="text-slate-300 text-lg leading-relaxed">
                   Decidimos automatizar ese proceso. Hoy, Licitaciones.ai procesa más de 25 millones de registros históricos para ofrecer el motor de búsqueda y predicción más avanzado de Chile.
                 </p>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center p-6 text-center hover:bg-white/10 transition-colors">
                    <span className="text-3xl font-black text-emerald-400 mb-1">
                      {i === 1 ? '500+' : i === 2 ? 'Chile' : i === 3 ? '24/7' : '10k+'}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {i === 1 ? 'Clientes' : i === 2 ? 'Sede' : i === 3 ? 'Soporte' : 'Análisis Diarios'}
                    </span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Team Section Placeholder */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-16">El equipo detrás de la IA</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Andrés Silva', role: 'CEO & Founder' },
              { name: 'Carmen Paz', role: 'CTO' },
              { name: 'Roberto J.', role: 'Head of Data' },
              { name: 'Sofía M.', role: 'Product Design' }
            ].map((member, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="size-32 rounded-full bg-slate-200 dark:bg-white/5 mb-6 overflow-hidden border-2 border-transparent group-hover:border-emerald-500 transition-all shadow-lg">
                   <img src={`https://i.pravatar.cc/150?u=${member.name}`} alt={member.name} className="w-full h-full grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white">{member.name}</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
