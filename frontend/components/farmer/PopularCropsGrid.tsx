'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { POPULAR_CROPS, PopularCrop, getDistrictCropData } from '@/lib/data/kisanData';

interface PopularCropsGridProps {
  district?: string;
  onSelectCrop?: (crop: PopularCrop) => void;
}

export default function PopularCropsGrid({ district = 'Patna', onSelectCrop }: PopularCropsGridProps) {
  const { t, language } = useLanguage();

  // Visual SVG illustrations representing the 5 crops realistically matching the mockup photo cards
  const cropVisuals: Record<string, React.ReactNode> = {
    dhaan: (
      <div className="w-full h-28 bg-gradient-to-br from-amber-200 via-amber-300 to-yellow-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
        {/* Golden Paddy Ears SVG */}
        <svg viewBox="0 0 160 100" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="paddyG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>
          <path d="M 20 100 C 50 70, 70 40, 140 30" stroke="#a16207" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 30 100 C 60 65, 85 45, 130 45" stroke="#a16207" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Grains */}
          {[
            [50, 65], [60, 58], [70, 52], [80, 48], [90, 42], [100, 38], [110, 35], [120, 32], [130, 30],
            [55, 75], [68, 68], [82, 60], [95, 54], [108, 48], [120, 44]
          ].map(([gx, gy], i) => (
            <ellipse key={i} cx={gx} cy={gy} rx="6" ry="3.5" transform={`rotate(${i % 2 === 0 ? -25 : 15} ${gx} ${gy})`} fill="url(#paddyG)" stroke="#854d0e" strokeWidth="0.8" />
          ))}
        </svg>
      </div>
    ),
    gehu: (
      <div className="w-full h-28 bg-gradient-to-br from-amber-100 via-yellow-200 to-amber-400 rounded-2xl flex items-center justify-center relative overflow-hidden">
        {/* Golden Wheat Stalks SVG */}
        <svg viewBox="0 0 160 100" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="wheatG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <line x1="80" y1="10" x2="80" y2="100" stroke="#78350f" strokeWidth="2.5" />
          <line x1="50" y1="20" x2="50" y2="100" stroke="#78350f" strokeWidth="2" />
          <line x1="110" y1="20" x2="110" y2="100" stroke="#78350f" strokeWidth="2" />
          {/* Wheat beards */}
          {[
            [80, 25], [80, 35], [80, 45], [80, 55], [80, 65],
            [50, 35], [50, 45], [50, 55], [50, 65],
            [110, 35], [110, 45], [110, 55], [110, 65],
          ].map(([wx, wy], i) => (
            <g key={i}>
              <ellipse cx={wx - 7} cy={wy} rx="7" ry="4" transform={`rotate(-30 ${wx - 7} ${wy})`} fill="url(#wheatG)" stroke="#78350f" strokeWidth="0.8" />
              <ellipse cx={wx + 7} cy={wy} rx="7" ry="4" transform={`rotate(30 ${wx + 7} ${wy})`} fill="url(#wheatG)" stroke="#78350f" strokeWidth="0.8" />
            </g>
          ))}
        </svg>
      </div>
    ),
    makki: (
      <div className="w-full h-28 bg-gradient-to-br from-emerald-100 via-yellow-100 to-amber-300 rounded-2xl flex items-center justify-center relative overflow-hidden">
        {/* Fresh Yellow Corn Cob with green husks */}
        <svg viewBox="0 0 160 100" className="w-full h-full object-cover">
          {/* Green Husks */}
          <path d="M 30 95 C 40 40, 70 30, 80 15 C 60 40, 50 70, 50 95 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
          <path d="M 130 95 C 120 40, 90 30, 80 15 C 100 40, 110 70, 110 95 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
          {/* Golden Cob */}
          <rect x="68" y="25" width="24" height="65" rx="12" fill="#eab308" stroke="#a16207" strokeWidth="1.5" />
          {/* Kernel grid */}
          {[35, 45, 55, 65, 75].map((ky) => (
            <g key={ky}>
              <circle cx="74" cy={ky} r="2.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
              <circle cx="80" cy={ky} r="2.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
              <circle cx="86" cy={ky} r="2.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
            </g>
          ))}
        </svg>
      </div>
    ),
    dal: (
      <div className="w-full h-28 bg-gradient-to-br from-amber-50 via-orange-100 to-amber-300 rounded-2xl flex items-center justify-center relative overflow-hidden">
        {/* Lentils / Pulses bowl representation */}
        <svg viewBox="0 0 160 100" className="w-full h-full object-cover">
          <ellipse cx="80" cy="55" rx="55" ry="32" fill="#ea580c" />
          {/* Grains */}
          {[
            [60, 45], [75, 42], [90, 44], [105, 48],
            [50, 55], [65, 53], [80, 52], [95, 54], [110, 56],
            [58, 65], [72, 63], [88, 64], [102, 66]
          ].map(([dx, dy], i) => (
            <circle key={i} cx={dx} cy={dy} r="4" fill="#fb923c" stroke="#9a3412" strokeWidth="0.8" />
          ))}
        </svg>
      </div>
    ),
    pyaaz: (
      <div className="w-full h-28 bg-gradient-to-br from-rose-100 via-pink-200 to-purple-300 rounded-2xl flex items-center justify-center relative overflow-hidden">
        {/* Red Onion Cluster SVG */}
        <svg viewBox="0 0 160 100" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="onionGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="60%" stopColor="#be123c" />
              <stop offset="100%" stopColor="#4c0519" />
            </radialGradient>
          </defs>
          {/* Onion 1 */}
          <g transform="translate(60, 30)">
            <ellipse cx="20" cy="30" rx="20" ry="22" fill="url(#onionGrad)" stroke="#4c0519" strokeWidth="1" />
            <path d="M 20 8 L 22 2 M 19 8 L 16 3 M 20 52 L 20 56" stroke="#fb7185" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 12 18 C 8 30, 8 40, 14 48" stroke="#fda4af" strokeWidth="1" fill="none" opacity="0.6" />
          </g>
          {/* Onion 2 */}
          <g transform="translate(90, 38)">
            <ellipse cx="16" cy="24" rx="16" ry="18" fill="url(#onionGrad)" stroke="#4c0519" strokeWidth="1" />
            <path d="M 16 6 L 17 1" stroke="#fb7185" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    ),
  };

  return (
    <section className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {t('lokpriyaFasal')} — <span className="text-emerald-800">{district}</span>
        </h3>
        <span className="text-xs font-semibold text-slate-500">
          (₹ / {t('quintal')})
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {POPULAR_CROPS.map((crop) => {
          const cropData = getDistrictCropData(district, crop.id);
          return (
            <div
              key={crop.id}
              onClick={() => onSelectCrop && onSelectCrop(cropData.crop)}
              className="bg-white border border-slate-200/90 rounded-3xl p-3 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Photo representation */}
                <div className="overflow-hidden rounded-2xl mb-3 shadow-2xs group-hover:scale-102 transition-transform">
                  {cropVisuals[crop.id] || (
                    <div className="w-full h-28 bg-slate-100 flex items-center justify-center text-3xl">
                      🌾
                    </div>
                  )}
                </div>

                {/* Crop Name */}
                <h4 className="text-base font-black text-slate-900 text-center leading-tight">
                  {language === 'hi' ? crop.nameHi : crop.nameEn}
                </h4>

                {/* Price Display */}
                <div className="mt-1 text-center">
                  <span className="text-base font-black text-emerald-900">
                    ₹ {cropData.crop.modalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    {t('aamDaam')}
                  </span>
                </div>
              </div>

              {/* Daam Dekhen Button matching mockup */}
              <div className="mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectCrop) onSelectCrop(cropData.crop);
                  }}
                  className="w-full py-2 px-2 bg-amber-100/90 hover:bg-amber-200 text-amber-950 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span>{t('daamDekhen')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

