'use client';

import React from 'react';
import { Sprout, Home } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function FarmerFooter() {
  const { t } = useLanguage();

  return (
    <footer className="space-y-6 pt-2 pb-8 text-left">
      {/* Value Callout Banner matching mockup */}
      <div className="bg-gradient-to-r from-emerald-100/90 via-emerald-50 to-amber-50 border border-emerald-200/90 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sprout className="w-7 h-7" />
          </div>
          <p className="text-base sm:text-lg font-black text-slate-800 leading-snug">
            {t('valueBannerText')}
          </p>
        </div>

        {/* Small village house illustration */}
        <div className="w-16 h-10 hidden sm:flex items-center justify-center shrink-0 opacity-80">
          <svg viewBox="0 0 60 40" className="w-full h-full">
            <polygon points="30,5 5,20 55,20" fill="#ea580c" />
            <rect x="10" y="20" width="40" height="20" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <rect x="25" y="25" width="10" height="15" fill="#78350f" />
          </svg>
        </div>
      </div>

      {/* Main Footer Links & Copyright */}
      <div className="border-t border-slate-200/80 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
        {/* Brand */}
        <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
          <div className="w-5 h-5 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </div>
          <span>KisanSetu</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <button className="hover:text-slate-900 transition-colors cursor-pointer">
            {t('footerAbout')}
          </button>
          <button className="hover:text-slate-900 transition-colors cursor-pointer">
            {t('footerContact')}
          </button>
          <button className="hover:text-slate-900 transition-colors cursor-pointer">
            {t('footerHelp')}
          </button>
        </div>

        {/* Made with love */}
        <div className="text-emerald-800 font-bold">
          {t('footerLove')}
        </div>
      </div>
    </footer>
  );
}

