'use client';
import { useAppStore } from '@/lib/mock-data/store';
import { useRouter } from 'next/navigation';
import { ArrowRight, Users, Package, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Listing } from '@/lib/mock-data/types';
import { use } from 'react';

export default function RFQPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { rfqs, listings, addOrder } = useAppStore();
  const router = useRouter();

  const rfq = rfqs.find(r => r.id === id);
  if (!rfq) return (
    <div className="flex flex-col items-center justify-center py-20">
      <AlertTriangle className="w-10 h-10 text-muted mb-3" />
      <p className="text-muted">RFQ not found</p>
    </div>
  );

  const matchedListings = listings.filter(l => l.crop.toLowerCase() === rfq.crop.toLowerCase() && l.grade === rfq.grade);

  let currentAggregated = 0;
  const selectedListings: Listing[] = [];

  for (const l of matchedListings) {
    if (currentAggregated < rfq.quantityKg) {
      selectedListings.push(l);
      currentAggregated += l.quantityKg;
    }
  }

  const shortfall = Math.max(0, rfq.quantityKg - currentAggregated);
  const fulfillmentPct = Math.min(100, Math.round((currentAggregated / rfq.quantityKg) * 100));

  const handleConfirmOrder = () => {
    if (selectedListings.length === 0) return;

    const totalPrice = selectedListings.reduce((sum, l) => sum + (l.pricePerKg * l.quantityKg), 0);
    const totalQuantity = selectedListings.reduce((sum, l) => sum + l.quantityKg, 0);

    const newOrder = {
      id: `o_${Date.now()}`,
      rfqId: rfq.id,
      buyerId: rfq.buyerId,
      listingIds: selectedListings.map(l => l.id),
      totalQuantityKg: totalQuantity,
      totalPrice: totalPrice,
      status: 'MATCHED' as const,
      createdAt: new Date().toISOString()
    };
    addOrder(newOrder);
    router.push(`/dashboard/buyer/order/${newOrder.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="page-title">Supply Aggregation</h1>
        <p className="text-sm text-muted mt-1">Matching farmers & FPOs for your {rfq.crop} requirement</p>
      </div>

      {/* RFQ Summary */}
      <div className="section-card">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-muted uppercase tracking-wide mb-1">Crop</div>
            <div className="font-semibold text-foreground">{rfq.crop} <span className="badge-slate ml-1">Grade {rfq.grade}</span></div>
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wide mb-1">Required Qty</div>
            <div className="font-semibold text-foreground">{rfq.quantityKg.toLocaleString()} kg</div>
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wide mb-1">Target Price</div>
            <div className="font-semibold text-foreground">₹{rfq.targetPricePerKg}/kg</div>
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wide mb-1">Delivery By</div>
            <div className="font-semibold text-foreground">{rfq.requiredByDate}</div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="section-card">
        <div className="flex items-center justify-between mb-3">
          <div className="section-title flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Supply Sources ({selectedListings.length} matched)
          </div>
          <span className={fulfillmentPct >= 100 ? 'badge-green' : 'badge-amber'}>
            {fulfillmentPct}% fulfilled
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full mb-5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${fulfillmentPct >= 100 ? 'bg-success' : 'bg-accent'}`}
            style={{ width: `${fulfillmentPct}%` }}
          />
        </div>

        {/* Farmer list */}
        <div className="space-y-2 mb-5">
          {selectedListings.map(l => (
            <div key={l.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{l.farmerName}</div>
                  <div className="text-xs text-muted flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{l.location} · {l.distanceKm}km
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-primary">{l.quantityKg.toLocaleString()} kg</div>
                <div className="text-xs text-muted">₹{l.pricePerKg}/kg</div>
              </div>
            </div>
          ))}
          {selectedListings.length === 0 && (
            <div className="text-center py-8">
              <Package className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-muted">No matching supply found for {rfq.crop} Grade {rfq.grade}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border">
          <div>
            <div className="text-sm font-medium text-foreground">
              Aggregated: {currentAggregated.toLocaleString()} / {rfq.quantityKg.toLocaleString()} kg
            </div>
            {shortfall > 0 ? (
              <div className="text-xs text-accent flex items-center gap-1 mt-0.5">
                <AlertTriangle className="w-3 h-3" /> Shortfall: {shortfall.toLocaleString()} kg
              </div>
            ) : (
              <div className="text-xs text-success flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> Requirement fully met
              </div>
            )}
          </div>

          <button
            onClick={handleConfirmOrder}
            disabled={selectedListings.length === 0}
            className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirm & Optimize Route
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
