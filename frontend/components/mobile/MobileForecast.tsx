'use client';

import React, { useState } from 'react';
import { ChevronLeft, Search, ChevronDown, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { CROPS_DATA } from '@/lib/data/kisanData';

interface MobileForecastProps {
  onBack: () => void;
  onViewAnalysis?: () => void;
}

export default function MobileForecast({ onBack, onViewAnalysis }: MobileForecastProps) {
  const { t, language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<string>('paddy');
  const [timeframe, setTimeframe] = useState<'1M' | '3M' | '6M' | '1Y'>('6M');

  const crop = CROPS_DATA[selectedCrop] || CROPS_DATA.paddy;

  // Simple clean SVG line chart tuned for mobile aspect ratio
  const svgWidth = 320;
  const svgHeight = 160;
  const paddingL = 35;
  const paddingR = 20;
  const paddingT = 20;
  const paddingB = 25;

  const minPrice = 1000;
  const maxPrice = 3000;
  const plotW = svgWidth - paddingL - paddingR;
  const plotH = svgHeight - paddingT - paddingB;

  const getY = (val: number) => {
    const clamped = Math.max(minPrice, Math.min(maxPrice, val));
    return paddingT + plotH - ((clamped - minPrice) / (maxPrice - minPrice)) * plotH;
  };

  const pts = crop.forecast6M;
  const xStep = plotW / (pts.length - 1);

  const histPts = pts.slice(0, 4).map((p, i) => ({
    x: paddingL + i * xStep,
    y: getY(p.historical || 1500),
  }));

  const forePts = pts.slice(3).map((p, i) => ({
    x: paddingL + (3 + i) * xStep,
    y: getY(p.forecasted || 2180),
  }));

  const makePath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return '';
    let p = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX = (p0.x + p1.x) / 2;
      p += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return p;
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto hide-scrollbar pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('priceForecast')}</span>
        </button>
        <button className="p-1 text-slate-500 hover:text-slate-800">
          <Search className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3.5 space-y-3.5">
        {/* Crop Selector Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-base">🌾</span>
            <span className="text-xs font-bold text-slate-900">
              {language === 'hi' ? crop.nameHi : crop.nameEn}
            </span>
          </div>

          <div className="relative">
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              aria-label={t('colCrop')}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-2.5 pr-6 py-1 text-xs font-medium text-slate-700 cursor-pointer"
            >
              <option value="paddy">{language === 'hi' ? 'धान (Paddy)' : 'Paddy (Dhan)'}</option>
              <option value="wheat">{language === 'hi' ? 'गेहूं (Wheat)' : 'Wheat'}</option>
              <option value="maize">{language === 'hi' ? 'मक्का (Maize)' : 'Maize'}</option>
              <option value="lentil">{language === 'hi' ? 'मसूर (Lentil)' : 'Lentil (Masoor)'}</option>
              <option value="gram">{language === 'hi' ? 'चना (Gram)' : 'Gram (Chana)'}</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Timeframe Pills */}
        <div className="flex items-center justify-center gap-2">
          {(['1M', '3M', '6M', '1Y'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                timeframe === period
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Price Forecast Chart */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-xs relative">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
            {/* Gridlines */}
            {[3000, 2500, 2000, 1500, 1000].map((val) => {
              const y = getY(val);
              return (
                <g key={val}>
                  <line
                    x1={paddingL}
                    y1={y}
                    x2={svgWidth - paddingR}
                    y2={y}
                    stroke="#f8fafc"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingL - 6}
                    y={y + 3}
                    textAnchor="end"
                    className="fill-slate-400 text-[9px] font-sans"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Historical curve */}
            <path
              d={makePath(histPts)}
              fill="none"
              stroke="#16a34a"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Forecast curve */}
            <path
              d={makePath(forePts)}
              fill="none"
              stroke="#16a34a"
              strokeWidth="2.2"
              strokeDasharray="4,3"
              strokeLinecap="round"
            />

            {/* X Labels */}
            {pts.map((p, i) => (
              <text
                key={p.month}
                x={paddingL + i * xStep}
                y={svgHeight - 8}
                textAnchor="middle"
                className="fill-slate-400 text-[9px] font-medium"
              >
                {p.month}
              </text>
            ))}

            {/* Jun Point marker */}
            <circle
              cx={forePts[forePts.length - 1].x}
              cy={forePts[forePts.length - 1].y}
              r="4"
              fill="#16a34a"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </svg>

          {/* Floating Tooltip matching mockup */}
          <div className="absolute top-4 right-4 bg-white/95 border border-emerald-200 rounded-lg p-1.5 shadow-sm text-left">
            <div className="text-[9px] text-slate-400 font-medium">
              {language === 'hi' ? 'जून 2025' : 'Jun 2025'}
            </div>
            <div className="text-[11px] font-bold text-slate-900">
              ₹ {crop.predictedPrice.toLocaleString('en-IN')}{' '}
              <span className="text-[8px] text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded font-semibold">
                {t('predictedBadge')}
              </span>
            </div>
            <div className="text-[9px] text-emerald-600 font-medium">
              ↑ {crop.trend} {t('fromLastMonth')}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-emerald-600 inline-block" />
              <span>{t('historicalPrice')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-t border-dashed border-emerald-600 inline-block" />
              <span>{t('forecastedPrice')}</span>
            </div>
          </div>
        </div>

        {/* Market Info (Latest) Card matching mockup */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-xs font-bold text-slate-900 mb-3">
            {t('marketInfoLatest')}
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-sm font-extrabold text-slate-900">
                ₹ {crop.currentPrice.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                {t('currentPrice')}
              </div>
            </div>

            <div>
              <div className="text-sm font-extrabold text-emerald-700">
                ₹ {crop.predictedPrice.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                {t('predictedPrice')}
              </div>
            </div>

            <div>
              <div
                className={`text-sm font-extrabold flex items-center justify-center gap-0.5 ${
                  crop.isPositive ? 'text-emerald-700' : 'text-rose-600'
                }`}
              >
                <span>{crop.isPositive ? '↑' : '↓'}</span>
                <span>{crop.trend}</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                {t('priceChange')}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onViewAnalysis}
          className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-3 rounded-xl text-xs sm:text-sm transition-colors shadow-xs"
        >
          {t('viewDetailedAnalysis')}
        </button>
      </div>
    </div>
  );
}

