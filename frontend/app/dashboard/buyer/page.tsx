'use client';
import { useAppStore } from '@/lib/mock-data/store';
import { useState } from 'react';
import { Search, MapPin, FileText, ShoppingBasket, SlidersHorizontal } from 'lucide-react';
import { RFQ } from '@/lib/mock-data/types';
import { getCropImage } from '@/lib/crop-utils';
import { useTranslation } from '@/lib/i18n';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BuyerDashboard() {
  const { currentUser, listings, addRFQ } = useAppStore();
  const { t } = useTranslation();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showRfqForm, setShowRfqForm] = useState(false);
  const [gradeFilter, setGradeFilter] = useState('ALL');
  const [newRfq, setNewRfq] = useState({ crop: '', quantityKg: 0, grade: 'A' as 'A'|'B'|'C', targetPricePerKg: 0 });

  if (!currentUser) return null;

  const filteredListings = listings.filter(l => {
    const matchesSearch = l.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'ALL' || l.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const handleCreateRFQ = (e: React.FormEvent) => {
    e.preventDefault();
    const rfq: RFQ = {
      id: `r_${Date.now()}`,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      crop: newRfq.crop,
      quantityKg: newRfq.quantityKg,
      grade: newRfq.grade,
      targetPricePerKg: newRfq.targetPricePerKg,
      deliveryLocation: currentUser.location || 'Unknown',
      requiredByDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      status: 'OPEN'
    };
    addRFQ(rfq);
    router.push(`/dashboard/buyer/rfq/${rfq.id}`);
  };

  const totalQuantity = filteredListings.reduce((s, l) => s + l.quantityKg, 0);
  const uniqueCrops = new Set(listings.map(l => l.crop)).size;

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title text-xl sm:text-2xl">{t.marketplaceTitle}</h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            {listings.length} {t.listingsCount} · {uniqueCrops} {t.cropsCount} · {totalQuantity.toLocaleString()} {t.kg} {t.availableVolume}
          </p>
        </div>
        <button
          onClick={() => setShowRfqForm(!showRfqForm)}
          className="btn-accent flex items-center gap-2 shrink-0 self-start sm:self-auto font-bold rounded-xl shadow-xs"
        >
          <FileText className="w-4 h-4" />
          {t.createBulkRFQ}
        </button>
      </div>

      {/* RFQ Form */}
      {showRfqForm && (
        <div className="section-card animate-in fade-in rounded-2xl shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent-light flex items-center justify-center">
              <FileText className="w-4 h-4 text-accent" />
            </div>
            <h2 className="section-title text-base">{t.rfqModalTitle}</h2>
          </div>
          <form onSubmit={handleCreateRFQ} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="label-text font-bold">{t.cropNameLabel}</label>
              <input required className="input-field rounded-xl" placeholder={t.cropPlaceholder} value={newRfq.crop} onChange={e => setNewRfq({...newRfq, crop: e.target.value})} />
            </div>
            <div>
              <label className="label-text font-bold">{t.quantityKgLabel}</label>
              <input required type="number" min="1" className="input-field rounded-xl" placeholder="5000" value={newRfq.quantityKg || ''} onChange={e => setNewRfq({...newRfq, quantityKg: parseInt(e.target.value) || 0})} />
            </div>
            <div>
              <label className="label-text font-bold">{t.grade}</label>
              <select className="select-field w-full rounded-xl" value={newRfq.grade} onChange={e => setNewRfq({...newRfq, grade: e.target.value as 'A'|'B'|'C'})}>
                <option value="A">{t.gradeAPremium}</option>
                <option value="B">{t.gradeBStandard}</option>
                <option value="C">{t.gradeCProcessing}</option>
              </select>
            </div>
            <div>
              <label className="label-text font-bold">{t.targetPriceLabel}</label>
              <input required type="number" min="1" className="input-field rounded-xl" placeholder="25" value={newRfq.targetPricePerKg || ''} onChange={e => setNewRfq({...newRfq, targetPricePerKg: parseInt(e.target.value) || 0})} />
            </div>
            <div className="sm:col-span-2 lg:col-span-4 flex justify-end pt-2">
              <button type="submit" className="btn-primary flex items-center gap-2 font-bold rounded-xl shadow-xs">
                {t.submitRFQBtn}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search & Filters */}
      <div className="section-card rounded-2xl shadow-2xs">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="input-field pl-10 rounded-xl"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted" />
            <select
              className="select-field rounded-xl text-sm font-medium"
              value={gradeFilter}
              onChange={e => setGradeFilter(e.target.value)}
            >
              <option value="ALL">{t.allGrades}</option>
              <option value="A">Grade A</option>
              <option value="B">Grade B</option>
              <option value="C">Grade C</option>
            </select>
          </div>
        </div>
      </div>

      {/* Produce Cards (with real crop imagery & high visual hierarchy) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredListings.map(l => (
          <div key={l.id} className="section-card rounded-2xl hover:border-primary/40 transition-all flex flex-col justify-between shadow-xs">
            <div>
              {/* Header: Image, Title, Price */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0 relative shadow-xs">
                    <Image
                      src={getCropImage(l.crop)}
                      alt={l.crop}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground text-base truncate">{l.crop}</h3>
                    <span className="badge-slate text-[11px] mt-0.5">{t.grade} {l.grade}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-2xl font-extrabold text-primary">₹{l.pricePerKg}</div>
                  <div className="text-[11px] text-muted font-semibold uppercase tracking-wider">{t.perKg}</div>
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-2 text-sm pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span className="text-muted">{t.available}</span>
                  <span className="font-bold text-foreground">{l.quantityKg.toLocaleString()} {t.kg}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">{t.seller}</span>
                  <span className="font-medium text-foreground">{l.farmerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">{t.location}</span>
                  <span className="font-medium text-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {l.location.split(',')[0]}
                    <span className="text-xs text-muted">· {l.distanceKm || 50}km</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-border">
              <button className="btn-secondary w-full flex items-center justify-center gap-2 font-bold rounded-xl py-2.5">
                <ShoppingBasket className="w-4 h-4 text-primary" />
                {t.buyDirectBtn}
              </button>
            </div>
          </div>
        ))}
        {filteredListings.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <ShoppingBasket className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-muted font-medium">{t.noProduceMatch}</p>
          </div>
        )}
      </div>
    </div>
  );
}
