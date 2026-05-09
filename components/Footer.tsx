
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-navy-950 py-12 transition-colors border-t border-slate-200 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">
          © 2024 Licitaciones.ai - Domina Mercado Público con IA
        </div>
        <div className="flex gap-6 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-emerald-500 transition-colors">Privacidad</a>
          <a href="#" className="hover:text-emerald-500 transition-colors">Términos</a>
          <a href="#" className="hover:text-emerald-500 transition-colors">Soporte</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
