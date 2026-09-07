'use client';
import { useAppStore } from '@/lib/mock-data/store';
import { useRouter } from 'next/navigation';
import { ArrowRight, Users, Package, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Listing } from '@/lib/mock-data/types';
import { useTranslation } from '@/lib/i18n';
import { use } from 'react';

export default function RFQPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { rfqs, listings, addOrder } = useAppStore();
  const { t } = useTranslation();
  const router = useRouter();

  const rfq = rfqs.find(r => r.id === id);
  if (!rfq) return (
    <div className="flex flex-col items-center justify-center py-20">
      <AlertTriangle className="w-10 h-10 text-muted mb-3" />
      <p className="text-muted font-medium">{t.rfqNotFound}</p>
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
      // eslint-disable-next-line react-hooks/purity
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
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-8">
      <div>
        <h1 className="page-title text-xl sm:text-2xl">{t.supplyAggregationTitle}</h1>
        <p className="text-xs sm:text-sm text-muted mt-1">{t.matchingSuppliersFor} ({rfq.crop})</p>
      </div>

      {/* RFQ Summary */}
      <div className="section-card rounded-2xl shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-muted uppercase tracking-wider mb-1 font-bold">{t.crop}</div>
            <div className="font-bold text-foreground text-base">{rfq.crop} <span className="badge-slate ml-1 text-xs">{t.grade} {rfq.grade}</span></div>
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wider mb-1 font-bold">{t.requiredQuantity}</div>
            <div className="font-bold text-foreground text-base">{rfq.quantityKg.toLocaleString()} {t.kg}</div>
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wider mb-1 font-bold">{t.targetPrice}</div>
            <div className="font-bold text-foreground text-base">₹{rfq.targetPricePerKg} {t.perKg}</div>
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wider mb-1 font-bold">{t.deliveryBy}</div>
            <div className="font-bold text-foreground text-base">{rfq.requiredByDate}</div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="section-card rounded-2xl shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="section-title flex items-center gap-2 text-base">
            <Users className="w-4 h-4 text-primary" />
            {t.supplySources} ({selectedListings.length})
          </div>
          <span className={`${fulfillmentPct >= 100 ? 'badge-green' : 'badge-amber'} font-bold`}>
            {fulfillmentPct}% {t.fulfilled}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full mb-5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${fulfillmentPct >= 100 ? 'bg-success' : 'bg-accent'}`}
            style={{ width: `${fulfillmentPct}%` }}
          />
        </div>

        {/* Farmer list */}
        <div className="space-y-2 mb-5">
          {selectedListings.map(l => (
            <div key={l.id} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{l.farmerName}</div>
                  <div className="text-xs text-muted flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />{l.location} · {l.distanceKm || 45}km
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-extrabold text-primary">{l.quantityKg.toLocaleString()} {t.kg}</div>
                <div className="text-xs text-muted">₹{l.pricePerKg} {t.perKg}</div>
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
            <div className="text-sm font-bold text-foreground">
              {t.available}: {currentAggregated.toLocaleString()} / {rfq.quantityKg.toLocaleString()} {t.kg}
            </div>
            {shortfall > 0 ? (
              <div className="text-xs text-accent font-bold flex items-center gap-1 mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5" /> {t.poolShortfall} {shortfall.toLocaleString()} {t.kg} {t.moreToFulfill}
              </div>
            ) : (
              <div className="text-xs text-success font-bold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% {t.fulfilled}
              </div>
            )}
          </div>

          <button
            onClick={handleConfirmOrder}
            disabled={selectedListings.length === 0}
            className="btn-primary flex items-center gap-2 font-bold rounded-xl py-3 px-5 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
          >
            {selectedListings.length > 0 ? t.fulfillAndOrder : t.cannotFulfillYet}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
