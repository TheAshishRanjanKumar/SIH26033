'use client';

import React, { useState } from 'react';
import FarmerTopNav from '@/components/farmer/FarmerTopNav';
import FarmerHero from '@/components/farmer/FarmerHero';
import DailyUpdatesGrid from '@/components/farmer/DailyUpdatesGrid';
import DistrictSelector from '@/components/farmer/DistrictSelector';
import PopularCropsGrid from '@/components/farmer/PopularCropsGrid';
import FarmerFooter from '@/components/farmer/FarmerFooter';
import FarmerMobileApp from '@/components/farmer/FarmerMobileApp';
import FarmerDesktopDetailModal from '@/components/farmer/FarmerDesktopDetailModal';
import { PopularCrop, POPULAR_CROPS } from '@/lib/data/kisanData';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedDistrict, setSelectedDistrict] = useState('Patna');
  const [activeModal, setActiveModal] = useState<'prices' | 'weather' | 'production' | 'advisory' | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<PopularCrop | null>(POPULAR_CROPS[0]);

  const handleOpenDetail = (type: 'prices' | 'weather' | 'production' | 'advisory', crop?: PopularCrop) => {
    setActiveModal(type);
    if (crop) setSelectedCrop(crop);
  };

  return (
    <>
      {/* 1. MOBILE-FIRST VIEW (Screens < 768px):
             Delivers the exact 4 mobile screens from the mockup:
             Home, Fasal ke Daam, Mausam, and Kheti Salaah with bottom navigation bar */}
      <div className="block md:hidden min-h-screen bg-slate-50">
        <FarmerMobileApp />
      </div>

      {/* 2. DESKTOP VIEW (Screens >= 768px):
             Delivers the exact desktop dashboard from the mockup:
             Top nav, hero with farmer illustration & speech bubble, 
             4 highlight cards, district selector, popular crops, and footer */}
      <div className="hidden md:flex flex-col min-h-screen bg-[#f8fafc]">
        <FarmerTopNav
          activeSection={activeSection}
          onNavigate={(section) => {
            setActiveSection(section);
            if (section === 'prices') handleOpenDetail('prices');
            else if (section === 'weather') handleOpenDetail('weather');
            else if (section === 'production') handleOpenDetail('production');
            else if (section === 'advisory') handleOpenDetail('advisory');
          }}
        />

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* Hero Banner with Farmer Illustration */}
          <FarmerHero
            onExploreDistrict={() => {
              const el = document.getElementById('district-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Section 1: Aaj ki Jaankari (4 Highlight Cards) */}
          <DailyUpdatesGrid
            onCardClick={(cardId) => handleOpenDetail(cardId)}
          />

          {/* Section 2: Apna Jila Chune (District Selector Bar) */}
          <div id="district-section">
            <DistrictSelector
              onSelectDistrict={(dist) => {
                setSelectedDistrict(dist);
                handleOpenDetail('prices');
              }}
            />
          </div>

          {/* Section 3: Lokpriya Fasal (5 Popular Crop Cards) */}
          <PopularCropsGrid
            onSelectCrop={(crop) => handleOpenDetail('prices', crop)}
          />

          {/* Section 4: Farmer Value Callout & Footer */}
          <FarmerFooter />
        </main>

        {/* Interactive Detail Modal on Desktop */}
        <FarmerDesktopDetailModal
          type={activeModal}
          crop={selectedCrop}
          district={selectedDistrict}
          onClose={() => setActiveModal(null)}
        />
      </div>
    </>
  );
}
