
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const sections = [
    {
      title: 'Producto',
      links: [
        { label: 'Cómo funciona', href: '/como-funciona' },
        { label: 'Tecnología', href: '/tecnologia' },
        { label: 'Planes', href: '/planes' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Quiénes somos', href: '/quienes-somos' },
        { label: 'Contacto', href: '#' },
        { label: 'Carreras', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacidad', href: '#' },
        { label: 'Términos', href: '#' },
        { label: 'Soporte', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-white dark:bg-navy-950 transition-colors border-t border-slate-200 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
                <span className="material-symbols-outlined text-[18px]">analytics</span>
              </div>
              <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                Licitaciones.ai
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              Inteligencia para ganar más licitaciones públicas en Chile.
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href="#"
                aria-label="LinkedIn"
                className="size-8 rounded-md border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-emerald-500 hover:border-emerald-500/30 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">link</span>
              </a>
              <a
                href="mailto:hola@licitaciones.ai"
                aria-label="Email"
                className="size-8 rounded-md border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-emerald-500 hover:border-emerald-500/30 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">mail</span>
              </a>
            </div>
          </div>

          {/* Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                {section.title}
              </p>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} Licitaciones.ai · Hecho en Chile
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-600 uppercase tracking-wider font-medium">
            v1.0
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
