'use client';

import React, { useState } from 'react';
import {
  Sprout,
  Store,
  MapPin,
  Database,
  ArrowRight,
  Sun,
  CloudSun,
  Lightbulb,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { CROPS_DATA, MARKET_ALERTS } from '@/lib/data/kisanData';
import PriceForecastChart from './PriceForecastChart';
import BiharRainfallMap from './BiharRainfallMap';
import CropProductionChart from './CropProductionChart';

interface DesktopDashboardProps {
  onNavigateToCrop?: (cropId: string) => void;
}

export default function DesktopDashboard({ onNavigateToCrop }: DesktopDashboardProps) {
  const { t, language } = useLanguage();
  const [selectedCropId, setSelectedCropId] = useState<string>('paddy');

  const handleCropSelect = (cropId: string) => {
    setSelectedCropId(cropId);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* ROW 1: Hero Banner + Today's Weather Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Hero Banner (8 cols) */}
        <div className="lg:col-span-8 bg-gradient-to-br from-emerald-50/90 via-emerald-100/40 to-amber-50/60 border border-emerald-200/80 rounded-2xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between shadow-2xs">
          {/* Decorative agricultural background glow */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            {/* Left Copy & CTAs */}
            <div className="md:col-span-7 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {t('heroTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {t('heroSubtitle')}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleCropSelect('paddy')}
                  className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-sm cursor-pointer"
                >
                  <span>{t('checkPriceForecast')}</span>
                </button>
                <button
                  onClick={() => handleCropSelect('wheat')}
                  className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/90 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-2xs cursor-pointer"
                >
                  <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t('exploreCrops')}</span>
                </button>
              </div>
            </div>

            {/* Right Graphic & Hindi Quote Badge */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative">
              {/* Floating Quote Badge matching mockup */}
              <div className="absolute -top-2 right-0 sm:right-2 bg-white/95 backdrop-blur-xs border border-emerald-200 px-3 py-1.5 rounded-full shadow-sm text-xs font-semibold text-emerald-900 flex items-center gap-1.5 z-10 animate-bounce-subtle">
                <span className="text-emerald-600">🌱</span>
                <span>{t('brandQuote')}</span>
              </div>

              {/* Farmer in field visual representation matching mockup */}
              <div className="w-44 h-36 sm:w-48 sm:h-40 rounded-2xl overflow-hidden relative shadow-md border-2 border-white bg-gradient-to-t from-emerald-900/60 to-transparent">
                {/* Visual SVG illustration depicting Indian farmer looking over lush golden-green harvest field */}
                <svg viewBox="0 0 200 160" className="w-full h-full object-cover">
                  {/* Sky */}
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#bae6fd" />
                      <stop offset="60%" stopColor="#fef08a" />
                      <stop offset="100%" stopColor="#86efac" />
                    </linearGradient>
                    <linearGradient id="fieldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#65a30d" />
                      <stop offset="100%" stopColor="#14532d" />
                    </linearGradient>
                  </defs>
                  <rect width="200" height="100" fill="url(#skyGrad)" />
                  <circle cx="150" cy="40" r="18" fill="#fef08a" opacity="0.8" />
                  {/* Distant trees */}
                  <path d="M 0 95 Q 40 85, 80 95 T 160 90 T 200 95 L 200 160 L 0 160 Z" fill="#15803d" opacity="0.6" />
                  {/* Green Field */}
                  <rect y="95" width="200" height="65" fill="url(#fieldGrad)" />
                  {/* Wheat stalks in field */}
                  <path d="M 10 160 L 15 110 M 30 160 L 35 115 M 50 160 L 45 105 M 80 160 L 85 112 M 120 160 L 115 108 M 160 160 L 165 110 M 185 160 L 180 115" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Farmer Silhouette with Pagri / Turban looking towards the fields */}
                  <g transform="translate(70, 45)">
                    {/* Turban */}
                    <path d="M 30 20 C 20 10, 40 5, 50 15 C 55 12, 60 18, 55 24 C 50 28, 30 28, 30 20 Z" fill="#eab308" />
                    {/* Head */}
                    <circle cx="42" cy="28" r="10" fill="#78350f" />
                    {/* Shoulders / Kurta */}
                    <path d="M 25 45 C 25 35, 60 35, 60 45 L 65 75 L 20 75 Z" fill="#f8fafc" />
                    {/* Farmer's stick / lathi */}
                    <line x1="18" y1="20" x2="22" y2="75" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Weather Card (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-800">
                  {t('todaysWeather')}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {t('locationPatna')}
              </span>
            </div>

            {/* Main Temperature & Visual */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shadow-2xs">
                  <CloudSun className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    32°C
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {t('partlyCloudy')}
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Metrics: Humidity, Wind, Rainfall */}
            <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-100 text-center">
              <div>
                <div className="text-[11px] text-slate-400 font-normal">
                  {t('humidity')}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
                  68%
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-normal">
                  {t('wind')}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
                  12 km/h
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-normal">
                  {t('rainfallToday')}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
                  0 mm
                </div>
              </div>
            </div>
          </div>

          {/* Footer Link */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors">
              <span>{t('viewDetailedForecast')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ROW 2: 4 Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Crops Tracked */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex items-center gap-3.5 hover:border-emerald-200 transition-colors">
          <div className="w-11 h-11 rounded-xl bg-emerald-100/90 text-emerald-800 flex items-center justify-center shrink-0">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">
              {t('totalCropsTracked')}
            </div>
            <div className="text-xl font-bold text-slate-900 leading-tight">
              120+
            </div>
            <div className="text-[10px] text-slate-400 font-normal">
              {t('majorLocalVarieties')}
            </div>
          </div>
        </div>

        {/* Card 2: Markets in Bihar */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex items-center gap-3.5 hover:border-blue-200 transition-colors">
          <div className="w-11 h-11 rounded-xl bg-blue-100/90 text-blue-700 flex items-center justify-center shrink-0">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">
              {t('marketsInBihar')}
            </div>
            <div className="text-xl font-bold text-slate-900 leading-tight">
              150+
            </div>
            <div className="text-[10px] text-slate-400 font-normal">
              {t('mandiDataAgmarknet')}
            </div>
          </div>
        </div>

        {/* Card 3: Districts Covered */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex items-center gap-3.5 hover:border-amber-200 transition-colors">
          <div className="w-11 h-11 rounded-xl bg-amber-100/90 text-amber-700 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">
              {t('districtsCovered')}
            </div>
            <div className="text-xl font-bold text-slate-900 leading-tight">
              38
            </div>
            <div className="text-[10px] text-slate-400 font-normal">
              {t('completeCoverage')}
            </div>
          </div>
        </div>

        {/* Card 4: Historical Records */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex items-center gap-3.5 hover:border-purple-200 transition-colors">
          <div className="w-11 h-11 rounded-xl bg-purple-100/90 text-purple-700 flex items-center justify-center shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">
              {t('historicalRecords')}
            </div>
            <div className="text-xl font-bold text-slate-900 leading-tight">
              5+ Years
            </div>
            <div className="text-[10px] text-slate-400 font-normal">
              {t('pricesProductionRainfall')}
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3: Price Forecast Chart (5 cols) + Bihar Rainfall Map (4 cols) + Advisories & Alerts (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Price Forecast Chart (5 cols) */}
        <div className="lg:col-span-5">
          <PriceForecastChart
            selectedCropId={selectedCropId}
            onSelectCrop={handleCropSelect}
          />
        </div>

        {/* Bihar Rainfall Overview (4 cols) */}
        <div className="lg:col-span-4">
          <BiharRainfallMap />
        </div>

        {/* Stack of Smart Advisory + Market Alerts (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Smart Advisory Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                    {t('smartAdvisory')}
                  </h4>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  {t('newBadge')}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {t('advisoryContent')}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100">
              <button className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors">
                <span>{t('viewAllAdvisories')}</span>
              </button>
            </div>
          </div>

          {/* Market Alerts Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-rose-50 flex items-center justify-center text-rose-600">
                  <Bell className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                  {t('marketAlerts')}
                </h4>
              </div>

              <div className="space-y-2.5">
                {MARKET_ALERTS.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-2.5 text-xs">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0 ${
                        alert.type === 'up'
                          ? 'bg-rose-100 text-rose-600'
                          : 'bg-emerald-100 text-emerald-600'
                      }`}
                    >
                      {alert.type === 'up' ? (
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      ) : (
                        <ArrowDownRight className="w-2.5 h-2.5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-800 leading-tight">
                        {language === 'hi' ? alert.textHi : alert.textEn}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {language === 'hi' ? alert.timeHi : alert.timeEn}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100">
              <button className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors">
                <span>{t('viewAllAlerts')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 4: Top Crops in Bihar Table (7 cols) + Crop Production Chart (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Top Crops Table (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
                <Sprout className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-tight">
                  {t('topCropsInBihar')}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 font-normal">
                  {t('basedOnProduction')}
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-medium">
                    <th className="pb-2.5 pl-1">{t('colCrop')}</th>
                    <th className="pb-2.5">{t('colAvgPrice')}</th>
                    <th className="pb-2.5">{t('colTrend')}</th>
                    <th className="pb-2.5 text-right pr-2">{t('colAction')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {Object.values(CROPS_DATA).map((c) => {
                    const isSelected = selectedCropId === c.id;
                    return (
                      <tr
                        key={c.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          isSelected ? 'bg-emerald-50/50' : ''
                        }`}
                      >
                        <td className="py-2.5 pl-1">
                          <div className="flex items-center gap-2 font-semibold text-slate-900">
                            <span className="w-6 h-6 rounded-full bg-amber-100/80 flex items-center justify-center text-xs">
                              🌾
                            </span>
                            <span>{language === 'hi' ? c.nameHi : c.nameEn}</span>
                          </div>
                        </td>
                        <td className="py-2.5 font-medium text-slate-700">
                          ₹ {c.currentPrice.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5">
                          <span
                            className={`inline-flex items-center gap-0.5 font-semibold text-[11px] ${
                              c.isPositive ? 'text-emerald-700' : 'text-rose-600'
                            }`}
                          >
                            {c.isPositive ? '↑' : '↓'} {c.trend}
                          </span>
                        </td>
                        <td className="py-2.5 text-right pr-2">
                          <button
                            onClick={() => {
                              handleCropSelect(c.id);
                              if (onNavigateToCrop) onNavigateToCrop(c.id);
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                              isSelected
                                ? 'bg-emerald-800 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-900'
                            }`}
                          >
                            {t('btnView')}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Crop Production Chart (5 cols) */}
        <div className="lg:col-span-5">
          <CropProductionChart
            selectedCropId={selectedCropId}
            onSelectCrop={handleCropSelect}
          />
        </div>
      </div>

      {/* ROW 5: Bottom Callout Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-emerald-100/50 to-teal-50 border border-emerald-200/90 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">
              {t('makeSmarterDecisions')}
            </h4>
            <p className="text-xs text-slate-600 font-normal">
              {t('makeSmarterDecisionsSub')}
            </p>
          </div>
        </div>

        <button
          onClick={() => handleCropSelect('paddy')}
          className="bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs shrink-0 cursor-pointer"
        >
          {t('getStarted')}
        </button>
      </div>

      {/* ROW 6: Footer matching mockup */}
      <footer className="pt-6 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <a href="#about" className="hover:text-slate-900 transition-colors">{t('about')}</a>
          <a href="#features" className="hover:text-slate-900 transition-colors">{t('features')}</a>
          <a href="#datasources" className="hover:text-slate-900 transition-colors">{t('dataSources')}</a>
          <a href="#contact" className="hover:text-slate-900 transition-colors">{t('contact')}</a>
          <a href="#privacy" className="hover:text-slate-900 transition-colors">{t('privacy')}</a>
          <a href="#terms" className="hover:text-slate-900 transition-colors">{t('terms')}</a>
        </div>
        <div className="font-medium text-emerald-800">
          {t('footerTagline')}
        </div>
      </footer>
    </div>
  );
}

