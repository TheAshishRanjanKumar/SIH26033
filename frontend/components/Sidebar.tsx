'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/mock-data/store';
import { useTranslation, Language } from '@/lib/i18n';
import {
  Sprout, LayoutDashboard, ShoppingBasket, BarChart3,
  User as UserIcon, LogOut, PlusCircle, Globe, Menu, X, Shield, Tractor
} from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const { currentUser, setCurrentUser } = useAppStore();
  const { lang, setLang, t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!currentUser) return null;

  const isFarmer = currentUser.role === 'FARMER';

  const farmerNav = [
    { label: t.navHome, href: '/dashboard/farmer', icon: LayoutDashboard },
    { label: t.navMarket, href: '/dashboard/buyer', icon: ShoppingBasket },
    { label: t.navForecast, href: '/forecast', icon: BarChart3 },
  ];

  const fpoNav = [
    { label: t.navFPODashboard, href: '/dashboard/fpo', icon: LayoutDashboard },
    { label: t.navMarket, href: '/dashboard/buyer', icon: ShoppingBasket },
    { label: t.navForecast, href: '/forecast', icon: BarChart3 },
  ];

  const buyerNav = [
    { label: t.navMarket, href: '/dashboard/buyer', icon: ShoppingBasket },
    { label: t.navForecast, href: '/forecast', icon: BarChart3 },
  ];

  const adminNav = [
    { label: t.navDoCADashboard, href: '/dashboard/admin', icon: LayoutDashboard },
    { label: t.navForecast, href: '/forecast', icon: BarChart3 },
  ];

  const nav = isFarmer ? farmerNav
    : currentUser.role === 'FPO' ? fpoNav
    : currentUser.role === 'BUYER' ? buyerNav
    : adminNav;

  const handleLogout = () => {
    setCurrentUser(null);
    router.push('/');
  };

  const roleLabel = currentUser.role === 'FARMER' ? t.roleFarmer
    : currentUser.role === 'FPO' ? t.roleFPO
    : currentUser.role === 'BUYER' ? t.roleBuyer
    : t.roleAdmin;

  const roleBadgeColor = currentUser.role === 'FARMER' ? 'bg-success-light text-success'
    : currentUser.role === 'FPO' ? 'bg-purple-100 text-purple-700'
    : currentUser.role === 'BUYER' ? 'bg-accent-light text-accent'
    : 'bg-info-light text-info';

  const DesktopSidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-border">
      {/* Brand */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-primary">
          <Sprout className="w-6 h-6" />
          <span>{t.brand}</span>
        </Link>
      </div>

      {/* Language Selector in Desktop Sidebar */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-medium">
          <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 shrink-0" />
          {(['en', 'hi', 'bn'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`flex-1 py-1 rounded transition-colors ${
                lang === l
                  ? 'bg-white text-primary font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              {l === 'en' ? 'EN' : l === 'hi' ? 'हिन्दी' : 'বাংলা'}
            </button>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {nav.map(item => {
          const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                active ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
            {currentUser.role === 'FARMER' ? (
              <Tractor className="w-5 h-5 text-green-700" />
            ) : currentUser.role === 'ADMIN' ? (
              <Shield className="w-5 h-5 text-blue-700" />
            ) : (
              <UserIcon className="w-5 h-5 text-slate-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-foreground truncate">{currentUser.name}</div>
            <div className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-0.5 ${roleBadgeColor}`}>
              {roleLabel}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
        >
          <LogOut className="w-4 h-4" />
          {t.signOut}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0">
        {DesktopSidebarContent}
      </aside>

      {/* ── MOBILE BOTTOM NAVIGATION BAR ── */}
      <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5 flex items-center justify-around safe-area-pb">
        {/* Home */}
        <Link
          href={isFarmer ? '/dashboard/farmer' : nav[0]?.href || '/'}
          className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
            pathname === '/dashboard/farmer' || pathname === '/dashboard/fpo' || pathname === '/dashboard/admin'
              ? 'text-primary font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[11px] mt-0.5 font-medium">{t.navHome}</span>
        </Link>

        {/* Market */}
        <Link
          href="/dashboard/buyer"
          className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
            pathname.startsWith('/dashboard/buyer')
              ? 'text-primary font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <ShoppingBasket className="w-5 h-5" />
          <span className="text-[11px] mt-0.5 font-medium">{t.navMarket}</span>
        </Link>

        {/* Sell Button for Farmer (Prominent Center Action) */}
        {isFarmer ? (
          <Link
            href="/dashboard/farmer?action=sell"
            className="flex flex-col items-center -mt-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
              <PlusCircle className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-bold text-primary mt-0.5">{t.navSell}</span>
          </Link>
        ) : null}

        {/* Trend / Forecast */}
        <Link
          href="/forecast"
          className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
            pathname === '/forecast'
              ? 'text-primary font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-[11px] mt-0.5 font-medium">{t.navForecast}</span>
        </Link>

        {/* More Menu Drawer Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center py-1 px-3 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[11px] mt-0.5 font-medium">{t.navMenu}</span>
        </button>
      </nav>

      {/* ── MOBILE MENU DRAWER ── */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-5 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-lg text-primary">
                  <Sprout className="w-5 h-5" />
                  <span>{t.brand}</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* User Profile */}
              <div className="py-4 border-b border-slate-100">
                <div className="font-bold text-foreground">{currentUser.name}</div>
                <div className="text-xs text-muted">{currentUser.location || 'India'}</div>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-2 ${roleBadgeColor}`}>
                  {roleLabel}
                </span>
              </div>

              {/* Language Switcher */}
              <div className="py-4 border-b border-slate-100">
                <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" />
                  {t.language}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['en', 'hi', 'bn'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        lang === l
                          ? 'border-primary bg-primary text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {l === 'en' ? 'English' : l === 'hi' ? 'हिन्दी' : 'বাংলা'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="py-3 space-y-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 font-semibold"
                  >
                    <item.icon className="w-4 h-4 text-slate-400" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {t.signOut}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
