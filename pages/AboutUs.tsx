
import React from 'react';
import PageCTA from '../components/PageCTA';

const AboutUs: React.FC = () => {
  const values = [
    {
      title: 'Propósito',
      icon: 'rocket_launch',
      desc: 'Aceleramos el crecimiento de pymes y grandes empresas facilitando su éxito en licitaciones estatales.',
    },
    {
      title: 'Innovación',
      icon: 'auto_awesome',
      desc: 'Aplicamos modelos de lenguaje y machine learning para anticipar comportamientos de mercado.',
    },
    {
      title: 'Integridad',
      icon: 'verified_user',
      desc: 'Promovemos la transparencia en compras públicas a través del libre acceso a la analítica de datos.',
    },
  ];

  const team = [
    { name: 'Andrés Silva', role: 'CEO & Founder' },
    { name: 'Carmen Paz', role: 'CTO' },
    { name: 'Roberto J.', role: 'Head of Data' },
    { name: 'Sofía M.', role: 'Product Design' },
  ];

  return (
    <div className="min-h-screen dot-grid-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>

      <section className="relative pt-24 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-24 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
            Nuestra Esencia
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
            Ingeniería chilena para el <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">mercado B2G.</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Construimos la plataforma que las empresas chilenas necesitan para competir mejor en compras públicas, con datos reales y predicciones transparentes.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {values.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/5 p-8 hover:border-emerald-500/30 transition-colors animate-fade-up"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="size-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="relative rounded-3xl bg-navy-950 overflow-hidden p-10 md:p-16 shadow-xl border border-white/5">
          <div className="absolute -top-20 -right-20 size-80 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 size-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
                De una frustración a una solución concreta.
              </h2>
              <div className="space-y-5 text-slate-300 leading-relaxed">
                <p>
                  Empezamos en 2021 analizando documentos de Mercado Público a mano. Vimos que las empresas no perdían por falta de capacidad, sino por falta de <strong className="text-white">información estratégica</strong>.
                </p>
                <p>
                  Decidimos automatizar todo ese análisis. Hoy procesamos miles de licitaciones por día y entregamos predicciones de probabilidad de adjudicación a empresas en distintos rubros.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: '500+', label: 'Empresas activas' },
                { val: 'Chile', label: 'Origen' },
                { val: '24/7', label: 'Monitoreo' },
                { val: '10k+', label: 'Análisis diarios' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="aspect-square rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center p-5 text-center hover:bg-white/5 hover:border-emerald-500/30 transition-colors"
                >
                  <span className="text-3xl font-semibold text-emerald-400 mb-1 tabular-nums">{stat.val}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white mb-16">
            El equipo detrás de Licitaciones.ai
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="flex flex-col items-center group animate-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="size-28 rounded-full bg-slate-200 dark:bg-white/5 mb-5 overflow-hidden border-2 border-transparent group-hover:border-emerald-500/40 transition-all">
                  <img
                    src={`https://i.pravatar.cc/150?u=${member.name}`}
                    alt={member.name}
                    className="w-full h-full grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">{member.name}</h4>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-500 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <PageCTA
          title="¿Querés ver cómo funciona?"
          subtitle="Creá tu cuenta gratis y explorá las oportunidades que coinciden con tu rubro."
          primary={{ label: 'Probar gratis', href: '/register' }}
          secondary={{ label: 'Ver tecnología', href: '/tecnologia' }}
        />
      </section>
    </div>
  );
};

export default AboutUs;
