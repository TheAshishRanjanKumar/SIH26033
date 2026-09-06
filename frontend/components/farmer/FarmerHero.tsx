'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface FarmerHeroProps {
  onExploreDistrict?: () => void;
}

export default function FarmerHero({ onExploreDistrict }: FarmerHeroProps) {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-emerald-200/90 bg-gradient-to-b from-[#e0f2fe] via-[#dcfce7] to-[#bbf7d0] p-6 sm:p-10 shadow-xs">
      {/* Sun in sky */}
      <div className="absolute top-4 right-1/3 w-20 h-20 rounded-full bg-amber-300/80 blur-xs pointer-events-none" />

      {/* Decorative rolling field curves */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-emerald-600/30 to-transparent pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Copy & CTA */}
        <div className="md:col-span-7 space-y-4 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {t('heroTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-700 max-w-xl leading-relaxed font-medium">
            {t('heroSubtitle')}
          </p>
          <div className="pt-2">
            <button
              onClick={onExploreDistrict}
              className="inline-flex items-center gap-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-3 rounded-2xl text-sm sm:text-base transition-all shadow-md hover:shadow-lg cursor-pointer transform active:scale-95"
            >
              <span>{t('heroCta')}</span>
            </button>
          </div>
        </div>

        {/* Right Illustration: Cheerful Indian farmer with smartphone and speech bubble */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          {/* Speech Bubble */}
          <div className="absolute -top-3 right-4 sm:right-8 bg-white border border-emerald-200 rounded-2xl px-4 py-2 shadow-md z-20 animate-bounce-subtle">
            <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
              {t('brandSpeech')}
            </div>
          </div>

          {/* Farmer Artwork with pagri and smartphone */}
          <div className="w-56 h-56 sm:w-64 sm:h-64 relative flex items-end justify-center">
            <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md">
              <defs>
                <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>

              {/* Kurta / Shoulders */}
              <path d="M 40 240 L 45 170 C 45 140, 80 135, 120 135 C 160 135, 195 140, 195 170 L 200 240 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              {/* Gamcha / Scarf on shoulders */}
              <path d="M 60 160 C 60 210, 80 230, 85 240 L 70 240 C 65 220, 50 190, 50 160 Z" fill="#15803d" />
              <path d="M 180 160 C 180 210, 160 230, 155 240 L 170 240 C 175 220, 190 190, 190 160 Z" fill="#15803d" />

              {/* Neck */}
              <rect x="105" y="115" width="30" height="30" fill="#f59e0b" />

              {/* Head / Face */}
              <ellipse cx="120" cy="95" rx="36" ry="40" fill="#fbbf24" />

              {/* Ears */}
              <circle cx="82" cy="95" r="8" fill="#f59e0b" />
              <circle cx="158" cy="95" r="8" fill="#f59e0b" />

              {/* Eyes */}
              <ellipse cx="106" cy="88" rx="4" ry="5" fill="#1e293b" />
              <ellipse cx="134" cy="88" rx="4" ry="5" fill="#1e293b" />
              <circle cx="107" cy="86" r="1.5" fill="#ffffff" />
              <circle cx="135" cy="86" r="1.5" fill="#ffffff" />

              {/* Eyebrows */}
              <path d="M 98 80 Q 106 75, 114 80" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 126 80 Q 134 75, 142 80" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />

              {/* Nose */}
              <path d="M 120 86 L 117 98 L 123 98" stroke="#d97706" strokeWidth="2.5" fill="none" strokeLinecap="round" />

              {/* Big Smiling Mustache */}
              <path d="M 96 106 Q 120 98, 120 108 Q 120 98, 144 106 Q 120 120, 96 106 Z" fill="#1e293b" />

              {/* Smile below mustache */}
              <path d="M 110 118 Q 120 125, 130 118" stroke="#b45309" strokeWidth="2.5" fill="none" strokeLinecap="round" />

              {/* Traditional White Pagri / Turban with wraps */}
              <path d="M 75 75 C 65 35, 110 20, 165 40 C 175 55, 170 75, 165 80 C 145 65, 95 65, 75 75 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <path d="M 80 55 C 95 30, 140 25, 160 45" stroke="#15803d" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M 75 70 C 90 45, 145 40, 165 65" stroke="#15803d" strokeWidth="2" fill="none" />

              {/* Hand Holding Smartphone */}
              <g transform="translate(45, 120)">
                {/* Arm */}
                <path d="M 10 120 L 25 50 L 45 60 L 30 120 Z" fill="#ffffff" />
                {/* Hand */}
                <circle cx="35" cy="50" r="14" fill="#fbbf24" />
                {/* Smartphone */}
                <rect x="25" y="10" width="28" height="52" rx="6" fill="#1e293b" />
                <rect x="27" y="14" width="24" height="44" rx="3" fill="#38bdf8" />
                {/* Screen content (mini kisan green bar) */}
                <rect x="29" y="18" width="20" height="8" rx="2" fill="#15803d" />
                <circle cx="33" cy="22" r="2" fill="#ffffff" />
                <rect x="29" y="30" width="14" height="3" fill="#ffffff" />
                <rect x="29" y="36" width="18" height="3" fill="#ffffff" />
                {/* Fingers wrapping phone */}
                <rect x="18" y="30" width="10" height="6" rx="3" fill="#f59e0b" />
                <rect x="18" y="38" width="10" height="6" rx="3" fill="#f59e0b" />
                <rect x="18" y="46" width="10" height="6" rx="3" fill="#f59e0b" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

