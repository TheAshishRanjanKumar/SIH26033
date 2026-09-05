'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import MobileHome from './MobileHome';
import MobileForecast from './MobileForecast';
import MobileRainfall from './MobileRainfall';
import MobileCropDetails from './MobileCropDetails';
import { Home, Sprout, Lightbulb, User, Signal, Wifi, Battery } from 'lucide-react';

export default function MobileShowcase() {
  const { t, language } = useLanguage();

  const screens = [
    {
      id: 'home',
      title: language === 'hi' ? '1. होम स्क्रीन (Home)' : '1. Home Screen',
      Component: () => <MobileHome onNavigate={() => {}} />,
      activeTab: 'home',
    },
    {
      id: 'forecast',
      title: language === 'hi' ? '2. मूल्य पूर्वानुमान (Price Forecast)' : '2. Price Forecast',
      Component: () => <MobileForecast onBack={() => {}} />,
      activeTab: 'crops',
    },
    {
      id: 'rainfall',
      title: language === 'hi' ? '3. वर्षा डेटा (Rainfall Data)' : '3. Rainfall Data',
      Component: () => <MobileRainfall onBack={() => {}} />,
      activeTab: 'advisories',
    },
    {
      id: 'cropDetails',
      title: language === 'hi' ? '4. फसल विवरण (Crop Details)' : '4. Crop Details',
      Component: () => <MobileCropDetails onBack={() => {}} onNavigateToForecast={() => {}} />,
      activeTab: 'crops',
    },
  ];

  return (
    <div className="space-y-6 py-4">
      <div className="text-center max-w-xl mx-auto space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          {language === 'hi' ? 'मोबाइल ऐप स्क्रीन' : 'Mobile App Screens'}
        </h2>
        <p className="text-xs text-slate-500">
          {language === 'hi'
            ? 'सरल, स्वच्छ और किसान-अनुकूल इंटरफ़ेस (डिज़ाइन मॉकअप के अनुसार)'
            : 'Simple, clean, and farmer-friendly UI/UX matching the 4 design screens'}
        </p>
      </div>

      {/* Grid of all 4 mobile mockups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center">
        {screens.map((scr) => (
          <div key={scr.id} className="flex flex-col items-center">
            <span className="text-xs font-bold text-slate-700 mb-3 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-2xs">
              {scr.title}
            </span>

            {/* Phone Bezel */}
            <div className="w-[300px] sm:w-[320px] h-[640px] bg-white rounded-[40px] shadow-xl border-[8px] border-slate-900 overflow-hidden relative flex flex-col select-none">
              {/* Notch */}
              <div className="h-8 bg-white px-5 flex items-center justify-between text-[11px] font-semibold text-slate-800 shrink-0 z-30">
                <span>9:41</span>
                <div className="w-16 h-3.5 bg-slate-900 rounded-full" />
                <div className="flex items-center gap-1 text-slate-700">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Screen Body */}
              <div className="flex-1 relative overflow-hidden bg-slate-50">
                <scr.Component />
              </div>

              {/* Bottom Nav Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-5 py-2 flex items-center justify-between z-30">
                <div className={`flex flex-col items-center gap-0.5 ${scr.activeTab === 'home' ? 'text-emerald-800 font-bold' : 'text-slate-400'}`}>
                  <Home className="w-3.5 h-3.5" />
                  <span className="text-[9px]">{t('navHome')}</span>
                </div>
                <div className={`flex flex-col items-center gap-0.5 ${scr.activeTab === 'crops' ? 'text-emerald-800 font-bold' : 'text-slate-400'}`}>
                  <Sprout className="w-3.5 h-3.5" />
                  <span className="text-[9px]">{t('navCrops')}</span>
                </div>
                <div className={`flex flex-col items-center gap-0.5 ${scr.activeTab === 'advisories' ? 'text-emerald-800 font-bold' : 'text-slate-400'}`}>
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span className="text-[9px]">{t('navAdvisories')}</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 text-slate-400">
                  <User className="w-3.5 h-3.5" />
                  <span className="text-[9px]">{t('navProfile')}</span>
                </div>
              </div>

              {/* Home indicator bar */}
              <div className="absolute bottom-1 inset-x-0 flex justify-center z-40 pointer-events-none">
                <div className="w-24 h-0.5 bg-slate-300 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

