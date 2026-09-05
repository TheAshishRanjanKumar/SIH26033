'use client';

import React from 'react';
import {
  Bell,
  Search,
  Store,
  CloudSun,
  Sprout,
  Lightbulb,
  TrendingUp,
  CloudRain,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface MobileHomeProps {
  onNavigate: (screen: 'home' | 'forecast' | 'rainfall' | 'cropDetails') => void;
}

export default function MobileHome({ onNavigate }: MobileHomeProps) {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto hide-scrollbar pb-20">
      {/* Top Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </div>
          <span className="font-bold text-base text-slate-900">{t('brandName')}</span>
        </div>

        <button className="p-2 text-slate-600 hover:text-slate-900 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>
      </div>

      <div className="p-3.5 space-y-3.5">
        {/* Hero Card with Farmer image & text */}
        <div className="bg-gradient-to-br from-emerald-50 via-emerald-100/50 to-amber-50/70 border border-emerald-200/80 rounded-2xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1.5 flex-1 z-10">
              <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                {t('heroTitle')}
              </h3>
              <p className="text-[11px] text-slate-600 leading-tight">
                {language === 'hi'
                  ? 'बिहार के किसानों के लिए वास्तविक समय की जानकारी।'
                  : "Real-time insights for Bihar's farmers."}
              </p>
            </div>

            {/* Farmer visual */}
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white shadow-xs bg-emerald-800">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect width="100" height="100" fill="#a7f3d0" />
                <circle cx="50" cy="35" r="18" fill="#78350f" />
                <path d="M 30 25 C 20 10, 80 10, 70 25 Z" fill="#eab308" />
                <path d="M 20 100 L 25 55 C 25 45, 75 45, 75 55 L 80 100 Z" fill="#ffffff" />
              </svg>
            </div>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder={language === 'hi' ? 'फसल, जिला, मंडी खोजें...' : 'Search crop, district, market...'}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-600 shadow-2xs"
          />
        </div>

        {/* 4 Quick Action Circles matching mockup */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <button
            onClick={() => onNavigate('forecast')}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-100/80 text-emerald-800 flex items-center justify-center shadow-2xs group-active:scale-95 transition-transform">
              <Store className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-700">{t('quickPrices')}</span>
          </button>

          <button
            onClick={() => onNavigate('rainfall')}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-11 h-11 rounded-full bg-blue-100/80 text-blue-700 flex items-center justify-center shadow-2xs group-active:scale-95 transition-transform">
              <CloudSun className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-700">{t('quickWeather')}</span>
          </button>

          <button
            onClick={() => onNavigate('cropDetails')}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-11 h-11 rounded-full bg-amber-100/80 text-amber-700 flex items-center justify-center shadow-2xs group-active:scale-95 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-700">{t('quickProduction')}</span>
          </button>

          <button
            onClick={() => onNavigate('forecast')}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-11 h-11 rounded-full bg-purple-100/80 text-purple-700 flex items-center justify-center shadow-2xs group-active:scale-95 transition-transform">
              <Lightbulb className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-700">{t('advisories')}</span>
          </button>
        </div>

        {/* Today's Weather Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold text-slate-800 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              {t('todaysWeather')}
            </span>
            <span className="text-[10px] text-slate-400">{t('locationPatna')}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CloudSun className="w-8 h-8 text-amber-500" />
              <div>
                <div className="text-xl font-bold text-slate-900">32°C</div>
                <div className="text-[10px] text-slate-500">{t('partlyCloudy')}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-right text-[11px] text-slate-600">
              <div>
                <span className="text-slate-400">💧</span> 68%
              </div>
              <div>
                <span className="text-slate-400">💨</span> 12 km/h
              </div>
              <div>
                <span className="text-slate-400">🌧</span> 0 mm
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid (4 cards matching mockup) */}
        <div>
          <div className="text-xs font-semibold text-slate-800 mb-2">
            {language === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => onNavigate('forecast')}
              className="bg-white border border-slate-200 rounded-xl p-3 text-left hover:border-emerald-300 transition-colors shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold text-slate-800 group-hover:text-emerald-800">
                {t('priceForecast')}
              </div>
            </button>

            <button
              onClick={() => onNavigate('forecast')}
              className="bg-white border border-slate-200 rounded-xl p-3 text-left hover:border-blue-300 transition-colors shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-2">
                <Store className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-800">
                {t('marketPrices')}
              </div>
            </button>

            <button
              onClick={() => onNavigate('rainfall')}
              className="bg-white border border-slate-200 rounded-xl p-3 text-left hover:border-sky-300 transition-colors shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mb-2">
                <CloudRain className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold text-slate-800 group-hover:text-sky-800">
                {language === 'hi' ? 'वर्षा डेटा' : 'Rainfall Data'}
              </div>
            </button>

            <button
              onClick={() => onNavigate('cropDetails')}
              className="bg-white border border-slate-200 rounded-xl p-3 text-left hover:border-amber-300 transition-colors shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
                <Sprout className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold text-slate-800 group-hover:text-amber-800">
                {t('cropProduction')}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

