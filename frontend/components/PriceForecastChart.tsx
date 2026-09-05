'use client';

import React, { useState } from 'react';
import { TrendingUp, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { CROPS_DATA } from '@/lib/data/kisanData';

interface PriceForecastChartProps {
  selectedCropId?: string;
  onSelectCrop?: (cropId: string) => void;
  compact?: boolean;
}

export default function PriceForecastChart({
  selectedCropId = 'paddy',
  onSelectCrop,
  compact = false,
}: PriceForecastChartProps) {
  const { t, language } = useLanguage();
  const [activeTimeframe, setActiveTimeframe] = useState<'1M' | '3M' | '6M' | '1Y'>('6M');
  const [internalCrop, setInternalCrop] = useState(selectedCropId);

  const currentCropId = onSelectCrop ? selectedCropId : internalCrop;
  const crop = CROPS_DATA[currentCropId] || CROPS_DATA.paddy;

  const handleCropChange = (id: string) => {
    if (onSelectCrop) {
      onSelectCrop(id);
    } else {
      setInternalCrop(id);
    }
  };

  // Coordinates for the chart SVG
  // SVG viewBox: 0 0 600 240
  // X range: 50 to 560
  // Y range: 20 to 190 (Y min: 1000 => 190, Y max: 3000 => 20)
  const minPrice = 1000;
  const maxPrice = 3000;
  const svgWidth = compact ? 460 : 580;
  const svgHeight = 220;
  const paddingLeft = 45;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 35;

  const plotWidth = svgWidth - paddingLeft - paddingRight;
  const plotHeight = svgHeight - paddingTop - paddingBottom;

  const points = crop.forecast6M;
  const xStep = plotWidth / (points.length - 1);

  const getY = (val: number) => {
    const clamped = Math.max(minPrice, Math.min(maxPrice, val));
    const ratio = (clamped - minPrice) / (maxPrice - minPrice);
    return paddingTop + plotHeight - ratio * plotHeight;
  };

  // Historical path: points 0, 1, 2, 3
  const histPoints = points.slice(0, 4).map((pt, idx) => ({
    x: paddingLeft + idx * xStep,
    y: getY(pt.historical || 1500),
  }));

  // Forecast path: points 3, 4, 5
  const forePoints = points.slice(3).map((pt, idx) => ({
    x: paddingLeft + (3 + idx) * xStep,
    y: getY(pt.forecasted || 2180),
  }));

  const makeCurvePath = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return '';
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cpX = (p0.x + p1.x) / 2;
      path += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return path;
  };

  const histPath = makeCurvePath(histPoints);
  const forePath = makeCurvePath(forePoints);

  // Tooltip point on the last coordinate (Jun)
  const lastPoint = forePoints[forePoints.length - 1];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-tight">
              {t('priceForecast')}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 font-normal">
              {t('predictedMarketPrices')}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Crop Selector */}
          <div className="relative">
            <select
              value={currentCropId}
              onChange={(e) => handleCropChange(e.target.value)}
              aria-label={t('colCrop')}
              className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-medium text-slate-700 hover:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-2xs"
            >
              <option value="paddy">{language === 'hi' ? 'धान (Paddy)' : 'Paddy (Dhan)'}</option>
              <option value="wheat">{language === 'hi' ? 'गेहूं (Wheat)' : 'Wheat'}</option>
              <option value="maize">{language === 'hi' ? 'मक्का (Maize)' : 'Maize'}</option>
              <option value="lentil">{language === 'hi' ? 'मसूर (Lentil)' : 'Lentil (Masoor)'}</option>
              <option value="gram">{language === 'hi' ? 'चना (Gram)' : 'Gram (Chana)'}</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[11px] font-medium text-slate-600">
            {(['1M', '3M', '6M', '1Y'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setActiveTimeframe(period)}
                className={`px-2 py-1 rounded-md transition-all ${
                  activeTimeframe === period
                    ? 'bg-emerald-800 text-white font-semibold shadow-xs'
                    : 'hover:text-slate-900 text-slate-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative w-full overflow-hidden">
        {/* Y-axis label */}
        <div className="absolute top-1 left-0 text-[10px] text-slate-400 font-medium rotate-[-90deg] origin-top-left translate-y-24 translate-x-2 hidden sm:block">
          {t('pricePerQuintal')}
        </div>

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto max-h-[220px] select-none"
        >
          <defs>
            <linearGradient id="forecastAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines & Y-Axis Labels */}
          {[3000, 2500, 2000, 1500, 1000].map((level) => {
            const y = getY(level);
            return (
              <g key={level}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={svgWidth - paddingRight}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1.2"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  className="fill-slate-400 text-[10px] font-sans"
                >
                  {level.toLocaleString('en-IN')}
                </text>
              </g>
            );
          })}

          {/* Historical Line Curve */}
          <path
            d={histPath}
            fill="none"
            stroke="#16a34a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Forecast Line Curve (Dashed) */}
          <path
            d={forePath}
            fill="none"
            stroke="#16a34a"
            strokeWidth="2.5"
            strokeDasharray="5,4"
            strokeLinecap="round"
          />

          {/* Points on Historical curve */}
          {histPoints.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="3.5"
              fill="#ffffff"
              stroke="#16a34a"
              strokeWidth="2"
            />
          ))}

          {/* Point on Forecast curve */}
          <circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r="4.5"
            fill="#16a34a"
            stroke="#ffffff"
            strokeWidth="2"
          />

          {/* X-Axis Labels */}
          {points.map((pt, idx) => {
            const x = paddingLeft + idx * xStep;
            return (
              <text
                key={pt.month}
                x={x}
                y={svgHeight - 10}
                textAnchor="middle"
                className="fill-slate-400 text-[11px] font-medium"
              >
                {pt.month}
              </text>
            );
          })}
        </svg>

        {/* Floating Tooltip Card on Jun 2025 (matching mockup exactly) */}
        <div
          className="absolute z-10 bg-white/95 backdrop-blur-xs border border-emerald-200/90 rounded-xl p-2 sm:p-2.5 shadow-md text-left"
          style={{
            right: '8%',
            top: '20%',
            maxWidth: '170px',
          }}
        >
          <div className="text-[11px] font-medium text-slate-500">
            {language === 'hi' ? 'जून 2025' : 'Jun 2025'}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xs sm:text-sm font-bold text-slate-900">
              ₹ {crop.predictedPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-[9px] px-1 py-0.2 bg-emerald-100/90 text-emerald-800 font-semibold rounded">
              {t('predictedBadge')}
            </span>
          </div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5 flex items-center gap-0.5">
            <span>↑</span>
            <span>{crop.trend} {t('fromLastMonth')}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-4 h-0.5 bg-emerald-600 rounded-full inline-block" />
          <span>{t('historicalPrice')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-0.5 border-t-2 border-dashed border-emerald-600 inline-block" />
          <span>{t('forecastedPrice')}</span>
        </div>
      </div>
    </div>
  );
}

