'use client';

import React from 'react';
import {
  Home,
  CircleDollarSign,
  CloudSun,
  BarChart3,
  Lightbulb,
  Languages,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface FarmerTopNavProps {
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

export default function FarmerTopNav({
  activeSection = 'home',
  onNavigate,
}: FarmerTopNavProps) {
  const { t, language, toggleLanguage } = useLanguage();

  const navItems = [
    { id: 'home', label: t('navHome'), icon: Home },
    { id: 'prices', label: t('navPrices'), icon: CircleDollarSign },
    { id: 'weather', label: t('navWeather'), icon: CloudSun },
    { id: 'production', label: t('navProduction'), icon: BarChart3 },
    { id: 'advisory', label: t('navAdvisory'), icon: Lightbulb },
  ];

  return (
    <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Left: Brand Logo + Tagline */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 flex items-center justify-center text-white shadow-xs">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 leading-none tracking-tight">
              {t('brandName')}
            </h1>
            <p className="text-[11px] text-slate-500 font-medium tracking-tight mt-0.5">
              {t('brandTagline')}
            </p>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate && onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'text-emerald-800 border-b-2 border-emerald-700 bg-emerald-50/70 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Bilingual Language Toggle Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer"
            title="भाषा बदलें / Change Language"
          >
            <Languages className="w-4 h-4 text-emerald-700" />
            <span>{language === 'hi' ? 'English' : 'हिंदी'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

