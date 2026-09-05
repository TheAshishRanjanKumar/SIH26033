'use client';

import React, { useState } from 'react';
import KisanSidebar from '@/components/KisanSidebar';
import KisanHeader from '@/components/KisanHeader';
import DesktopDashboard from '@/components/DesktopDashboard';
import MobileResponsiveView from '@/components/mobile/MobileResponsiveView';

export default function HomePage() {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <>
      {/* 1. Mobile Experience (Mobile screens < 768px): Full-width, native-feel responsive mobile web application */}
      <div className="block md:hidden">
        <MobileResponsiveView />
      </div>

      {/* 2. Desktop Experience (Screens >= 768px): Clean, professional, lightweight desktop dashboard with sidebar & topbar */}
      <div className="hidden md:flex min-h-screen bg-[#f8fafc]">
        {/* Left Sidebar */}
        <KisanSidebar
          activeNav={activeNav}
          onNavigate={(id) => setActiveNav(id)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <KisanHeader />

          {/* Desktop Dashboard Body */}
          <main className="flex-1 p-5 lg:p-6 max-w-[1500px] w-full mx-auto">
            <DesktopDashboard />
          </main>
        </div>
      </div>
    </>
  );
}
