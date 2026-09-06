'use client';

import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Store, AlertCircle, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getDistrictCropData, DistrictCropData } from '@/lib/data/kisanData';

interface PriceHistorySheetProps {
  district: string;
  cropId: string;
  onClose: () => void;
}

export default function PriceHistorySheet({
  district,
  cropId,
  onClose,
}: PriceHistorySheetProps) {
  const { t, language } = useLanguage();
  const cropData: DistrictCropData = getDistrictCropData(district, cropId);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(cropData.history.length - 1);

  const selectedPoint = cropData.history[selectedDayIndex];
  const maxHistoryPrice = Math.max(...cropData.history.map((h) => h.modalPrice));
  const minHistoryPrice = Math.min(...cropData.history.map((h) => h.modalPrice));

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[92vh] sm:max-h-[85vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top grab bar on mobile */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto sm:hidden -mt-1 mb-2" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-300 text-2xl flex items-center justify-center shadow-2xs">
              {cropData.crop.image}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  {language === 'hi' ? cropData.crop.nameHi : cropData.crop.nameEn}
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {district}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {t('weeklyTrend')} • {cropData.crop.variety}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Government MSP Benchmark Card */}
        <div className={`p-4 rounded-2xl border ${
          cropData.isAboveMsp
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            : 'bg-amber-50/80 border-amber-200 text-amber-950'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-tight text-slate-600">
              {t('mspLabel')}
            </span>
            <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-white border border-slate-200">
              ₹ {cropData.msp.toLocaleString('en-IN')} / {t('quintal')}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-black text-sm sm:text-base">
              {cropData.isAboveMsp ? (
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-amber-600" />
              )}
              <span>
                ₹ {Math.abs(cropData.mspDifference).toLocaleString('en-IN')}{' '}
                {cropData.isAboveMsp ? t('aboveMsp') : t('belowMsp')}
              </span>
            </div>

            <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
              cropData.isAboveMsp
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-600 text-white'
            }`}>
              {language === 'hi' ? cropData.recommendation.badgeHi : cropData.recommendation.badgeEn}
            </span>
          </div>

          <p className="text-[11px] font-medium text-slate-600 mt-2 leading-relaxed">
            {language === 'hi' ? cropData.recommendation.reasonHi : cropData.recommendation.reasonEn}
          </p>
        </div>

        {/* 2. 7-Day Visual Price Trend Graph */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
              <BarChart2 className="w-4 h-4 text-emerald-700" />
              <span>{t('weeklyTrend')}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              (₹ / {t('quintal')})
            </span>
          </div>

          {/* Interactive Bar Columns */}
          <div className="flex items-end justify-between gap-1.5 pt-4 pb-1 h-36 px-1">
            {cropData.history.map((pt, idx) => {
              const isSelected = idx === selectedDayIndex;
              const range = Math.max(maxHistoryPrice - minHistoryPrice, 50);
              const heightPercent = Math.max(
                20,
                Math.round(((pt.modalPrice - minHistoryPrice + 20) / (range + 40)) * 100)
              );

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDayIndex(idx)}
                  className="flex-1 flex flex-col items-center gap-1 h-full justify-end group cursor-pointer"
                >
                  <span className={`text-[10px] font-bold transition-all ${
                    isSelected ? 'text-emerald-900 font-black scale-110' : 'text-slate-500 opacity-80'
                  }`}>
                    ₹{pt.modalPrice}
                  </span>

                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[28px] rounded-t-lg transition-all ${
                      isSelected
                        ? 'bg-emerald-700 shadow-md ring-2 ring-emerald-400'
                        : 'bg-emerald-300 hover:bg-emerald-400'
                    }`}
                  />

                  <span className={`text-[10px] font-bold mt-1 ${
                    isSelected ? 'text-slate-900 font-extrabold' : 'text-slate-500'
                  }`}>
                    {language === 'hi' ? pt.dayLabelHi : pt.dayLabelEn}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Day Details Pill */}
          {selectedPoint && (
            <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs font-bold">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {selectedPoint.date} ({language === 'hi' ? selectedPoint.dayLabelHi : selectedPoint.dayLabelEn})
                </span>
                <span className="text-base font-black text-slate-900">
                  ₹ {selectedPoint.modalPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-right text-[11px] text-slate-600 space-y-0.5">
                <div>
                  <span className="text-slate-400 font-medium">{t('sabseAdhikDaam')}: </span>
                  <span className="font-bold text-slate-800">₹{selectedPoint.maxPrice}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">{t('marketVolume')}: </span>
                  <span className="font-bold text-emerald-800">{selectedPoint.volumeQtl} {t('quintal')}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Active Mandis in District */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <Store className="w-4 h-4 text-emerald-700" />
            <span>{t('activeMandis')} ({district})</span>
          </div>

          <div className="space-y-1.5">
            {cropData.mandis.map((mandi, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs font-bold shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-slate-900 font-extrabold">{mandi}</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {language === 'hi' ? 'खुली है (Active)' : 'Open'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
        >
          {t('closeBtn')}
        </button>
      </div>
    </div>
  );
}

