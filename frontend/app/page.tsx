'use client';
import { useAppStore } from '@/lib/mock-data/store';
import { mockUsers } from '@/lib/mock-data/seed';
import { useTranslation, Language } from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Sprout, Tractor, ShoppingCart, Shield, ArrowRight, Globe } from 'lucide-react';

export default function LoginPage() {
  const { setCurrentUser } = useAppStore();
  const { lang, setLang, t } = useTranslation();
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const roleConfig: Record<string, { icon: typeof Tractor; color: string; bg: string; label: string }> = {
    FARMER: { icon: Tractor, color: 'text-success', bg: 'bg-success-light', label: t.roleFarmer },
    FPO: { icon: Tractor, color: 'text-purple-600', bg: 'bg-purple-100', label: t.roleFPO },
    BUYER: { icon: ShoppingCart, color: 'text-accent', bg: 'bg-accent-light', label: t.roleBuyer },
    ADMIN: { icon: Shield, color: 'text-info', bg: 'bg-info-light', label: t.roleAdmin },
  };

  const handleLogin = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setLoadingId(userId);
      setCurrentUser(user);
      if (user.role === 'FARMER') router.push('/dashboard/farmer');
      else if (user.role === 'FPO') router.push('/dashboard/fpo');
      else if (user.role === 'BUYER') router.push('/dashboard/buyer');
      else router.push('/dashboard/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative z-10">
      <div className="w-full max-w-md">
        {/* Language Selection Pill */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center p-1 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <Globe className="w-4 h-4 text-slate-400 ml-2 mr-1" />
            {(['en', 'hi', 'bn'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  lang === l
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {l === 'en' ? 'English' : l === 'hi' ? 'हिन्दी' : 'বাংলা'}
              </button>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-md">
            <Sprout className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">{t.brand}</h1>
          <p className="text-sm text-muted mt-1.5 font-medium">{t.brandTagline}</p>
        </div>

        {/* Card */}
        <div className="section-card shadow-sm">
          <div className="mb-5">
            <h2 className="text-base font-bold text-foreground">{t.selectPersonaTitle}</h2>
            <p className="text-xs text-muted mt-0.5">{t.selectPersonaSubtitle}</p>
          </div>

          <div className="space-y-2.5">
            {mockUsers.map(user => {
              const config = roleConfig[user.role];
              const Icon = config?.icon || Shield;
              const isPushed = loadingId === user.id;
              
              return (
                <button
                  key={user.id}
                  onClick={() => handleLogin(user.id)}
                  className={`w-full flex items-center gap-3.5 p-3.5 border rounded-xl transition-all group text-left ${
                    isPushed ? 'border-primary bg-primary/5 opacity-75' : 'border-border hover:border-primary/40 hover:bg-slate-50'
                  }`}
                  disabled={loadingId !== null}
                >
                  <div className={`w-11 h-11 rounded-xl ${config?.bg} flex items-center justify-center shrink-0`}>
                    {isPushed ? (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Icon className={`w-5 h-5 ${config?.color}`} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-foreground">{user.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`badge ${config?.bg} ${config?.color} text-[10px] font-bold`}>{config?.label}</span>
                      {user.location && <span className="text-xs text-muted">· {user.location}</span>}
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-colors shrink-0 ${isPushed ? 'text-primary translate-x-1' : 'text-slate-300 group-hover:text-primary'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted mt-6">
          {t.demoMode}
        </p>
      </div>
    </div>
  );
}
