'use client';

import React, { useState } from 'react';
import {
  Home,
  TrendingUp,
  CloudRain,
  Sprout,
  Bell,
  Languages,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import MobileHome from './MobileHome';
import MobileForecast from './MobileForecast';
import MobileRainfall from './MobileRainfall';
import MobileCropDetails from './MobileCropDetails';

export default function MobileResponsiveView() {
  const { t, language, toggleLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'home' | 'forecast' | 'rainfall' | 'crops'>('home');
  const [selectedCropId, setSelectedCropId] = useState('paddy');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between select-none">
      {/* Top Mobile App Header */}
      <header className="h-14 bg-white border-b border-slate-200/90 px-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center text-white shadow-xs">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </div>
          <span className="font-bold text-base text-slate-900 tracking-tight">
            {t('brandName')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher Pill */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-900 text-xs font-semibold shadow-2xs"
          >
            <Languages className="w-3 h-3 text-emerald-700" />
            <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
          </button>

          {/* Notification Icon */}
          <button
            className="p-1.5 text-slate-500 hover:text-slate-800 relative rounded-lg"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
        </div>
      </header>

      {/* Main Content View based on Active Tab */}
      <main className="flex-1 w-full pb-20">
        {activeTab === 'home' && (
          <MobileHome
            onNavigate={(screen) => {
              if (screen === 'forecast') setActiveTab('forecast');
              else if (screen === 'rainfall') setActiveTab('rainfall');
              else if (screen === 'cropDetails') setActiveTab('crops');
            }}
          />
        )}

        {activeTab === 'forecast' && (
          <MobileForecast
            onBack={() => setActiveTab('home')}
            onViewAnalysis={() => setActiveTab('crops')}
          />
        )}

        {activeTab === 'rainfall' && (
          <MobileRainfall onBack={() => setActiveTab('home')} />
        )}

        {activeTab === 'crops' && (
          <MobileCropDetails
            cropId={selectedCropId}
            onBack={() => setActiveTab('home')}
            onNavigateToForecast={() => setActiveTab('forecast')}
          />
        )}
      </main>

      {/* Fixed Native-like Bottom Navigation Bar */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex items-center justify-around z-40 shadow-lg">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            activeTab === 'home' ? 'text-emerald-800 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px]">{t('navHome')}</span>
        </button>

        <button
          onClick={() => setActiveTab('forecast')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            activeTab === 'forecast' ? 'text-emerald-800 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[11px]">{t('priceForecast')}</span>
        </button>

        <button
          onClick={() => setActiveTab('rainfall')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            activeTab === 'rainfall' ? 'text-emerald-800 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <CloudRain className="w-5 h-5" />
          <span className="text-[11px]">{language === 'hi' ? 'वर्षा' : 'Rainfall'}</span>
        </button>

        <button
          onClick={() => setActiveTab('crops')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            activeTab === 'crops' ? 'text-emerald-800 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Sprout className="w-5 h-5" />
          <span className="text-[11px]">{t('navCrops')}</span>
        </button>
      </nav>
    </div>
  );
}

