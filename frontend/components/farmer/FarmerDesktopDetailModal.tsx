'use client';

import React from 'react';
import { X, IndianRupee, CloudSun, Sprout, Lightbulb, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  POPULAR_CROPS,
  FIVE_DAY_FORECAST,
  ADVISORY_LIST,
  PopularCrop,
} from '@/lib/data/kisanData';

interface FarmerDesktopDetailModalProps {
  type: 'prices' | 'weather' | 'production' | 'advisory' | null;
  crop?: PopularCrop | null;
  district?: string;
  onClose: () => void;
}

export default function FarmerDesktopDetailModal({
  type,
  crop,
  district = 'Patna',
  onClose,
}: FarmerDesktopDetailModalProps) {
  const { t, language } = useLanguage();

  if (!type) return null;

  const currentCrop = crop || POPULAR_CROPS[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============ MODAL: PRICES ============ */}
        {type === 'prices' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <IndianRupee className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  {t('cardPricesTitle')} — {district}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {t('aajKaMandiBhav')} ({district}, Bihar)
                </p>
              </div>
            </div>

            {/* Crop Info */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-3xl">{currentCrop.image}</span>
              <div>
                <h4 className="font-extrabold text-base text-slate-900">
                  {language === 'hi' ? currentCrop.nameHi : currentCrop.nameEn}
                </h4>
                <span className="text-xs text-slate-500 font-medium">
                  {currentCrop.variety}
                </span>
              </div>
            </div>

            {/* 3 Tier Price Box */}
            <div className="space-y-2 text-xs font-bold divide-y divide-slate-100 bg-white border border-slate-200 p-4 rounded-2xl">
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-600">{t('sabseAdhikDaam')}</span>
                <span className="text-base font-black text-slate-900">
                  ₹ {currentCrop.maxPrice.toLocaleString('en-IN')} / क्विंटल
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-600">{t('sabseKamDaam')}</span>
                <span className="text-base font-black text-slate-900">
                  ₹ {currentCrop.minPrice.toLocaleString('en-IN')} / क्विंटल
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 text-emerald-800 bg-emerald-50/70 -mx-4 px-4 py-2 rounded-lg">
                <span className="font-bold">{t('aamDaam')}</span>
                <span className="text-lg font-black text-emerald-900">
                  ₹ {currentCrop.modalPrice.toLocaleString('en-IN')} / क्विंटल
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl text-sm transition-colors cursor-pointer"
            >
              {t('puraItihaasDekhen')}
            </button>
          </div>
        )}

        {/* ============ MODAL: WEATHER ============ */}
        {type === 'weather' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-xs">
                <CloudSun className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  {t('cardWeatherTitle')} — {district}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {t('cardWeatherDesc')}
                </p>
              </div>
            </div>

            <div className="p-4 bg-sky-50/70 border border-sky-200/80 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">⛅</span>
                <div>
                  <div className="text-3xl font-black text-slate-900">32°C</div>
                  <div className="text-xs font-bold text-slate-600">{t('halkaBadal')}</div>
                </div>
              </div>
              <div className="text-right text-xs font-bold text-slate-600 space-y-1">
                <div>💧 {t('aajKiBarish')}: 0 mm</div>
                <div>💨 {t('nami')}: 68%</div>
                <div>🌪️ {t('hawaKiRaftaar')}: 12 km/h</div>
              </div>
            </div>

            {/* 5-day list */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-900">{t('aaneWale5Din')}</h4>
              <div className="space-y-1.5 divide-y divide-slate-100 border border-slate-200 rounded-2xl p-3">
                {FIVE_DAY_FORECAST.map((f, i) => (
                  <div key={i} className="flex items-center justify-between pt-1.5 first:pt-0 text-xs font-bold text-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{f.icon === 'sun' ? '☀️' : f.icon === 'cloud' ? '⛅' : '🌧️'}</span>
                      <span>{language === 'hi' ? f.dayHi : f.dayEn}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({language === 'hi' ? f.conditionHi : f.conditionEn})</span>
                    </div>
                    <span>{f.temp}°C</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ MODAL: PRODUCTION ============ */}
        {type === 'production' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  {t('cardProductionTitle')} — {district}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {t('cardProductionDesc')}
                </p>
              </div>
            </div>

            <div className="space-y-2 border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 border-b border-slate-100 pb-2">
                <span>{language === 'hi' ? 'प्रमुख फसल' : 'Key Crop'}</span>
                <span>{language === 'hi' ? 'अनुमानित उत्पादन' : 'Est. Production'}</span>
              </div>
              {POPULAR_CROPS.map((c) => (
                <div key={c.id} className="flex items-center justify-between text-xs py-1">
                  <span className="font-bold flex items-center gap-2">
                    <span>{c.image}</span>
                    <span>{language === 'hi' ? c.nameHi : c.nameEn}</span>
                  </span>
                  <span className="font-mono text-emerald-800 font-bold">
                    {c.modalPrice > 3000 ? '18.4 L Tonnes' : '95.2 L Tonnes'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ MODAL: ADVISORY ============ */}
        {type === 'advisory' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  {t('cardAdvisoryTitle')}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {t('cardAdvisoryDesc')}
                </p>
              </div>
            </div>

            <div className="space-y-2 max-h-[340px] overflow-y-auto hide-scrollbar">
              {ADVISORY_LIST.map((item) => (
                <div key={item.id} className="border border-slate-200 rounded-2xl p-3.5 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900">
                    <span className="text-lg">{item.icon}</span>
                    <span>{t(item.titleKey)}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed pl-7">
                    {language === 'hi' ? item.detailHi : item.detailEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

