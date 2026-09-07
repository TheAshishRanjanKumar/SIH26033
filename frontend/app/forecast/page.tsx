'use client';
import { useAppStore } from '@/lib/mock-data/store';
import { useTranslation } from '@/lib/i18n';
import { BarChart3, Info, TrendingUp, Lightbulb, Layers, ArrowUp, ArrowDown, Minus, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { getCropImage, marketPrices } from '@/lib/crop-utils';
import Image from 'next/image';

const forecastData: Record<string, number[]> = {
  Tomato:  [42, 48, 45, 52, 68, 75, 82],
  Onion:   [55, 60, 58, 50, 45, 40, 38],
  Potato:  [30, 35, 38, 42, 55, 60, 65],
};

const demandLevel: Record<string, { level: string; badge: string; change: string }> = {
  Tomato:  { level: 'High', badge: 'badge-green', change: '+15%' },
  Onion:   { level: 'Declining', badge: 'badge-red', change: '-12%' },
  Potato:  { level: 'Rising', badge: 'badge-amber', change: '+8%' },
};

export default function ForecastPage() {
  const { currentUser } = useAppStore();
  const { lang, t } = useTranslation();
  const [crop, setCrop] = useState('Tomato');
  const [region, setRegion] = useState('Maharashtra');

  if (!currentUser) return null;

  const data = forecastData[crop] || forecastData.Tomato;
  const maxVal = Math.max(...data);
  const demand = demandLevel[crop] || demandLevel.Tomato;
  const marketInfo = marketPrices[crop] || marketPrices.Tomato;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24 md:pb-8">
      {/* Title */}
      <div>
        <h1 className="page-title text-xl sm:text-2xl">{t.forecastTitle}</h1>
        <p className="text-xs sm:text-sm text-muted mt-1 font-medium">
          {t.forecastSubtitle}
        </p>
      </div>

      {/* ── 1. FARMER DECISION SUMMARY CARD (FARMER-FIRST FORECAST) ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-4 sm:px-6 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {t.decisionSummaryTitle}
          </div>
          <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
            {t.sevenDayOutlook}
          </span>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Crop Image */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0 relative shadow-xs">
                <Image
                  src={getCropImage(crop)}
                  alt={crop}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">{crop}</h2>
                  <span className="badge-slate text-xs font-semibold">{region}</span>
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
                    ₹{marketInfo.current}
                  </span>
                  <span className="text-xs text-muted font-medium">{t.currentMarketPrice} {t.perKg}</span>
                </div>
              </div>
            </div>

            {/* Price Prediction Box */}
            <div className="bg-green-50/80 rounded-xl p-3 sm:p-4 border border-green-200 shrink-0">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-green-900">
                {marketInfo.direction === 'up' ? (
                  <ArrowUp className="w-4 h-4 text-green-600" />
                ) : marketInfo.direction === 'down' ? (
                  <ArrowDown className="w-4 h-4 text-red-600" />
                ) : (
                  <Minus className="w-4 h-4 text-amber-600" />
                )}
                {marketInfo.direction === 'up' ? t.priceMayRise : marketInfo.direction === 'down' ? t.priceMayDrop : t.priceIsSteady}
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-green-900 mt-1">
                {t.expectedIn}: ₹{marketInfo.expected[0]}–{marketInfo.expected[1]} {t.perKg}
              </div>
              <div className="text-xs text-green-700 font-medium mt-0.5">
                Window: Next {marketInfo.window}
              </div>
            </div>
          </div>

          {/* Simple AI Recommendation Box */}
          <div className="mt-4 bg-primary-light/60 rounded-xl p-3.5 border border-primary/20 flex items-start gap-2.5">
            <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-primary uppercase tracking-wide">
                {t.marketAdvice}
              </div>
              <p className="text-sm font-medium text-slate-800 mt-0.5 leading-relaxed">
                {lang === 'hi' ? marketInfo.adviceHi : marketInfo.advice}. {t.modelEstimate}.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. CONTROLS / SELECTORS ── */}
      <div className="section-card rounded-2xl flex flex-col sm:flex-row gap-4 shadow-2xs">
        <div className="flex-1">
          <label className="label-text font-bold">{t.selectCrop}</label>
          <select value={crop} onChange={e => setCrop(e.target.value)} className="select-field w-full rounded-xl">
            <option>Tomato</option>
            <option>Onion</option>
            <option>Potato</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="label-text font-bold">{t.selectRegion}</label>
          <select value={region} onChange={e => setRegion(e.target.value)} className="select-field w-full rounded-xl">
            <option>Maharashtra</option>
            <option>Karnataka</option>
            <option>Delhi NCR</option>
          </select>
        </div>
        <div className="flex items-end">
          <span className="badge-slate text-xs flex items-center gap-1 h-fit py-2 px-3 rounded-xl font-semibold">
            <Info className="w-3.5 h-3.5" /> Mandi Model v2.4
          </span>
        </div>
      </div>

      {/* ── 3. HISTORICAL VS FORECAST CHART (P0 VERIFIED REQUIREMENT) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* The Verified Real Chart */}
        <div className="lg:col-span-2 section-card rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title flex items-center gap-2 font-bold text-base">
              <BarChart3 className="w-4 h-4 text-primary" /> {t.historicalVsForecast}
            </h2>
            <div className="flex items-center gap-4 text-xs text-muted font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-slate-300 inline-block" /> {t.historicalLegend}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-accent inline-block" /> {t.forecastLegend}
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="text-[10px] text-muted absolute -top-1 right-0">* {t.modelEstimate}</div>
            <div className="flex items-end justify-between gap-2 h-56 pt-6">
              {data.map((val, i) => {
                const isForecast = i >= 4;
                const height = (val / maxVal) * 100;
                const labels = ['W-3', 'W-2', 'W-1', 'Now', 'F+1', 'F+2', 'F+3'];
                return (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1.5 h-full">
                    <div className="text-[10px] font-bold text-muted">{val}%</div>
                    <div className="w-full max-w-10 relative" style={{ height: `${height}%` }}>
                      <div className={`absolute inset-0 rounded-t ${isForecast ? 'bg-accent shadow-xs' : 'bg-slate-300'} transition-all`} />
                    </div>
                    <div className={`text-[11px] font-bold ${isForecast ? 'text-accent' : 'text-muted'}`}>
                      {labels[i]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-muted font-semibold">
            <span>{t.pastThreeWeeks}</span>
            <span className="text-accent">{t.nextThreeWeeks}</span>
          </div>
        </div>

        {/* Sidebar Factors */}
        <div className="space-y-6">
          {/* Demand overview */}
          <div className="section-card rounded-2xl shadow-xs">
            <h2 className="section-title flex items-center gap-2 mb-4 font-bold text-base">
              <TrendingUp className="w-4 h-4 text-primary" /> {t.marketFactors}
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted font-medium">{t.supplyStatus}</span>
                <span className={demand.badge}>{demand.level}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted font-medium">{t.projectedShift}</span>
                <span className="text-sm font-bold text-foreground">{demand.change}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted font-medium">{t.modelConfidence}</span>
                <span className="text-sm font-bold text-foreground">87%</span>
              </div>
            </div>
          </div>

          {/* Prediction factors */}
          <div className="section-card rounded-2xl shadow-xs">
            <h2 className="section-title flex items-center gap-2 mb-4 font-bold text-base">
              <Layers className="w-4 h-4 text-muted" /> {t.keyDrivers}
            </h2>
            <div className="space-y-2.5">
              {[
                { label: t.apmcArrivals, value: 'High', color: 'bg-success' },
                { label: t.wholesaleSpread, value: 'Narrowing', color: 'bg-accent' },
                { label: t.seasonalPeak, value: 'Active', color: 'bg-info' },
                { label: t.interstateMovement, value: 'Moderate', color: 'bg-primary' },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted font-medium">
                    <span className={`w-2 h-2 rounded-full ${f.color}`} />
                    {f.label}
                  </span>
                  <span className="font-bold text-foreground">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
