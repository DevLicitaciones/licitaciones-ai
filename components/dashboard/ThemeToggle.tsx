import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggle } = useTheme();
  const label = theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 transition-colors ${className}`}
    >
      <span className="material-symbols-outlined text-[20px] dark:hidden">dark_mode</span>
      <span className="material-symbols-outlined text-[20px] hidden dark:block">light_mode</span>
    </button>
  );
};

export default ThemeToggle;
