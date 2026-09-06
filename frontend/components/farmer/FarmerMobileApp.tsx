'use client';

import React, { useState } from 'react';
import {
  Home,
  IndianRupee,
  CloudSun,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Languages,
  Menu,
  Droplet,
  Wind,
  Sun,
  CloudRain,
  Sprout,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  BIHAR_DISTRICTS,
  POPULAR_CROPS,
  FIVE_DAY_FORECAST,
  ADVISORY_LIST,
  PopularCrop,
  getDistrictCropData,
  getDistrictWeatherData,
} from '@/lib/data/kisanData';
import PriceHistorySheet from '@/components/farmer/PriceHistorySheet';

export default function FarmerMobileApp() {
  const { t, language, toggleLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'home' | 'prices' | 'weather' | 'advisory'>('home');
  const [selectedDistrict, setSelectedDistrict] = useState('Patna');
  const [selectedCrop, setSelectedCrop] = useState<PopularCrop>(POPULAR_CROPS[0]);
  const [selectedCropFilter, setSelectedCropFilter] = useState('dhaan');
  const [expandedAdvisory, setExpandedAdvisory] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showHistorySheet, setShowHistorySheet] = useState(false);

  const currentCropData = getDistrictCropData(selectedDistrict, selectedCrop.id);
  const currentWeather = getDistrictWeatherData(selectedDistrict);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between max-w-md mx-auto relative select-none">
      {/* Slide-out Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-72 h-full bg-white p-5 shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                  🌱
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">KisanSetu</h3>
                  <p className="text-[10px] text-slate-500 font-medium">{t('brandTagline')}</p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button
                  onClick={() => {
                    setActiveTab('home');
                    setDrawerOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm text-slate-800 hover:bg-emerald-50"
                >
                  {t('navHome')}
                </button>
                <button
                  onClick={() => {
                    setActiveTab('prices');
                    setDrawerOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm text-slate-800 hover:bg-emerald-50"
                >
                  {t('cardPricesTitle')}
                </button>
                <button
                  onClick={() => {
                    setActiveTab('weather');
                    setDrawerOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm text-slate-800 hover:bg-emerald-50"
                >
                  {t('cardWeatherTitle')}
                </button>
                <button
                  onClick={() => {
                    setActiveTab('advisory');
                    setDrawerOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm text-slate-800 hover:bg-emerald-50"
                >
                  {t('cardAdvisoryTitle')}
                </button>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 text-center">
              <p className="text-xs font-bold text-emerald-800">{t('footerLove')}</p>
            </div>
          </div>
        </div>
      )}

      {/* ================= SCREEN 1: HOME ================= */}
      {activeTab === 'home' && (
        <div className="flex-1 flex flex-col pb-20">
          {/* Top Bar matching mockup */}
          <header className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-1 text-slate-700"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5 font-black text-base text-slate-900">
              <span className="w-5 h-5 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs">
                🌱
              </span>
              <span>KisanSetu</span>
            </div>

            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white"
            >
              {language === 'hi' ? 'English' : 'हिंदी'}
            </button>
          </header>

          <div className="p-4 space-y-3.5">
            {/* Greeting Card with Farmer Illustration matching mockup */}
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200/90 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
              <div>
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  {t('namaste')}
                </h3>
                <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                  {t('aajKiJaankariDekhen')}
                </p>
              </div>

              {/* Farmer with smartphone visual */}
              <div className="w-16 h-16 rounded-full bg-emerald-200/60 flex items-center justify-center text-3xl shrink-0 shadow-2xs border-2 border-white">
                👨‍🌾
              </div>
            </div>

            {/* 4 Large Touch Cards matching mockup */}
            <div className="space-y-2.5">
              {/* Card 1: Fasal ke Daam */}
              <button
                onClick={() => setActiveTab('prices')}
                className="w-full bg-white border border-slate-200/90 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs hover:border-amber-400 active:scale-98 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-slate-900 text-sm">
                    {t('cardPricesTitle')}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-amber-600" />
              </button>

              {/* Card 2: Mausam */}
              <button
                onClick={() => setActiveTab('weather')}
                className="w-full bg-white border border-slate-200/90 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs hover:border-sky-400 active:scale-98 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-xs">
                    <CloudSun className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-slate-900 text-sm">
                    {t('cardWeatherTitle')}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-sky-600" />
              </button>

              {/* Card 3: Fasal Utpadan */}
              <button
                onClick={() => setActiveTab('prices')}
                className="w-full bg-white border border-slate-200/90 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs hover:border-emerald-400 active:scale-98 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-slate-900 text-sm">
                    {t('cardProductionTitle')}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-emerald-600" />
              </button>

              {/* Card 4: Kheti Salaah */}
              <button
                onClick={() => setActiveTab('advisory')}
                className="w-full bg-white border border-slate-200/90 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs hover:border-purple-400 active:scale-98 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xs">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-slate-900 text-sm">
                    {t('cardAdvisoryTitle')}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-purple-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SCREEN 2: FASAL KE DAAM (PRICES) ================= */}
      {activeTab === 'prices' && (
        <div className="flex-1 flex flex-col pb-20">
          {/* Header */}
          <header className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-2 sticky top-0 z-20">
            <button
              onClick={() => setActiveTab('home')}
              className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h3 className="font-black text-base text-slate-900">
              {t('cardPricesTitle')}
            </h3>
          </header>

          <div className="p-4 space-y-3.5">
            {/* District Dropdowns matching mockup */}
            <div className="space-y-2">
              <div className="relative">
                <select
                  defaultValue="Bihar"
                  aria-label={t('stateBihar')}
                  className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 shadow-2xs cursor-pointer"
                >
                  <option value="Bihar">{t('stateBihar')}</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  aria-label={t('apnaJilaChune')}
                  className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 shadow-2xs cursor-pointer"
                >
                  {BIHAR_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Horizontal Crop Selection Pills matching mockup */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto py-1 hide-scrollbar">
              {POPULAR_CROPS.map((c) => {
                const isSel = selectedCrop.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCrop(c)}
                    className={`flex flex-col items-center gap-1 min-w-[65px] transition-all cursor-pointer ${
                      isSel ? 'scale-105' : 'opacity-70'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-2xs border-2 ${
                        isSel
                          ? 'border-emerald-600 bg-emerald-100/80 shadow-xs'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      {c.image}
                    </div>
                    <span
                      className={`text-[11px] font-bold ${
                        isSel ? 'text-emerald-900' : 'text-slate-600'
                      }`}
                    >
                      {language === 'hi' ? c.nameHi : c.nameEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Aaj ka Mandi Bhav Card matching mockup */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="border-b border-slate-100 pb-2">
                <div className="text-xs font-bold text-slate-500">
                  {t('aajKaMandiBhav')} ({selectedDistrict}, Bihar)
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl">{selectedCrop.image}</span>
                  <div>
                    <h4 className="font-black text-base text-slate-900 leading-tight">
                      {language === 'hi' ? selectedCrop.nameHi : selectedCrop.nameEn}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      ({selectedCrop.variety})
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Price Rows matching mockup */}
              <div className="space-y-2 text-xs font-bold divide-y divide-slate-100">
                <div className="flex items-center justify-between pt-1 text-slate-700">
                  <span>{t('sabseAdhikDaam')}</span>
                  <span className="text-sm font-black text-slate-900">
                    ₹ {currentCropData.crop.maxPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 text-slate-700">
                  <span>{t('sabseKamDaam')}</span>
                  <span className="text-sm font-black text-slate-900">
                    ₹ {currentCropData.crop.minPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 text-emerald-800 bg-emerald-50/70 -mx-4 px-4 py-1.5 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <span>{t('aamDaam')}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      currentCropData.isAboveMsp ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                    }`}>
                      {currentCropData.isAboveMsp ? t('aboveMsp') : t('belowMsp')}
                    </span>
                  </div>
                  <span className="text-base font-black text-emerald-900">
                    ₹ {currentCropData.crop.modalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Button matching mockup */}
              <div className="pt-2">
                <button
                  onClick={() => setShowHistorySheet(true)}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                >
                  {t('puraItihaasDekhen')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SCREEN 3: MAUSAM (WEATHER) ================= */}
      {activeTab === 'weather' && (
        <div className="flex-1 flex flex-col pb-20">
          {/* Header */}
          <header className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-2 sticky top-0 z-20">
            <button
              onClick={() => setActiveTab('home')}
              className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h3 className="font-black text-base text-slate-900">
              {t('cardWeatherTitle')}
            </h3>
          </header>

          <div className="p-4 space-y-3.5">
            {/* District Selector for Weather */}
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                aria-label={t('apnaJilaChune')}
                className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 shadow-2xs cursor-pointer"
              >
                {BIHAR_DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    📍 {d}, {t('stateBihar')}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>

            {/* Weather Hero Card matching mockup */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs text-center space-y-2">
              <div className="w-20 h-20 mx-auto flex items-center justify-center text-5xl">
                {currentWeather.icon === 'sun' ? '☀️' : currentWeather.icon === 'rain' ? '🌧️' : '⛅'}
              </div>

              <div className="text-4xl font-black text-slate-900 tracking-tight">
                {currentWeather.temp}°C
              </div>

              <div className="text-sm font-bold text-slate-600">
                {language === 'hi' ? currentWeather.conditionHi : currentWeather.conditionEn}
              </div>

              {/* 3 Metric Pills matching mockup */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center text-xs">
                <div>
                  <div className="text-slate-400">💧</div>
                  <div className="font-black text-slate-900 mt-0.5">{currentWeather.rainMm} mm</div>
                  <div className="text-[10px] text-slate-400 font-medium">{t('aajKiBarish')}</div>
                </div>

                <div>
                  <div className="text-slate-400">💨</div>
                  <div className="font-black text-slate-900 mt-0.5">{currentWeather.humidity}%</div>
                  <div className="text-[10px] text-slate-400 font-medium">{t('nami')}</div>
                </div>

                <div>
                  <div className="text-slate-400">🌪️</div>
                  <div className="font-black text-slate-900 mt-0.5">{currentWeather.windSpeed} km/h</div>
                  <div className="text-[10px] text-slate-400 font-medium">{t('hawaKiRaftaar')}</div>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast List matching mockup */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2.5">
              <h4 className="text-xs font-black text-slate-900 border-b border-slate-100 pb-2">
                {t('aaneWale5Din')}
              </h4>

              <div className="space-y-2 divide-y divide-slate-100">
                {currentWeather.forecast.map((f, i) => (
                  <div key={i} className="flex items-center justify-between pt-2 first:pt-0 text-xs font-bold text-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-base">
                        {f.icon === 'sun' ? '☀️' : f.icon === 'cloud' ? '⛅' : '🌧️'}
                      </span>
                      <span>{language === 'hi' ? f.dayHi : f.dayEn}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-900">
                      <span>{f.temp}°C</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SCREEN 4: KHETI SALAAH (ADVISORY) ================= */}
      {activeTab === 'advisory' && (
        <div className="flex-1 flex flex-col pb-20">
          {/* Header */}
          <header className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-2 sticky top-0 z-20">
            <button
              onClick={() => setActiveTab('home')}
              className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h3 className="font-black text-base text-slate-900">
              {t('cardAdvisoryTitle')}
            </h3>
          </header>

          <div className="p-4 space-y-3.5">
            {/* Crop Filter Tabs */}
            <div className="flex items-center gap-2">
              {[
                { id: 'dhaan', label: language === 'hi' ? 'धान' : 'Paddy' },
                { id: 'gehu', label: language === 'hi' ? 'गेहूं' : 'Wheat' },
                { id: 'makki', label: language === 'hi' ? 'मक्का' : 'Maize' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCropFilter(tab.id)}
                  className={`flex-1 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    selectedCropFilter === tab.id
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Advisory Action Cards List matching mockup */}
            <div className="space-y-2">
              {ADVISORY_LIST.map((item) => {
                const isExp = expandedAdvisory === item.id;
                return (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs transition-all"
                  >
                    <button
                      onClick={() => setExpandedAdvisory(isExp ? null : item.id)}
                      className="w-full p-3.5 flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                          {t(item.titleKey)}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isExp ? 'rotate-90 text-emerald-700' : ''
                        }`}
                      />
                    </button>

                    {isExp && (
                      <div className="px-4 pb-3.5 pt-1 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed font-medium">
                        {language === 'hi' ? item.detailHi : item.detailEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Tip Card matching mockup */}
            <div className="bg-gradient-to-r from-emerald-100 via-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 shadow-2xs">
              <span className="text-2xl">🌱</span>
              <span className="font-extrabold text-emerald-950 text-xs leading-snug">
                {t('sahiSalaahBanner')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ================= FIXED NATIVE-LIKE BOTTOM NAVIGATION ================= */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex items-center justify-around z-30 shadow-lg max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'home' ? 'text-emerald-800 font-bold' : 'text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">{t('tabHome')}</span>
        </button>

        <button
          onClick={() => setActiveTab('prices')}
          className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'prices' ? 'text-emerald-800 font-bold' : 'text-slate-400'
          }`}
        >
          <IndianRupee className="w-5 h-5" />
          <span className="text-[10px]">{t('tabPrices')}</span>
        </button>

        <button
          onClick={() => setActiveTab('weather')}
          className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'weather' ? 'text-emerald-800 font-bold' : 'text-slate-400'
          }`}
        >
          <CloudSun className="w-5 h-5" />
          <span className="text-[10px]">{t('tabWeather')}</span>
        </button>

        <button
          onClick={() => setActiveTab('advisory')}
          className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'advisory' ? 'text-emerald-800 font-bold' : 'text-slate-400'
          }`}
        >
          <Lightbulb className="w-5 h-5" />
          <span className="text-[10px]">{t('tabAdvisory')}</span>
        </button>
      </nav>

      {/* Price History & Mandi Comparison Sheet */}
      {showHistorySheet && (
        <PriceHistorySheet
          district={selectedDistrict}
          cropId={selectedCrop.id}
          onClose={() => setShowHistorySheet(false)}
        />
      )}
    </div>
  );
}

