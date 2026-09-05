'use client';

import React, { useState } from 'react';
import {
  Home,
  Sprout,
  Lightbulb,
  User,
  ArrowLeft,
  Wifi,
  Battery,
  Signal,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import MobileHome from './MobileHome';
import MobileForecast from './MobileForecast';
import MobileRainfall from './MobileRainfall';
import MobileCropDetails from './MobileCropDetails';

export type MobileScreen = 'home' | 'forecast' | 'rainfall' | 'cropDetails';

interface MobileAppContainerProps {
  initialScreen?: MobileScreen;
  isStandalonePhone?: boolean;
}

export default function MobileAppContainer({
  initialScreen = 'home',
  isStandalonePhone = false,
}: MobileAppContainerProps) {
  const { t, language } = useLanguage();
  const [activeScreen, setActiveScreen] = useState<MobileScreen>(initialScreen);
  const [selectedCropId, setSelectedCropId] = useState('paddy');

  // Switch screens
  const handleNavigate = (screen: MobileScreen, cropId?: string) => {
    if (cropId) setSelectedCropId(cropId);
    setActiveScreen(screen);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Phone Screen Selector Tabs when viewed in desktop simulator mode */}
      {!isStandalonePhone && (
        <div className="mb-5 flex flex-wrap items-center justify-center gap-2 bg-white/90 backdrop-blur-xs border border-slate-200 p-1.5 rounded-2xl shadow-xs z-10">
          <button
            onClick={() => setActiveScreen('home')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeScreen === 'home'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. {t('navHome')}
          </button>
          <button
            onClick={() => setActiveScreen('forecast')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeScreen === 'forecast'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. {t('priceForecast')}
          </button>
          <button
            onClick={() => setActiveScreen('rainfall')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeScreen === 'rainfall'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. {language === 'hi' ? 'वर्षा डेटा' : 'Rainfall Data'}
          </button>
          <button
            onClick={() => setActiveScreen('cropDetails')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeScreen === 'cropDetails'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            4. {t('cropDetails')}
          </button>
        </div>
      )}

      {/* Realistic Mobile Device Frame matching mockup */}
      <div className="w-[360px] h-[720px] bg-white rounded-[44px] shadow-2xl border-[10px] border-slate-900 overflow-hidden relative flex flex-col select-none">
        {/* Top Camera Notch & Status Bar */}
        <div className="h-9 bg-white px-6 flex items-center justify-between text-xs font-semibold text-slate-800 shrink-0 z-30">
          <span>9:41</span>
          {/* Dynamic Island / Speaker Pill */}
          <div className="w-20 h-4 bg-slate-900 rounded-full" />
          <div className="flex items-center gap-1.5 text-slate-700">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 relative overflow-hidden bg-slate-50">
          {activeScreen === 'home' && (
            <MobileHome onNavigate={(scr) => handleNavigate(scr)} />
          )}
          {activeScreen === 'forecast' && (
            <MobileForecast
              onBack={() => setActiveScreen('home')}
              onViewAnalysis={() => setActiveScreen('cropDetails')}
            />
          )}
          {activeScreen === 'rainfall' && (
            <MobileRainfall onBack={() => setActiveScreen('home')} />
          )}
          {activeScreen === 'cropDetails' && (
            <MobileCropDetails
              cropId={selectedCropId}
              onBack={() => setActiveScreen('home')}
              onNavigateToForecast={() => setActiveScreen('forecast')}
            />
          )}
        </div>

        {/* Bottom Floating Navigation Bar matching mockup */}
        <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-2 flex items-center justify-between z-30">
          <button
            onClick={() => setActiveScreen('home')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeScreen === 'home' ? 'text-emerald-800 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px]">{t('navHome')}</span>
          </button>

          <button
            onClick={() => setActiveScreen('cropDetails')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeScreen === 'cropDetails' ? 'text-emerald-800 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span className="text-[10px]">{t('navCrops')}</span>
          </button>

          <button
            onClick={() => setActiveScreen('rainfall')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeScreen === 'rainfall' ? 'text-emerald-800 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span className="text-[10px]">{t('navAdvisories')}</span>
          </button>

          <button
            onClick={() => setActiveScreen('forecast')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeScreen === 'forecast' ? 'text-emerald-800 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[10px]">{t('navProfile')}</span>
          </button>
        </div>

        {/* Home Indicator Bar */}
        <div className="absolute bottom-1 inset-x-0 flex justify-center z-40 pointer-events-none">
          <div className="w-32 h-1 bg-slate-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}

