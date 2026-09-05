'use client';

import React, { useState } from 'react';
import { ChevronLeft, Heart, Sprout, TrendingUp, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { CROPS_DATA } from '@/lib/data/kisanData';

interface MobileCropDetailsProps {
  onBack: () => void;
  onNavigateToForecast: () => void;
  cropId?: string;
}

export default function MobileCropDetails({
  onBack,
  onNavigateToForecast,
  cropId = 'paddy',
}: MobileCropDetailsProps) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'prices' | 'production' | 'advisories'>('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  const crop = CROPS_DATA[cropId] || CROPS_DATA.paddy;

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto hide-scrollbar pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100 sticky top-0 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('cropDetails')}</span>
        </button>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`p-1.5 rounded-full transition-colors ${
            isFavorite ? 'text-rose-500 bg-rose-50' : 'text-slate-400 hover:text-slate-700'
          }`}
          aria-label="Favorite crop"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Hero Banner with Harvest Golden Field Illustration */}
      <div className="relative h-44 w-full bg-gradient-to-t from-emerald-950 via-emerald-900 to-emerald-800 overflow-hidden shrink-0">
        {/* Decorative Sunlit Crop SVG */}
        <svg viewBox="0 0 320 180" className="w-full h-full object-cover opacity-60">
          <defs>
            <linearGradient id="paddySun" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>
          <circle cx="160" cy="50" r="35" fill="url(#paddySun)" opacity="0.4" />
          <path d="M 0 120 Q 80 90, 160 110 T 320 100 L 320 180 L 0 180 Z" fill="#14532d" />
          {/* Wheat Stalks */}
          <path d="M 40 180 L 45 100 M 60 180 L 65 95 M 100 180 L 95 105 M 140 180 L 145 90 M 180 180 L 175 100 M 220 180 L 225 95 M 260 180 L 255 105 M 290 180 L 295 90" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        {/* Text Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
          <h2 className="text-xl font-black text-white tracking-tight">
            {language === 'hi' ? crop.nameHi : crop.nameEn}
          </h2>
          <p className="text-xs text-emerald-200 font-medium mt-0.5">
            {language === 'hi' ? crop.seasonHi : crop.seasonEn}
          </p>
        </div>
      </div>

      <div className="p-3.5 space-y-3.5">
        {/* Tabs: Overview, Prices, Production, Advisories */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-1 text-xs">
          {(['overview', 'prices', 'production', 'advisories'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1.5 font-semibold transition-all relative ${
                activeTab === tab
                  ? 'text-emerald-800'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              {tab === 'overview' && t('tabOverview')}
              {tab === 'prices' && t('tabPrices')}
              {tab === 'production' && t('tabProduction')}
              {tab === 'advisories' && t('tabAdvisories')}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-800 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* 2x2 Metric Stats Card matching mockup */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] text-slate-400 font-medium">
                {t('colAvgPrice')}
              </div>
              <div className="text-base font-extrabold text-slate-900 mt-0.5">
                ₹ {crop.currentPrice.toLocaleString('en-IN')}
              </div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 font-medium">
                {language === 'hi' ? 'रुझान' : 'Trend'}
              </div>
              <div
                className={`text-base font-extrabold mt-0.5 flex items-center gap-0.5 ${
                  crop.isPositive ? 'text-emerald-700' : 'text-rose-600'
                }`}
              >
                <span>{crop.isPositive ? '↑' : '↓'}</span>
                <span>{crop.trend}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="text-[10px] text-slate-400 font-medium">
                {t('production2023')}
              </div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">
                {crop.production2023}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="text-[10px] text-slate-400 font-medium">
                {t('majorDistricts')}
              </div>
              <div className="text-xs font-semibold text-slate-800 mt-0.5 truncate">
                {crop.districts}
              </div>
            </div>
          </div>
        </div>

        {/* About Section matching mockup */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-1.5">
          <h4 className="text-xs font-bold text-slate-900">
            {t('aboutCrop')}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'hi' ? crop.descriptionHi : crop.descriptionEn}
          </p>
        </div>

        {/* Primary CTA button */}
        <button
          onClick={onNavigateToForecast}
          className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-3 rounded-xl text-xs sm:text-sm transition-colors shadow-xs"
        >
          {t('viewPriceForecast')}
        </button>
      </div>
    </div>
  );
}

