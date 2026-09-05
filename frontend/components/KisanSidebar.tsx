'use client';

import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Store,
  CloudRain,
  Sprout,
  ArrowLeftRight,
  Lightbulb,
  Compass,
  FileText,
  Bookmark,
  Settings,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface KisanSidebarProps {
  activeNav?: string;
  onNavigate?: (item: string) => void;
}

export default function KisanSidebar({
  activeNav = 'dashboard',
  onNavigate,
}: KisanSidebarProps) {
  const { t, language } = useLanguage();

  const navItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'forecast', label: t('priceForecast'), icon: TrendingUp },
    { id: 'prices', label: t('marketPrices'), icon: Store },
    { id: 'weather', label: t('weatherRainfall'), icon: CloudRain },
    { id: 'production', label: t('cropProduction'), icon: Sprout },
    { id: 'compare', label: t('compareCrops'), icon: ArrowLeftRight },
    { id: 'advisories', label: t('advisories'), icon: Lightbulb },
    { id: 'insights', label: t('biharInsights'), icon: Compass },
    { id: 'reports', label: t('reports'), icon: FileText },
    { id: 'saved', label: t('saved'), icon: Bookmark },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200/90 flex flex-col justify-between h-screen sticky top-0 overflow-y-auto hide-scrollbar z-30">
      {/* Top Brand */}
      <div>
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-xs">
            {/* Custom Leaf SVG */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-none">
              {t('brandName')}
            </h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-tight mt-0.5">
              {t('brandTagline')}
            </p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="p-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate && onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-800 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-emerald-300' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Promo & Version Footer */}
      <div className="p-3">
        {/* Promo Card matching mockup illustration */}
        <div className="relative overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 via-cream-50/50 to-amber-50/30 p-3 text-center shadow-2xs mb-2">
          {/* Decorative Field SVG */}
          <div className="w-16 h-12 mx-auto mb-1.5 flex items-center justify-center">
            <svg viewBox="0 0 100 70" className="w-full h-full">
              <circle cx="50" cy="55" r="30" fill="#dcfce7" />
              <path d="M50 55 C 45 40, 30 35, 25 38 C 25 48, 40 50, 50 55 Z" fill="#22c55e" />
              <path d="M50 55 C 55 40, 70 35, 75 38 C 75 48, 60 50, 50 55 Z" fill="#16a34a" />
              <path d="M50 55 L 50 25 C 48 20, 52 20, 50 25 Z" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
              <path d="M50 35 C 40 25, 35 30, 45 35 Z" fill="#86efac" />
              <path d="M50 30 C 60 20, 65 25, 55 30 Z" fill="#4ade80" />
            </svg>
          </div>
          <h4 className="text-xs font-bold text-slate-800 leading-tight">
            {t('sidebarPromoTitle')}
          </h4>
          <p className="text-[10px] text-slate-500 font-normal italic mt-1 leading-snug">
            {t('sidebarPromoDesc')}
          </p>
        </div>

        {/* Footer brand + v1.0.0 */}
        <div className="flex items-center justify-between px-2 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 font-medium text-slate-600">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>KisanSetu</span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}

