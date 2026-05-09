
import React, { useState } from 'react';
import { PLANS } from '../lib/plans';

const Plans: React.FC = () => {
  const [selected, setSelected] = useState('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <div className="py-24 dot-grid-bg min-h-screen relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-4">Inversión Estratégica</h2>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">Planes que escalan <br />con tu éxito.</h1>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Mensual</span>
            <button
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-14 h-7 rounded-full bg-slate-200 dark:bg-white/10 p-1 transition-all"
            >
              <div className={`size-5 rounded-full bg-emerald-500 transition-all ${billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-sm font-bold ${billingCycle === 'annual' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Anual</span>
            <span className="ml-2 px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase">Ahorra 20%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={`relative flex flex-col p-8 md:p-10 rounded-[3rem] border transition-all duration-500 cursor-pointer group ${
                selected === plan.id
                ? 'bg-navy-900 dark:bg-white text-white dark:text-navy-950 border-emerald-500 scale-105 z-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] ring-1 ring-emerald-500/50'
                : 'bg-white dark:bg-navy-900/50 border-slate-200 dark:border-white/5 hover:border-emerald-500/30 backdrop-blur-md'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                  Más Popular
                </div>
              )}

              <div className="mb-10">
                <h3 className="text-xl font-bold mb-6">Plan {plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black">{billingCycle === 'monthly' ? plan.monthly : plan.annual}</span>
                  <span className={`text-sm font-bold opacity-60`}>/mes</span>
                </div>
                <p className={`text-xs mt-4 font-medium opacity-70 leading-relaxed`}>{plan.desc}</p>
              </div>

              <div className={`h-px w-full mb-10 ${selected === plan.id ? 'bg-white/10 dark:bg-navy-950/10' : 'bg-slate-100 dark:bg-white/5'}`}></div>

              <ul className="space-y-5 mb-12 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className={`flex items-center gap-3 text-sm font-bold ${!f.included ? 'opacity-30' : ''}`}>
                    <span className={`material-symbols-outlined text-[20px] ${f.included ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {f.included ? 'check_circle' : 'cancel'}
                    </span>
                    {f.name}
                    {f.variant && f.included && (
                      <span className="ml-1 text-xs font-medium opacity-60">· {f.variant}</span>
                    )}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                selected === plan.id
                ? 'bg-emerald-500 text-white hover:bg-emerald-400'
                : 'bg-slate-900 dark:bg-white/10 text-white hover:bg-slate-800'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Preview */}
        <div className="mt-32 text-center p-12 rounded-[3rem] glass-card border-white/20 dark:border-white/5">
          <p className="text-slate-600 dark:text-slate-400 font-medium">¿Necesitas algo a medida para tu equipo? <a href="#" className="text-emerald-500 font-bold hover:underline">Hablemos por WhatsApp</a></p>
        </div>
      </div>
    </div>
  );
};

export default Plans;
