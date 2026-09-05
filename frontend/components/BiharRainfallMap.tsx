'use client';

import React, { useState } from 'react';
import { CloudRain, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { BIHAR_DISTRICT_RAINFALL, DistrictRainfall } from '@/lib/data/kisanData';

interface BiharRainfallMapProps {
  compact?: boolean;
}

// Stylized geographical district polygon approximations for Bihar
// Arranged to mimic the exact visual silhouette of Bihar state
const DISTRICT_POLYGONS = [
  // North-West (Champaran, Gopalganj, Siwan)
  { id: 'w_champaran', name: 'West Champaran', nameHi: 'प. चंपारण', rainfall: 135, color: '#1d4ed8', d: 'M 40 30 L 70 20 L 90 45 L 75 80 L 50 75 Z' },
  { id: 'e_champaran', name: 'East Champaran', nameHi: 'पू. चंपारण', rainfall: 125, color: '#2563eb', d: 'M 70 20 L 115 25 L 125 65 L 90 45 Z' },
  { id: 'sheohar', name: 'Sheohar', nameHi: 'शिवहर', rainfall: 89, color: '#60a5fa', d: 'M 115 25 L 132 30 L 130 50 L 120 45 Z' },
  { id: 'sitamarhi', name: 'Sitamarhi', nameHi: 'सीतामढ़ी', rainfall: 94, color: '#3b82f6', d: 'M 132 30 L 165 28 L 160 65 L 125 65 L 130 50 Z' },
  { id: 'gopalganj', name: 'Gopalganj', nameHi: 'गोपालगंज', rainfall: 82, color: '#93c5fd', d: 'M 50 75 L 75 80 L 85 105 L 55 110 Z' },
  { id: 'siwan', name: 'Siwan', nameHi: 'सीवान', rainfall: 78, color: '#bfdbfe', d: 'M 55 110 L 85 105 L 90 135 L 60 140 Z' },
  { id: 'saran', name: 'Saran', nameHi: 'सारण', rainfall: 86, color: '#60a5fa', d: 'M 85 105 L 120 95 L 125 130 L 90 135 Z' },

  // North-Central (Madhubani, Darbhanga, Muzaffarpur, Vaishali, Samastipur)
  { id: 'madhubani', name: 'Madhubani', nameHi: 'मधुबनी', rainfall: 90, color: '#3b82f6', d: 'M 165 28 L 210 25 L 205 65 L 160 65 Z' },
  { id: 'muzaffarpur', name: 'Muzaffarpur', nameHi: 'मुजफ्फरपुर', rainfall: 110, color: '#2563eb', d: 'M 125 65 L 160 65 L 165 105 L 120 95 Z' },
  { id: 'darbhanga', name: 'Darbhanga', nameHi: 'दरभंगा', rainfall: 85, color: '#60a5fa', d: 'M 160 65 L 205 65 L 200 100 L 165 105 Z' },
  { id: 'vaishali', name: 'Vaishali', nameHi: 'वैशाली', rainfall: 108, color: '#2563eb', d: 'M 120 95 L 155 105 L 150 135 L 125 130 Z' },
  { id: 'samastipur', name: 'Samastipur', nameHi: 'समस्तीपुर', rainfall: 95, color: '#3b82f6', d: 'M 165 105 L 200 100 L 210 135 L 150 135 Z' },

  // North-East (Supaul, Araria, Kishanganj, Purnea, Katihar, Saharsa, Madhepura)
  { id: 'supaul', name: 'Supaul', nameHi: 'सुपौल', rainfall: 112, color: '#2563eb', d: 'M 210 25 L 245 28 L 240 70 L 205 65 Z' },
  { id: 'araria', name: 'Araria', nameHi: 'अररिया', rainfall: 128, color: '#1d4ed8', d: 'M 245 28 L 285 30 L 280 75 L 240 70 Z' },
  { id: 'kishanganj', name: 'Kishanganj', nameHi: 'किशनगंज', rainfall: 155, color: '#172554', d: 'M 285 30 L 320 40 L 310 80 L 280 75 Z' },
  { id: 'saharsa', name: 'Saharsa', nameHi: 'सहरसा', rainfall: 105, color: '#2563eb', d: 'M 205 65 L 235 70 L 230 105 L 200 100 Z' },
  { id: 'madhepura', name: 'Madhepura', nameHi: 'मधेपुरा', rainfall: 99, color: '#3b82f6', d: 'M 235 70 L 265 72 L 260 110 L 230 105 Z' },
  { id: 'purnea', name: 'Purnea', nameHi: 'पूर्णिया', rainfall: 140, color: '#1e40af', d: 'M 265 72 L 305 75 L 295 115 L 260 110 Z' },
  { id: 'katihar', name: 'Katihar', nameHi: 'कटिहार', rainfall: 130, color: '#1d4ed8', d: 'M 260 110 L 295 115 L 305 145 L 265 145 Z' },

  // South-Central (Patna, Nalanda, Begusarai, Khagaria, Munger, Lakhisarai, Sheikhpura)
  { id: 'patna', name: 'Patna', nameHi: 'पटना', rainfall: 120, color: '#1d4ed8', d: 'M 115 135 L 165 135 L 175 165 L 120 165 Z' },
  { id: 'begusarai', name: 'Begusarai', nameHi: 'बेगूसराय', rainfall: 92, color: '#3b82f6', d: 'M 175 135 L 225 135 L 220 165 L 175 165 Z' },
  { id: 'khagaria', name: 'Khagaria', nameHi: 'खगड़िया', rainfall: 96, color: '#3b82f6', d: 'M 225 135 L 260 135 L 255 165 L 220 165 Z' },
  { id: 'nalanda', name: 'Nalanda', nameHi: 'नालंदा', rainfall: 102, color: '#2563eb', d: 'M 140 165 L 175 165 L 170 195 L 135 195 Z' },
  { id: 'lakhisarai', name: 'Lakhisarai', nameHi: 'लखीसराय', rainfall: 87, color: '#60a5fa', d: 'M 175 165 L 205 165 L 200 195 L 170 195 Z' },
  { id: 'sheikhpura', name: 'Sheikhpura', nameHi: 'शेखपुरा', rainfall: 82, color: '#93c5fd', d: 'M 155 195 L 180 195 L 175 215 L 150 215 Z' },
  { id: 'munger', name: 'Munger', nameHi: 'मुंगेर', rainfall: 100, color: '#2563eb', d: 'M 205 165 L 240 165 L 235 198 L 200 195 Z' },
  { id: 'bhagalpur', name: 'Bhagalpur', nameHi: 'भागलपुर', rainfall: 115, color: '#2563eb', d: 'M 240 165 L 285 160 L 280 198 L 235 198 Z' },

  // South-West (Bhojpur, Buxar, Kaimur, Rohtas, Aurangabad, Arwal, Jehanabad)
  { id: 'buxar', name: 'Buxar', nameHi: 'बक्सर', rainfall: 79, color: '#bfdbfe', d: 'M 50 145 L 85 140 L 80 170 L 45 175 Z' },
  { id: 'bhojpur', name: 'Bhojpur', nameHi: 'भोजपुर', rainfall: 84, color: '#93c5fd', d: 'M 85 140 L 115 135 L 110 170 L 80 170 Z' },
  { id: 'kaimur', name: 'Kaimur', nameHi: 'कैमूर', rainfall: 81, color: '#93c5fd', d: 'M 35 175 L 75 175 L 65 220 L 30 215 Z' },
  { id: 'rohtas', name: 'Rohtas', nameHi: 'रोहतास', rainfall: 88, color: '#60a5fa', d: 'M 75 175 L 110 170 L 105 220 L 65 220 Z' },
  { id: 'arwal', name: 'Arwal', nameHi: 'अरवल', rainfall: 85, color: '#60a5fa', d: 'M 110 170 L 130 170 L 125 195 L 105 195 Z' },
  { id: 'jehanabad', name: 'Jehanabad', nameHi: 'जहानाबाद', rainfall: 90, color: '#3b82f6', d: 'M 130 170 L 145 170 L 140 195 L 125 195 Z' },
  { id: 'aurangabad', name: 'Aurangabad', nameHi: 'औरंगाबाद', rainfall: 89, color: '#60a5fa', d: 'M 105 195 L 135 195 L 128 230 L 98 230 Z' },

  // South-Eastern (Gaya, Nawada, Jamui, Banka)
  { id: 'gaya', name: 'Gaya', nameHi: 'गया', rainfall: 98, color: '#3b82f6', d: 'M 135 195 L 170 195 L 160 235 L 128 230 Z' },
  { id: 'nawada', name: 'Nawada', nameHi: 'नवादा', rainfall: 93, color: '#3b82f6', d: 'M 170 195 L 205 195 L 198 235 L 160 235 Z' },
  { id: 'jamui', name: 'Jamui', nameHi: 'जमुई', rainfall: 84, color: '#93c5fd', d: 'M 205 195 L 245 198 L 240 238 L 198 235 Z' },
  { id: 'banka', name: 'Banka', nameHi: 'बांका', rainfall: 91, color: '#3b82f6', d: 'M 245 198 L 280 198 L 272 238 L 240 238 Z' },
];

export default function BiharRainfallMap({ compact = false }: BiharRainfallMapProps) {
  const { t, language } = useLanguage();
  const [hoveredDistrict, setHoveredDistrict] = useState<typeof DISTRICT_POLYGONS[0] | null>(null);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <CloudRain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-tight">
              {t('rainfallOverview')}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 font-normal">
              {t('districtWiseRainfall')}
            </p>
          </div>
        </div>

        {/* State Dropdown */}
        <div className="relative">
          <select
            defaultValue="bihar"
            aria-label={t('locationBihar')}
            className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1 text-xs font-medium text-slate-700 hover:border-blue-500 focus:outline-none cursor-pointer shadow-2xs"
          >
            <option value="bihar">{language === 'hi' ? 'बिहार' : 'Bihar'}</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2 pointer-events-none" />
        </div>
      </div>

      {/* SVG Map Visualization */}
      <div className="relative w-full flex items-center justify-center py-2">
        <svg
          viewBox="10 10 330 240"
          className="w-full max-h-[200px] h-auto drop-shadow-xs"
        >
          {/* Base Glow */}
          <filter id="mapGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#3b82f6" floodOpacity="0.15" />
          </filter>

          <g filter="url(#mapGlow)">
            {DISTRICT_POLYGONS.map((dist) => {
              const isHovered = hoveredDistrict?.id === dist.id;
              return (
                <path
                  key={dist.id}
                  d={dist.d}
                  fill={dist.color}
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                  className="transition-all duration-200 cursor-pointer hover:opacity-90 hover:stroke-emerald-400 hover:stroke-2"
                  onMouseEnter={() => setHoveredDistrict(dist)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  onClick={() => setHoveredDistrict(dist)}
                />
              );
            })}
          </g>
        </svg>

        {/* Hover / Selection Badge */}
        {hoveredDistrict && (
          <div className="absolute top-2 right-2 bg-slate-900/90 text-white backdrop-blur-xs px-2.5 py-1.5 rounded-lg text-xs shadow-md pointer-events-none animate-in fade-in zoom-in-95">
            <div className="font-semibold text-emerald-400">
              {language === 'hi' ? hoveredDistrict.nameHi : hoveredDistrict.name}
            </div>
            <div className="text-[11px] text-slate-200">
              {hoveredDistrict.rainfall} mm
            </div>
          </div>
        )}
      </div>

      {/* Color Gradient Legend matching mockup */}
      <div className="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
          <span>{t('low')}</span>
          <div className="h-2 flex-1 mx-3 rounded-full bg-gradient-to-r from-[#93c5fd] via-[#3b82f6] to-[#172554] shadow-inner" />
          <span>{t('high')}</span>
        </div>
      </div>
    </div>
  );
}

