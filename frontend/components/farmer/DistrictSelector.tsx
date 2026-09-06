'use client';

import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { BIHAR_DISTRICTS } from '@/lib/data/kisanData';

interface DistrictSelectorProps {
  onSelectDistrict?: (district: string) => void;
}

export default function DistrictSelector({ onSelectDistrict }: DistrictSelectorProps) {
  const { t, language } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Patna');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSelectDistrict) onSelectDistrict(selectedDistrict);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4"
    >
      {/* Title with MapPin icon */}
      <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
        <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
          <MapPin className="w-5 h-5" />
        </div>
        <span className="font-extrabold text-slate-900 text-sm sm:text-base">
          {t('apnaJilaChune')}
        </span>
      </div>

      {/* Selectors */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1 md:max-w-2xl justify-end">
        {/* State Dropdown */}
        <div className="relative w-full sm:w-44">
          <select
            defaultValue="Bihar"
            aria-label={t('stateBihar')}
            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer shadow-2xs"
          >
            <option value="Bihar">{t('stateBihar')}</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
        </div>

        {/* District Dropdown */}
        <div className="relative w-full sm:flex-1">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            aria-label={t('apnaJilaChune')}
            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer shadow-2xs"
          >
            {BIHAR_DISTRICTS.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-xs shrink-0 cursor-pointer"
        >
          {t('viewDetailsBtn')}
        </button>
      </div>
    </form>
  );
}

