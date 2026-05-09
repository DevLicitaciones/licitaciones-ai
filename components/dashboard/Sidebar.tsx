import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { hasFeature, type FeatureKey, MIN_PLAN_FOR_FEATURE } from '../../lib/plans';
import PlanBadge from './PlanBadge';

interface NavItem {
  label: string;
  icon: string;
  path: string;
  /** Si está, este item requiere la feature. Mostramos un badge "Pro"/"Enterprise" si el plan no la incluye. */
  requires?: FeatureKey;
  end?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const SECTIONS: NavSection[] = [
  {
    title: 'Producto',
    items: [
      { label: 'Inicio', icon: 'dashboard', path: '/dashboard', end: true },
      { label: 'Radar', icon: 'radar', path: '/dashboard/radar' },
      { label: 'Análisis predictivo', icon: 'insights', path: '/dashboard/predictivo', requires: 'gauss' },
      { label: 'Seguimiento', icon: 'flag', path: '/dashboard/seguimiento' },
    ],
  },
  {
    title: 'Cuenta',
    items: [
      { label: 'Mi perfil', icon: 'person', path: '/dashboard/perfil' },
      { label: 'Suscripción', icon: 'card_membership', path: '/dashboard/suscripcion' },
      { label: 'Configuración', icon: 'tune', path: '/dashboard/configuracion' },
    ],
  },
];

const Sidebar: React.FC = () => {
  const { profile, plan, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const initials = profile
    ? `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase()
    : '··';

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-slate-200 dark:border-white/5 bg-white dark:bg-navy-950 h-screen sticky top-0">
      {/* Logo */}
      <div className="h-16 px-5 flex items-center border-b border-slate-200 dark:border-white/5">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <span className="material-symbols-outlined text-[18px]">analytics</span>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
            Licitaciones.ai
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="px-2.5 mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const locked = item.requires ? !hasFeature(plan, item.requires) : false;
                const requiredPlan = item.requires ? MIN_PLAN_FOR_FEATURE[item.requires] : null;

                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.end}
                      className={({ isActive }) =>
                        `group flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                        }`
                      }
                    >
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      {locked && requiredPlan && (
                        <span className="text-[9px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-white/10 rounded px-1.5 py-0.5">
                          {requiredPlan}
                        </span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-slate-200 dark:border-white/5 p-3">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg">
          <div className="flex size-9 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-semibold">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
              {profile ? `${profile.firstName} ${profile.lastName}` : 'Usuario'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {profile?.companyName ?? '—'}
            </p>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between px-2">
          {plan && <PlanBadge plan={plan} />}
          <button
            onClick={handleSignOut}
            title="Cerrar sesión"
            className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
