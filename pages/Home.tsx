
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroAnimation from '../components/HeroAnimation';
import PageCTA from '../components/PageCTA';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* HERO con video de fondo */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden text-white">
        <HeroAnimation />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="flex flex-col items-start gap-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-400 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Inteligencia para Mercado Público</span>
              </div>

              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.05]">
                Inteligencia para ganar más{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  licitaciones públicas
                </span>
                .
              </h1>

              <p className="text-lg text-slate-200 sm:text-xl max-w-xl leading-relaxed">
                Detectamos las oportunidades que importan, estimamos tu probabilidad de ganar y te ayudamos a presentar mejor tu oferta. Todo desde un solo panel.
              </p>

              <div className="flex flex-col w-full sm:w-auto gap-3 sm:flex-row pt-2">
                <Link
                  to="/register"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-400 px-7 text-sm font-semibold text-white transition-colors active:scale-95 group"
                >
                  Probar gratis
                  <span className="material-symbols-outlined ml-1.5 text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </Link>
                <Link
                  to="/como-funciona"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/5 backdrop-blur-md px-7 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Cómo funciona
                </Link>
              </div>
            </div>

            {/* Mockup visual del producto */}
            <div className="relative hidden lg:block">
              <div className="relative w-full max-w-md mx-auto rounded-2xl bg-navy-900/80 border border-white/10 shadow-2xl backdrop-blur-md overflow-hidden p-7">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Tasador en vivo</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500">Mercado Público</span>
                </div>

                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-6 mb-5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Probabilidad de adjudicación
                  </p>
                  <p className="text-4xl font-semibold tabular-nums text-white">73<span className="text-2xl text-slate-400">%</span></p>
                  <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full w-[73%] bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    { label: 'Precio óptimo', value: '4.820 UF' },
                    { label: 'Competidores estimados', value: '6' },
                    { label: 'Cierre', value: 'En 4 días' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">{row.label}</span>
                      <span className="text-white font-medium tabular-nums">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección secundaria con CTA */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <PageCTA
          title="Empezá a operar con ventaja"
          subtitle="Te tomamos los datos de tu empresa y en minutos ves las oportunidades que coinciden con tu rubro y región."
          primary={{ label: 'Crear cuenta', href: '/register' }}
          secondary={{ label: 'Ver planes', href: '/planes' }}
        />
      </div>
    </div>
  );
};

export default Home;
