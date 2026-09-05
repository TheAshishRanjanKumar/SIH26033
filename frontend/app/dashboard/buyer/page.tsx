'use client';
import { useAppStore } from '@/lib/mock-data/store';
import { useState } from 'react';
import { Search, MapPin, FileText, ShoppingBasket, SlidersHorizontal, Leaf } from 'lucide-react';
import { RFQ } from '@/lib/mock-data/types';
import { useRouter } from 'next/navigation';

export default function BuyerDashboard() {
  const { currentUser, listings, addRFQ } = useAppStore();
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Marketplace</h1>
          <p className="text-sm text-muted mt-1">{listings.length} listings · {uniqueCrops} crops · {totalQuantity.toLocaleString()} kg available</p>
        </div>
        <button
          onClick={() => setShowRfqForm(!showRfqForm)}
          className="btn-accent flex items-center gap-2 shrink-0"
        >
          <FileText className="w-4 h-4" />
          Create Bulk RFQ
        </button>
      </div>

      {/* RFQ Form */}
      {showRfqForm && (
        <div className="section-card">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent-light flex items-center justify-center">
              <FileText className="w-4 h-4 text-accent" />
            </div>
            <h2 className="section-title">Request for Quote (Bulk Order)</h2>
          </div>
          <form onSubmit={handleCreateRFQ} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="label-text">Crop</label>
              <input required className="input-field" placeholder="e.g. Tomato" value={newRfq.crop} onChange={e => setNewRfq({...newRfq, crop: e.target.value})} />
            </div>
            <div>
              <label className="label-text">Quantity (kg)</label>
              <input required type="number" min="1" className="input-field" placeholder="5000" value={newRfq.quantityKg || ''} onChange={e => setNewRfq({...newRfq, quantityKg: parseInt(e.target.value) || 0})} />
            </div>
            <div>
              <label className="label-text">Grade Required</label>
              <select className="select-field w-full" value={newRfq.grade} onChange={e => setNewRfq({...newRfq, grade: e.target.value as 'A'|'B'|'C'})}>
                <option value="A">Grade A</option>
                <option value="B">Grade B</option>
                <option value="C">Grade C</option>
              </select>
            </div>
            <div>
              <label className="label-text">Target Price (₹/kg)</label>
              <input required type="number" min="1" className="input-field" placeholder="25" value={newRfq.targetPricePerKg || ''} onChange={e => setNewRfq({...newRfq, targetPricePerKg: parseInt(e.target.value) || 0})} />
            </div>
            <div className="sm:col-span-2 lg:col-span-4 flex justify-end pt-2">
              <button type="submit" className="btn-primary flex items-center gap-2">
                Submit RFQ & Find Matches
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search & Filters */}
      <div className="section-card">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search by crop, farmer, or location..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted" />
            <select
              className="select-field"
              value={gradeFilter}
              onChange={e => setGradeFilter(e.target.value)}
            >
              <option value="ALL">All Grades</option>
              <option value="A">Grade A</option>
              <option value="B">Grade B</option>
              <option value="C">Grade C</option>
            </select>
          </div>
        </div>
      </div>

      {/* Produce Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredListings.map(l => (
          <div key={l.id} className="section-card hover:border-primary/30 transition-colors flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{l.crop}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="badge-slate">Grade {l.grade}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-primary">₹{l.pricePerKg}</div>
                <div className="text-xs text-muted">per kg</div>
              </div>
            </div>

            <div className="space-y-2 text-sm flex-1">
              <div className="flex justify-between">
                <span className="text-muted">Available</span>
                <span className="font-medium">{l.quantityKg.toLocaleString()} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Seller</span>
                <span className="font-medium">{l.farmerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Location</span>
                <span className="font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3" />{l.location.split(',')[0]}
                  <span className="text-muted">· {l.distanceKm || 50}km</span>
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-border">
              <button className="btn-secondary w-full flex items-center justify-center gap-2">
                <ShoppingBasket className="w-4 h-4" />
                Buy Direct
              </button>
            </div>
          </div>
        ))}
        {filteredListings.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 text-center py-12">
            <ShoppingBasket className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-muted">No produce matches your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
