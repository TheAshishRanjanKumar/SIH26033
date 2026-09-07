'use client';
import Link from 'next/link';
import { useAppStore } from '@/lib/mock-data/store';
import { useTranslation, Language } from '@/lib/i18n';
import { Sprout, Globe, Shield, Tractor, ShoppingCart } from 'lucide-react';

export default function TopNavbar() {
  const { currentUser } = useAppStore();
  const { lang, setLang, t } = useTranslation();

  const roleConfig: Record<string, { icon: typeof Tractor; bg: string; color: string; label: string }> = {
    FARMER: { icon: Tractor, bg: 'bg-green-100', color: 'text-green-800', label: t.roleFarmer },
    FPO: { icon: Tractor, bg: 'bg-purple-100', color: 'text-purple-800', label: t.roleFPO },
    BUYER: { icon: ShoppingCart, bg: 'bg-amber-100', color: 'text-amber-800', label: t.roleBuyer },
    ADMIN: { icon: Shield, bg: 'bg-blue-100', color: 'text-blue-800', label: t.roleAdmin },
  };

  const currentRole = currentUser ? roleConfig[currentUser.role] : null;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-2.5 transition-all">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-3">
        {/* Left: Mobile Brand / Title */}
        <div className="flex items-center gap-2">
          <Link href="/" className="md:hidden flex items-center gap-1.5 font-extrabold text-lg text-primary">
            <Sprout className="w-5 h-5 text-primary" />
            <span>{t.brand}</span>
          </Link>
          {currentUser && (
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="font-semibold text-foreground">{currentUser.name}</span>
              {currentRole && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${currentRole.bg} ${currentRole.color}`}>
                  {currentRole.label}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right: Global Language Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-slate-100 border border-slate-200 rounded-xl shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1 shrink-0" />
            {(['en', 'hi', 'bn'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === l
                    ? 'bg-white text-primary font-extrabold shadow-xs scale-102'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title={`Switch language to ${l === 'en' ? 'English' : l === 'hi' ? 'हिन्दी' : 'বাংলা'}`}
              >
                {l === 'en' ? 'EN' : l === 'hi' ? 'हिन्दी' : 'বাংলা'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
