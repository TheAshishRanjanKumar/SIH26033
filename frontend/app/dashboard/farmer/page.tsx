'use client';
import { useAppStore } from '@/lib/mock-data/store';
import { useTranslation, Language } from '@/lib/i18n';
import { useState } from 'react';
import { Plus, ArrowUp, ArrowDown, Minus, TrendingUp, Package, ShoppingCart, X, Check, Globe } from 'lucide-react';
import { Listing } from '@/lib/mock-data/types';
import { getCropImage, marketPrices, getMarketData } from '@/lib/crop-utils';
import Image from 'next/image';
import Link from 'next/link';

function DirectionIcon({ dir }: { dir: 'up' | 'down' | 'stable' }) {
  if (dir === 'up') return <ArrowUp className="w-5 h-5 text-green-600 shrink-0" />;
  if (dir === 'down') return <ArrowDown className="w-5 h-5 text-red-500 shrink-0" />;
  return <Minus className="w-5 h-5 text-amber-500 shrink-0" />;
}

export default function FarmerDashboard() {
  const { currentUser, listings, addListing } = useAppStore();
  const { lang, setLang, t } = useTranslation();

  const [showAddForm, setShowAddForm] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('action') === 'sell';
    }
    return false;
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [newListing, setNewListing] = useState({ crop: 'Tomato', grade: 'A' as 'A' | 'B' | 'C', quantityKg: 500, pricePerKg: 24 });

  if (!currentUser) return null;

  const myListings = listings.filter(l => l.farmerId === currentUser.id);
  const firstName = currentUser.name.split(' ')[0];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const l: Listing = {
      id: `l_${Date.now()}`,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      crop: newListing.crop,
      grade: newListing.grade,
      pricePerKg: Number(newListing.pricePerKg) || 20,
      quantityKg: Number(newListing.quantityKg) || 100,
      location: currentUser.location || 'Nashik, Maharashtra'
    };
    addListing(l);
    setShowAddForm(false);
    setShowSuccess(true);
    setNewListing({ crop: 'Tomato', grade: 'A', quantityKg: 500, pricePerKg: 24 });
    setTimeout(() => setShowSuccess(false), 3500);
  };

  // Featured crop for the hero card
  const featuredCrop = getMarketData('Tomato');

  return (
    <div className="space-y-5 max-w-3xl mx-auto pb-24 md:pb-8">

      {/* ── HEADER & LANGUAGE SWITCHER ── */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            {t.greeting}, {firstName} 🙏
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-0.5">{currentUser.location}</p>
        </div>

        {/* Quick Language Toggle Pill */}
        <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-xs">
          <Globe className="w-3.5 h-3.5 text-slate-400 ml-1 shrink-0" />
          {(['en', 'hi', 'bn'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-colors ${
                lang === l
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {l === 'en' ? 'EN' : l === 'hi' ? 'हि' : 'বা'}
            </button>
          ))}
        </div>
      </div>

      {/* ── SUCCESS NOTIFICATION ── */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <Check className="w-5 h-5 text-green-700" />
          </div>
          <div>
            <div className="font-bold text-green-900 text-sm">{t.listingCreated}</div>
            <div className="text-xs text-green-700">{t.listingCreatedSub}</div>
          </div>
        </div>
      )}

      {/* ── TODAY'S MARKET — HERO CARD (P0 UX REQUIREMENT) ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-4 sm:px-6 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            {t.todaysMarket}
          </div>
          <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
            Live Mandi
          </span>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Real Crop Image */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0 relative shadow-xs">
              <Image
                src={getCropImage('Tomato')}
                alt="Tomato"
                fill
                sizes="(max-width: 640px) 80px, 96px"
                className="object-cover"
                priority
              />
            </div>

            {/* Crop & Big Price */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Tomato</h2>
                <span className="badge-slate text-xs font-semibold">Grade A</span>
              </div>

              <div className="mt-2">
                <div className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight flex items-baseline gap-1">
                  ₹{featuredCrop.current}
                  <span className="text-sm sm:text-base font-normal text-muted">/ kg</span>
                </div>
                <div className="text-xs text-muted font-medium mt-0.5">{t.currentPrice}</div>
              </div>
            </div>
          </div>

          {/* Decision Grid: Expected Price & AI Advice */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Price Trend Direction */}
            <div className="bg-green-50/80 rounded-xl p-3.5 border border-green-200">
              <div className="flex items-center gap-2">
                <DirectionIcon dir={featuredCrop.direction} />
                <span className="text-xs sm:text-sm font-bold text-green-900">{t.priceMayRise}</span>
              </div>
              <div className="mt-1 text-xl sm:text-2xl font-extrabold text-green-900">
                ₹{featuredCrop.expected[0]}–{featuredCrop.expected[1]}
                <span className="text-xs font-normal text-green-800 ml-1">/ kg</span>
              </div>
              <div className="text-[11px] text-green-700 font-medium mt-0.5">
                {t.expectedIn} {featuredCrop.window}
              </div>
            </div>

            {/* Market Advice */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
              <div className="text-xs font-bold text-muted uppercase tracking-wider">
                {t.marketAdvice}
              </div>
              <div className="mt-1 text-base sm:text-lg font-bold text-foreground">
                {lang === 'hi' ? featuredCrop.adviceHi : featuredCrop.advice}
              </div>
              <div className="text-xs text-muted mt-0.5">
                Window: {featuredCrop.window}
              </div>
            </div>
          </div>

          {/* Primary Action Button (Touch-friendly 48px+) */}
          <button
            onClick={() => {
              setNewListing({ crop: 'Tomato', grade: 'A', quantityKg: 500, pricePerKg: featuredCrop.current });
              setShowAddForm(true);
            }}
            className="mt-5 w-full bg-primary hover:bg-primary-dark text-white rounded-xl py-3.5 sm:py-4 text-base font-bold transition-all flex items-center justify-center gap-2.5 shadow-md active:scale-[0.99]"
          >
            <ShoppingCart className="w-5 h-5" />
            {t.sellProduce} (Tomato)
          </button>

          <p className="text-center text-[11px] text-muted mt-2">
            * {t.modelEstimate}
          </p>
        </div>
      </div>

      {/* ── OTHER CROPS (GRID OF CARDS WITH REAL IMAGES) ── */}
      <div>
        <h2 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider mb-3 px-1">
          {t.otherCrops}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(marketPrices).filter(([k]) => k !== 'Tomato').map(([cropName, data]) => (
            <button
              key={cropName}
              onClick={() => {
                setNewListing({ crop: cropName, grade: 'A', quantityKg: 500, pricePerKg: data.current });
                setShowAddForm(true);
              }}
              className="bg-white rounded-xl border border-slate-200 p-3.5 text-left hover:border-primary/50 transition-all group flex flex-col justify-between shadow-xs active:scale-[0.98]"
            >
              <div>
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 mb-2 relative">
                  <Image
                    src={getCropImage(cropName)}
                    alt={cropName}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="text-sm font-bold text-foreground truncate">{cropName}</div>
                <div className="text-base font-extrabold text-foreground mt-0.5">
                  ₹{data.current}
                  <span className="text-xs font-normal text-muted ml-0.5">/kg</span>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-2">
                <DirectionIcon dir={data.direction} />
                <span className={`text-xs font-semibold ${
                  data.direction === 'up' ? 'text-green-700' : data.direction === 'down' ? 'text-red-600' : 'text-amber-600'
                }`}>
                  {data.direction === 'up' ? t.rising : data.direction === 'down' ? t.falling : t.stable}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── MY PRODUCE LISTINGS (MOBILE-FRIENDLY CARDS) ── */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider">
            {t.myProduce} ({myListings.length})
          </h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark transition-colors py-1 px-2.5 rounded-lg bg-primary/10"
          >
            <Plus className="w-3.5 h-3.5" /> {t.addProduce}
          </button>
        </div>

        {myListings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
            <Package className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="text-sm text-muted font-medium">{t.noProduceYet}</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 bg-primary text-white rounded-xl px-5 py-2.5 text-sm font-bold hover:bg-primary-dark transition-colors shadow-xs"
            >
              {t.sellProduce}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {myListings.map(l => (
              <div
                key={l.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3.5 shadow-xs hover:border-primary/40 transition-colors"
              >
                {/* Crop Image */}
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0 relative">
                  <Image
                    src={getCropImage(l.crop)}
                    alt={l.crop}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-foreground text-sm truncate">{l.crop}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide">
                      {t.active}
                    </span>
                  </div>

                  <div className="text-xs text-muted mt-0.5">
                    {t.grade} {l.grade} · {l.location.split(',')[0]}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                    <div className="text-base font-extrabold text-foreground">
                      ₹{l.pricePerKg}
                      <span className="text-xs font-normal text-muted ml-0.5">/kg</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                      {l.quantityKg.toLocaleString()} kg
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── QUICK LINKS (MARKETPLACE & TRENDS) ── */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <Link
          href="/dashboard/buyer"
          className="bg-white rounded-2xl border border-slate-200 p-4 text-center hover:border-primary/40 transition-colors shadow-xs group"
        >
          <ShoppingCart className="w-6 h-6 mx-auto text-primary group-hover:scale-110 transition-transform mb-1.5" />
          <div className="text-sm font-bold text-foreground">{t.marketplace}</div>
          <div className="text-xs text-muted mt-0.5">{t.browseDemand}</div>
        </Link>

        <Link
          href="/forecast"
          className="bg-white rounded-2xl border border-slate-200 p-4 text-center hover:border-primary/40 transition-colors shadow-xs group"
        >
          <TrendingUp className="w-6 h-6 mx-auto text-primary group-hover:scale-110 transition-transform mb-1.5" />
          <div className="text-sm font-bold text-foreground">{t.priceTrend}</div>
          <div className="text-xs text-muted mt-0.5">{t.viewForecast}</div>
        </Link>
      </div>

      {/* ── SELL PRODUCE MODAL FORM ── */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">{t.sellProduce}</h3>
              </div>
              <button
                onClick={() => setShowAddForm(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddSubmit} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  {lang === 'hi' ? 'फसल का नाम' : lang === 'bn' ? 'ফসলের নাম' : 'Crop Name'}
                </label>
                <input
                  required
                  className="input-field text-base py-3 rounded-xl"
                  placeholder="e.g. Tomato, Onion, Potato"
                  value={newListing.crop}
                  onChange={e => setNewListing({ ...newListing, crop: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                    {t.grade}
                  </label>
                  <select
                    className="select-field w-full py-3 text-base rounded-xl"
                    value={newListing.grade}
                    onChange={e => setNewListing({ ...newListing, grade: e.target.value as 'A' | 'B' | 'C' })}
                  >
                    <option value="A">Grade A (Premium)</option>
                    <option value="B">Grade B (Standard)</option>
                    <option value="C">Grade C (Processing)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                    {t.quantity} (kg)
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    className="input-field text-base py-3 rounded-xl"
                    placeholder="500"
                    value={newListing.quantityKg || ''}
                    onChange={e => setNewListing({ ...newListing, quantityKg: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  {t.price} (₹ / kg)
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  className="input-field text-base py-3 rounded-xl"
                  placeholder="24"
                  value={newListing.pricePerKg || ''}
                  onChange={e => setNewListing({ ...newListing, pricePerKg: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl py-4 text-base font-bold transition-colors shadow-md"
                >
                  {t.listForSale}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
