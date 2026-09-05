'use client';

import React from 'react';
import {
  Search,
  MapPin,
  ChevronDown,
  Sun,
  Bell,
  Languages,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface KisanHeaderProps {
  onOpenMobileMenu?: () => void;
}

export default function KisanHeader({ onOpenMobileMenu }: KisanHeaderProps) {
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between gap-3 sticky top-0 z-20 shadow-2xs">
      {/* Left: Mobile hamburger + Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Toggle Menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search Input Box */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="w-full pl-9 pr-16 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition-all shadow-2xs"
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 border border-slate-200 rounded text-[10px] font-mono text-slate-400 bg-white shadow-2xs">
              Ctrl + K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Bilingual Language Switcher Button */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
          title="Switch Language / भाषा बदलें"
        >
          <Languages className="w-3.5 h-3.5 text-emerald-700" />
          <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
        </button>

        {/* Location Dropdown */}
        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 cursor-pointer shadow-2xs">
          <MapPin className="w-3.5 h-3.5 text-slate-600" />
          <span>{t('locationBihar')}</span>
          <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
        </div>

        {/* Sun / Theme icon */}
        <button
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          title="Day mode"
          aria-label="Theme toggle"
        >
          <Sun className="w-4 h-4" />
        </button>

        {/* Notification Bell with Badge */}
        <button
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors relative"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-1 sm:pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            A
          </div>
          <div className="hidden md:block text-left leading-tight">
            <div className="text-xs font-semibold text-slate-800">Ashish</div>
            <div className="text-[10px] text-slate-400 font-normal">{t('userRole')}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
