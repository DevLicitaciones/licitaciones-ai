
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import MoleculeBackground from '../components/MoleculeBackground';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') || '/dashboard';
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.includes('@')) {
      setError('Ingresá un email válido');
      return;
    }
    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres');
      return;
    }
    setSubmitting(true);
    const result = await signIn(email, password);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error ?? 'No pudimos iniciar sesión. Probá de nuevo.');
      return;
    }
    navigate(redirect, { replace: true });
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center dot-grid-bg overflow-hidden">
      <MoleculeBackground />

      {/* Decorative background blurs */}
      <div className="absolute top-1/4 -left-20 size-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 size-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md px-6 animate-fade-up">
        <div className="glass-card rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/20 dark:border-white/5">
          <div className="text-center mb-10">
            <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[0_8px_20px_rgba(16,185,129,0.3)] mb-6">
              <span className="material-symbols-outlined text-3xl">fingerprint</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Acceso Seguro</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 font-medium">Ingresa a la plataforma Licitaciones.ai</p>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Email Corporativo</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@empresa.cl"
                  className="w-full h-14 pl-12 pr-4 rounded-2xl border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Contraseña</label>
                <a href="#" className="text-[10px] font-bold text-emerald-500 uppercase hover:underline">¿Olvidaste tu contraseña?</a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-4 rounded-2xl border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            <div className="flex items-center gap-2 px-1 py-2">
              <input type="checkbox" id="remember" className="rounded text-emerald-500 focus:ring-emerald-500 bg-slate-100 dark:bg-white/5 border-slate-300 dark:border-white/10" />
              <label htmlFor="remember" className="text-sm text-slate-500 dark:text-slate-400 font-medium cursor-pointer">Mantener sesión iniciada</label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-2xl shadow-[0_12px_24px_rgba(16,185,129,0.3)] transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {submitting ? 'Entrando…' : 'Entrar al Panel'}
              {!submitting && (
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">login</span>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5">
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                ¿Aún no eres parte?
                <Link to="/register" className="ml-2 text-emerald-500 font-bold hover:text-emerald-400 transition-colors">Crea una cuenta</Link>
              </p>
              <div className="flex gap-4">
                <button title="Google" className="size-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="size-5" alt="Google" />
                </button>
                <button title="LinkedIn" className="size-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <img src="https://www.svgrepo.com/show/475661/linkedin-color.svg" className="size-5" alt="LinkedIn" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
