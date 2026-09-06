'use client';

import React, { useState } from 'react';
import {
  X,
  IndianRupee,
  CloudSun,
  Sprout,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Store,
  BarChart2,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  POPULAR_CROPS,
  ADVISORY_LIST,
  PopularCrop,
  getDistrictCropData,
  getDistrictWeatherData,
  getDistrictProductionData,
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
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(6);

  if (!type) return null;

  const currentCrop = crop || POPULAR_CROPS[0];
  const cropData = getDistrictCropData(district, currentCrop.id);
  const weatherData = getDistrictWeatherData(district);
  const productionData = getDistrictProductionData(district);
  const selectedPoint = cropData.history[selectedDayIdx] || cropData.history[cropData.history.length - 1];

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
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{cropData.crop.image}</span>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900">
                    {language === 'hi' ? cropData.crop.nameHi : cropData.crop.nameEn}
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">
                    {cropData.crop.variety}
                  </span>
                </div>
              </div>

              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                cropData.isAboveMsp ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {cropData.isAboveMsp ? t('aboveMsp') : t('belowMsp')} (MSP: ₹{cropData.msp})
              </span>
            </div>

            {!showFullHistory ? (
              <>
                {/* 3 Tier Price Box */}
                <div className="space-y-2 text-xs font-bold divide-y divide-slate-100 bg-white border border-slate-200 p-4 rounded-2xl">
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-600">{t('sabseAdhikDaam')}</span>
                    <span className="text-base font-black text-slate-900">
                      ₹ {cropData.crop.maxPrice.toLocaleString('en-IN')} / {t('quintal')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-slate-600">{t('sabseKamDaam')}</span>
                    <span className="text-base font-black text-slate-900">
                      ₹ {cropData.crop.minPrice.toLocaleString('en-IN')} / {t('quintal')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 text-emerald-800 bg-emerald-50/70 -mx-4 px-4 py-2 rounded-lg">
                    <span className="font-bold">{t('aamDaam')}</span>
                    <span className="text-lg font-black text-emerald-900">
                      ₹ {cropData.crop.modalPrice.toLocaleString('en-IN')} / {t('quintal')}
                    </span>
                  </div>
                </div>

                {/* Selling Advisory Callout */}
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-700" />
                    <span>{t('sellAdvice')}: {language === 'hi' ? cropData.recommendation.badgeHi : cropData.recommendation.badgeEn}</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 font-medium">
                    {language === 'hi' ? cropData.recommendation.reasonHi : cropData.recommendation.reasonEn}
                  </p>
                </div>

                <button
                  onClick={() => setShowFullHistory(true)}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  {t('puraItihaasDekhen')}
                </button>
              </>
            ) : (
              <div className="space-y-3">
                {/* 7-Day History Chart */}
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <BarChart2 className="w-4 h-4 text-emerald-700" />
                      {t('weeklyTrend')}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">₹ / {t('quintal')}</span>
                  </div>

                  <div className="flex items-end justify-between gap-1.5 h-32 pt-3 pb-1">
                    {cropData.history.map((pt, idx) => {
                      const isSel = idx === selectedDayIdx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedDayIdx(idx)}
                          className="flex-1 flex flex-col items-center gap-1 h-full justify-end cursor-pointer"
                        >
                          <span className={`text-[9px] font-bold ${isSel ? 'text-emerald-800 font-black' : 'text-slate-400'}`}>
                            ₹{pt.modalPrice}
                          </span>
                          <div
                            style={{ height: `${Math.max(25, Math.round((pt.modalPrice / (cropData.crop.maxPrice || 2500)) * 100))}%` }}
                            className={`w-full max-w-[24px] rounded-t transition-all ${
                              isSel ? 'bg-emerald-700 ring-2 ring-emerald-400' : 'bg-emerald-300 hover:bg-emerald-400'
                            }`}
                          />
                          <span className={`text-[9px] font-bold ${isSel ? 'text-slate-900' : 'text-slate-400'}`}>
                            {language === 'hi' ? pt.dayLabelHi : pt.dayLabelEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex items-center justify-between text-xs font-bold">
                    <span>{selectedPoint.date} ({language === 'hi' ? selectedPoint.dayLabelHi : selectedPoint.dayLabelEn}):</span>
                    <span className="text-emerald-900 text-sm">₹{selectedPoint.modalPrice} / {t('quintal')}</span>
                    <span className="text-slate-500 font-medium text-[11px]">{t('marketVolume')}: {selectedPoint.volumeQtl} {t('quintal')}</span>
                  </div>
                </div>

                {/* Mandis List */}
                <div className="space-y-1.5 max-h-28 overflow-y-auto">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <Store className="w-3.5 h-3.5 text-emerald-700" />
                    {t('activeMandis')}:
                  </span>
                  {cropData.mandis.map((mandi, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between">
                      <span>{mandi}</span>
                      <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">खुली है (Active)</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowFullHistory(false)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  ← {language === 'hi' ? 'संक्षिप्त विवरण पर वापस जाएं' : 'Back to Summary'}
                </button>
              </div>
            )}
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
                <span className="text-4xl">
                  {weatherData.icon === 'sun' ? '☀️' : weatherData.icon === 'rain' ? '🌧️' : '⛅'}
                </span>
                <div>
                  <div className="text-3xl font-black text-slate-900">{weatherData.temp}°C</div>
                  <div className="text-xs font-bold text-slate-600">
                    {language === 'hi' ? weatherData.conditionHi : weatherData.conditionEn}
                  </div>
                </div>
              </div>
              <div className="text-right text-xs font-bold text-slate-600 space-y-1">
                <div>💧 {t('aajKiBarish')}: {weatherData.rainMm} mm</div>
                <div>💨 {t('nami')}: {weatherData.humidity}%</div>
                <div>🌪️ {t('hawaKiRaftaar')}: {weatherData.windSpeed} km/h</div>
              </div>
            </div>

            {/* 5-day list */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-900">{t('aaneWale5Din')}</h4>
              <div className="space-y-1.5 divide-y divide-slate-100 border border-slate-200 rounded-2xl p-3">
                {weatherData.forecast.map((f, i) => (
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

            {/* District Specialty Banner */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
              <span className="font-extrabold text-emerald-900 block">
                🌾 {district} {language === 'hi' ? 'विशेषता' : 'Specialty'}:
              </span>
              <p className="text-[11px] font-medium text-emerald-800">
                {language === 'hi' ? productionData.keySpecialtyHi : productionData.keySpecialtyEn}
              </p>
            </div>

            {/* Area & Production Stats */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                <span className="text-[10px] text-slate-500 font-semibold uppercase block">
                  {language === 'hi' ? 'कुल कृषि क्षेत्र' : 'Total Cropped Area'}
                </span>
                <span className="text-base font-black text-slate-900 mt-0.5 block">
                  {productionData.totalCroppedAreaHa.toLocaleString('en-IN')} Ha
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                <span className="text-[10px] text-slate-500 font-semibold uppercase block">
                  {language === 'hi' ? 'वार्षिक पैदावार' : 'Annual Yield'}
                </span>
                <span className="text-base font-black text-emerald-800 mt-0.5 block">
                  {productionData.annualProductionTonnes.toLocaleString('en-IN')} T
                </span>
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

