'use client';

import React, { useState } from 'react';
import { BarChart3, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { CROPS_DATA } from '@/lib/data/kisanData';

interface CropProductionChartProps {
  selectedCropId?: string;
  onSelectCrop?: (cropId: string) => void;
}

export default function CropProductionChart({
  selectedCropId = 'paddy',
  onSelectCrop,
}: CropProductionChartProps) {
  const { t, language } = useLanguage();
  const [internalCrop, setInternalCrop] = useState(selectedCropId);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentCropId = onSelectCrop ? selectedCropId : internalCrop;
  const crop = CROPS_DATA[currentCropId] || CROPS_DATA.paddy;

  const handleCropChange = (id: string) => {
    if (onSelectCrop) {
      onSelectCrop(id);
    } else {
      setInternalCrop(id);
    }
  };

  const data = crop.productionHistory;
  const maxY = 120;
  const yTicks = [0, 30, 60, 90, 120];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-tight">
              {t('cropProductionBihar')}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 font-normal">
              {t('productionTrend')}
            </p>
          </div>
        </div>

        {/* Crop dropdown */}
        <div className="relative self-start sm:self-auto">
          <select
            value={currentCropId}
            onChange={(e) => handleCropChange(e.target.value)}
            aria-label={t('colCrop')}
            className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-medium text-slate-700 hover:border-emerald-500 focus:outline-none cursor-pointer shadow-2xs"
          >
            <option value="paddy">{language === 'hi' ? 'धान (Paddy)' : 'Paddy (Dhan)'}</option>
            <option value="wheat">{language === 'hi' ? 'गेहूं (Wheat)' : 'Wheat'}</option>
            <option value="maize">{language === 'hi' ? 'मक्का (Maize)' : 'Maize'}</option>
            <option value="lentil">{language === 'hi' ? 'मसूर (Lentil)' : 'Lentil (Masoor)'}</option>
            <option value="gram">{language === 'hi' ? 'चना (Gram)' : 'Gram (Chana)'}</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* SVG Bar Chart */}
      <div className="relative w-full h-[180px] flex items-end">
        {/* Y Axis ticks */}
        <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col-reverse justify-between text-[10px] text-slate-400 font-sans pr-2 text-right">
          {yTicks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>

        {/* Gridlines & Bars container */}
        <div className="ml-8 flex-1 h-full flex flex-col justify-between relative">
          {/* Horizontal lines */}
          <div className="absolute inset-0 bottom-6 flex flex-col-reverse justify-between pointer-events-none">
            {yTicks.map((tick) => (
              <div key={tick} className="border-b border-slate-100 w-full" />
            ))}
          </div>

          {/* Bars */}
          <div className="h-[calc(100%-24px)] w-full flex items-end justify-around px-2 z-10">
            {data.map((item, idx) => {
              const heightPercent = Math.min(100, Math.max(5, (item.value / maxY) * 100));
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={item.year}
                  className="flex flex-col items-center group relative cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div className="absolute -top-7 bg-slate-900 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm whitespace-nowrap z-20 animate-in fade-in">
                      {item.value} {language === 'hi' ? 'लाख टन' : 'L Tonnes'}
                    </div>
                  )}

                  {/* The bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-6 sm:w-8 rounded-t-md transition-all duration-300 ${
                      isHovered ? 'bg-emerald-600' : 'bg-emerald-700/85 group-hover:bg-emerald-600'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* X Axis Labels */}
          <div className="h-6 w-full flex items-center justify-around px-2 text-[11px] font-medium text-slate-400 border-t border-slate-200/80">
            {data.map((item) => (
              <span key={item.year} className="w-6 sm:w-8 text-center">
                {item.year}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

