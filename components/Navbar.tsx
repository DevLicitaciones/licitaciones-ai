
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { toggle } = useTheme();
  const { user } = useAuth();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-navy-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-[22px]">analytics</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Licitaciones.ai</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {[
            { name: 'Tecnología', path: '/tecnologia' },
            { name: 'Cómo Funciona', path: '/como-funciona' },
            { name: 'Planes', path: '/planes' },
            { name: 'Quiénes Somos', path: '/quienes-somos' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-semibold transition-colors hover:text-emerald-500 ${
                location.pathname === item.path
                  ? 'text-emerald-500'
                  : 'text-slate-600 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={toggle}
            aria-label="Cambiar tema"
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-colors"
          >
            <span className="material-symbols-outlined dark:hidden">dark_mode</span>
            <span className="material-symbols-outlined hidden dark:block">light_mode</span>
          </button>

          {user ? (
            <Link
              to="/dashboard"
              className="group flex h-10 items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 text-white px-6 text-sm font-bold transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined mr-1.5 text-[18px]">dashboard</span>
              Mi panel
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden text-sm font-bold text-slate-600 hover:text-emerald-500 dark:text-slate-300 dark:hover:text-white sm:block transition-colors"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="group flex h-10 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-navy-950 px-6 text-sm font-bold transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                Registro
                <span className="material-symbols-outlined ml-1 text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
