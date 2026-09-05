'use client';

import React, { useState } from 'react';
import { ChevronLeft, Search, ChevronDown, Droplet } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { BIHAR_DISTRICT_RAINFALL } from '@/lib/data/kisanData';

interface MobileRainfallProps {
  onBack: () => void;
}

export default function MobileRainfall({ onBack }: MobileRainfallProps) {
  const { t, language } = useLanguage();
  const [selectedYear, setSelectedYear] = useState('2024');

  const topDistricts = BIHAR_DISTRICT_RAINFALL.slice(0, 5);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto hide-scrollbar pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{language === 'hi' ? 'वर्षा डेटा' : 'Rainfall Data'}</span>
        </button>
        <button className="p-1 text-slate-500 hover:text-slate-800">
          <Search className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3.5 space-y-3.5">
        {/* State and Year Filter Pills */}
        <div className="flex items-center gap-2">
          {/* State selector */}
          <div className="relative flex-1">
            <select
              defaultValue="bihar"
              aria-label={t('locationBihar')}
              className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer shadow-2xs"
            >
              <option value="bihar">{language === 'hi' ? 'बिहार' : 'Bihar'}</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Year selector */}
          <div className="relative w-28">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              aria-label={language === 'hi' ? 'वर्ष' : 'Year'}
              className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer shadow-2xs"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Map Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          {/* Stylized vector map */}
          <div className="py-2 flex items-center justify-center">
            <svg viewBox="10 10 330 240" className="w-full max-h-[180px] h-auto">
              <defs>
                <filter id="mMapGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#2563eb" floodOpacity="0.12" />
                </filter>
              </defs>
              <g filter="url(#mMapGlow)">
                {/* Simplified district polygons for clean mobile rendering */}
                <path d="M 40 30 L 70 20 L 90 45 L 75 80 L 50 75 Z" fill="#1d4ed8" stroke="#ffffff" strokeWidth="1" />
                <path d="M 70 20 L 115 25 L 125 65 L 90 45 Z" fill="#2563eb" stroke="#ffffff" strokeWidth="1" />
                <path d="M 115 25 L 165 28 L 160 65 L 125 65 Z" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
                <path d="M 165 28 L 210 25 L 205 65 L 160 65 Z" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
                <path d="M 210 25 L 285 30 L 280 75 L 205 65 Z" fill="#1d4ed8" stroke="#ffffff" strokeWidth="1" />
                <path d="M 285 30 L 320 40 L 310 80 L 280 75 Z" fill="#172554" stroke="#ffffff" strokeWidth="1" />
                <path d="M 50 75 L 125 65 L 120 95 L 55 110 Z" fill="#60a5fa" stroke="#ffffff" strokeWidth="1" />
                <path d="M 125 65 L 205 65 L 200 100 L 120 95 Z" fill="#2563eb" stroke="#ffffff" strokeWidth="1" />
                <path d="M 205 65 L 280 75 L 260 110 L 200 100 Z" fill="#2563eb" stroke="#ffffff" strokeWidth="1" />
                <path d="M 260 110 L 305 115 L 300 145 L 260 145 Z" fill="#1e40af" stroke="#ffffff" strokeWidth="1" />
                <path d="M 55 110 L 120 95 L 115 135 L 50 145 Z" fill="#93c5fd" stroke="#ffffff" strokeWidth="1" />
                <path d="M 120 95 L 165 105 L 160 135 L 115 135 Z" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
                <path d="M 165 105 L 225 105 L 220 135 L 160 135 Z" fill="#2563eb" stroke="#ffffff" strokeWidth="1" />
                <path d="M 225 105 L 280 110 L 275 140 L 220 135 Z" fill="#1d4ed8" stroke="#ffffff" strokeWidth="1" />
                <path d="M 115 135 L 175 135 L 170 170 L 110 170 Z" fill="#1d4ed8" stroke="#ffffff" strokeWidth="1" />
                <path d="M 175 135 L 235 135 L 230 170 L 170 170 Z" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
                <path d="M 235 135 L 285 140 L 280 175 L 230 170 Z" fill="#2563eb" stroke="#ffffff" strokeWidth="1" />
                <path d="M 50 145 L 110 140 L 105 190 L 40 195 Z" fill="#93c5fd" stroke="#ffffff" strokeWidth="1" />
                <path d="M 110 140 L 165 140 L 155 195 L 105 190 Z" fill="#60a5fa" stroke="#ffffff" strokeWidth="1" />
                <path d="M 165 140 L 220 140 L 210 200 L 155 195 Z" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
                <path d="M 220 140 L 280 145 L 270 205 L 210 200 Z" fill="#2563eb" stroke="#ffffff" strokeWidth="1" />
                <path d="M 80 195 L 150 195 L 140 235 L 75 230 Z" fill="#60a5fa" stroke="#ffffff" strokeWidth="1" />
                <path d="M 150 195 L 215 200 L 205 240 L 140 235 Z" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
                <path d="M 215 200 L 270 205 L 260 240 L 205 240 Z" fill="#93c5fd" stroke="#ffffff" strokeWidth="1" />
              </g>
            </svg>
          </div>

          {/* Color Scale Bar matching mockup */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium pt-2 border-t border-slate-100">
            <span>{t('low')}</span>
            <div className="h-1.5 flex-1 mx-3 rounded-full bg-gradient-to-r from-[#93c5fd] via-[#3b82f6] to-[#172554]" />
            <span>{t('high')}</span>
          </div>
        </div>

        {/* District-wise Rainfall List matching mockup */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs">
          <div className="text-xs font-bold text-slate-900 mb-3">
            {t('districtWiseRainfallTitle')}
          </div>

          <div className="space-y-2 divide-y divide-slate-100">
            {topDistricts.map((item) => (
              <div key={item.name} className="flex items-center justify-between pt-2 first:pt-0 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-semibold text-slate-800">
                    {language === 'hi' ? item.nameHi : item.name}
                  </span>
                </div>
                <span className="font-mono font-bold text-slate-900">
                  {item.rainfallMm} mm
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

