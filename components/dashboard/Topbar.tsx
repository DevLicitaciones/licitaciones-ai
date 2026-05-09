import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const TITLES: Record<string, { title: string; subtitle?: string }> = {
  '/dashboard': { title: 'Inicio', subtitle: 'Resumen de tu actividad y oportunidades' },
  '/dashboard/radar': { title: 'Radar de licitaciones', subtitle: 'Detección automática filtrada por tu industria' },
  '/dashboard/predictivo': { title: 'Análisis predictivo', subtitle: 'Estimación de probabilidad de éxito y competencia' },
  '/dashboard/seguimiento': { title: 'Seguimiento', subtitle: 'Procesos activos en los que estás participando' },
  '/dashboard/perfil': { title: 'Mi perfil', subtitle: 'Datos de tu empresa y representante legal' },
  '/dashboard/suscripcion': { title: 'Suscripción', subtitle: 'Plan actual, beneficios y facturación' },
  '/dashboard/configuracion': { title: 'Configuración', subtitle: 'Preferencias y notificaciones' },
};

const Topbar: React.FC = () => {
  const location = useLocation();
  const { profile, user } = useAuth();
  const meta = TITLES[location.pathname] ?? { title: 'Panel' };

  return (
    <header className="h-16 px-6 lg:px-8 flex items-center justify-between border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-navy-950/80 backdrop-blur-md sticky top-0 z-20">
      <div className="min-w-0">
        <h1 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight truncate">
          {meta.title}
        </h1>
        {meta.subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{meta.subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button
          title="Notificaciones"
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
        </button>
        <ThemeToggle />
        {profile && (
          <div className="ml-2 hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-white/5">
            <div className="text-right hidden md:block">
              <p className="text-xs font-medium text-slate-900 dark:text-white leading-tight">
                {profile.firstName} {profile.lastName}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                {user?.email ?? profile.companyName}
              </p>
            </div>
            <div className="flex size-8 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-semibold">
              {`${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
