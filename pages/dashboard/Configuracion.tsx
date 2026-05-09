import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { setPlan as setOwnPlan } from '../../lib/auth';
import type { PlanName } from '../../lib/plans';

const Toggle: React.FC<{
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}> = ({ enabled, onChange, label, description }) => (
  <div className="flex items-start justify-between gap-4 py-4">
    <div className="min-w-0">
      <p className="text-sm font-medium text-slate-900 dark:text-white">{label}</p>
      {description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
          {description}
        </p>
      )}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      role="switch"
      aria-checked={enabled}
      className={`relative shrink-0 w-10 h-6 rounded-full transition-colors ${
        enabled ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/10'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform ${
          enabled ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);

const Configuracion: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { plan, profile, refresh } = useAuth();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [productNews, setProductNews] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [language] = useState('Español');
  const [updatingPlan, setUpdatingPlan] = useState<PlanName | null>(null);

  const handleSetPlan = async (p: PlanName) => {
    setUpdatingPlan(p);
    await setOwnPlan(p);
    await refresh();
    setUpdatingPlan(null);
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Apariencia */}
      <section className="rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-navy-900 p-6">
        <header className="mb-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Apariencia</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Elegí cómo querés ver el panel.
          </p>
        </header>
        <div className="grid grid-cols-2 gap-3">
          {(['light', 'dark'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-colors ${
                theme === t
                  ? 'border-emerald-500 bg-emerald-500/5'
                  : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
              }`}
            >
              <span className="material-symbols-outlined text-slate-500">
                {t === 'light' ? 'light_mode' : 'dark_mode'}
              </span>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {t === 'light' ? 'Claro' : 'Oscuro'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t === 'light' ? 'Fondo blanco' : 'Fondo oscuro (recomendado para datos)'}
                </p>
              </div>
              {theme === t && (
                <span className="material-symbols-outlined text-emerald-500 ml-auto">
                  check_circle
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Notificaciones */}
      <section className="rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-navy-900 px-6">
        <header className="py-5 border-b border-slate-200 dark:border-white/5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notificaciones</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Decidí qué te avisamos por email.
          </p>
        </header>
        <Toggle
          enabled={emailAlerts}
          onChange={setEmailAlerts}
          label="Alertas de oportunidades"
          description="Email cada vez que el Radar detecta una licitación con alto match para tu perfil."
        />
        <Toggle
          enabled={weeklyDigest}
          onChange={setWeeklyDigest}
          label="Resumen semanal"
          description="Lunes a las 9:00, un resumen de movimientos y nuevas oportunidades."
        />
        <Toggle
          enabled={productNews}
          onChange={setProductNews}
          label="Novedades del producto"
          description="Te avisamos cuando lancemos features nuevas. Sin spam."
        />
      </section>

      {/* Idioma */}
      <section className="rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-navy-900 p-6">
        <header className="mb-3">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Idioma y región</h3>
        </header>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-700 dark:text-slate-300">Idioma del panel</span>
          <span className="text-slate-500 dark:text-slate-400">{language}</span>
        </div>
      </section>

      {/* Dev tool — switch de plan (modifica tu propio profile vía RLS policy) */}
      <section className="rounded-xl border border-dashed border-amber-500/40 bg-amber-500/5 p-6">
        <header className="mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-500 text-[20px]">construction</span>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Modo desarrollo · Cambiar plan
          </h3>
        </header>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
          Cambia tu plan en la base de datos para probar el tier gating. Plan actual:{' '}
          <strong className="text-slate-900 dark:text-white">{plan ?? '—'}</strong>
          {profile && <> · {profile.companyName}</>}
        </p>
        <div className="flex flex-wrap gap-2">
          {(['Básico', 'Pro', 'Enterprise'] as PlanName[]).map((p) => (
            <button
              key={p}
              onClick={() => handleSetPlan(p)}
              disabled={updatingPlan !== null}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors disabled:opacity-50 ${
                plan === p
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
              }`}
            >
              {updatingPlan === p ? 'Actualizando…' : p}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Configuracion;
