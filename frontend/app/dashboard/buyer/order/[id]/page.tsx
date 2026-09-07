'use client';
import { useAppStore } from '@/lib/mock-data/store';
import { useTranslation } from '@/lib/i18n';
import { Truck, CheckCircle2, Clock, Route, Timer, TrendingDown, AlertTriangle } from 'lucide-react';
import { use, useEffect } from 'react';

const STATUS_LIST = ['PLACED', 'MATCHED', 'PICKUP', 'IN_TRANSIT', 'DELIVERED'] as const;

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { orders, updateOrderStatus } = useAppStore();
  const { t } = useTranslation();
  const order = orders.find(o => o.id === id);

  const statusMeta: Record<string, { label: string; color: string }> = {
    PLACED: { label: t.statusPlaced, color: 'bg-slate-400' },
    MATCHED: { label: t.statusMatched, color: 'bg-info' },
    PICKUP: { label: t.statusPickup, color: 'bg-accent' },
    IN_TRANSIT: { label: t.statusInTransit, color: 'bg-primary' },
    DELIVERED: { label: t.statusDelivered, color: 'bg-success' },
  };

  useEffect(() => {
    if (!order) return;
    const statuses = ['MATCHED', 'PICKUP', 'IN_TRANSIT', 'DELIVERED'] as const;
    const idx = statuses.indexOf(order.status as typeof statuses[number]);

    if (idx >= 0 && idx < statuses.length - 1) {
      const timer = setTimeout(() => {
        updateOrderStatus(order.id, statuses[idx + 1] as 'MATCHED' | 'PICKUP' | 'IN_TRANSIT' | 'DELIVERED');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [order, updateOrderStatus]);

  if (!order) return (
    <div className="flex flex-col items-center justify-center py-20">
      <AlertTriangle className="w-10 h-10 text-muted mb-3" />
      <p className="text-muted font-medium">{t.orderNotFound}</p>
    </div>
  );

  const currentIdx = STATUS_LIST.indexOf(order.status);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 md:pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="page-title text-xl sm:text-2xl">{t.orderTrackingTitle}</h1>
          <p className="text-xs sm:text-sm text-muted mt-1">{t.orderTrackingSubtitle}</p>
        </div>
        <span className={`badge text-xs font-bold ${statusMeta[order.status]?.color} text-white px-3.5 py-1.5 rounded-full shadow-xs self-start sm:self-auto`}>
          {statusMeta[order.status]?.label || order.status}
        </span>
      </div>

      {/* Timeline */}
      <div className="section-card rounded-2xl shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[500px] relative py-2">
          {/* Connecting line */}
          <div className="absolute left-6 right-6 top-7 h-1 bg-slate-200" />
          <div
            className="absolute left-6 top-7 h-1 bg-primary transition-all duration-700"
            style={{ width: `${Math.max(0, (currentIdx / (STATUS_LIST.length - 1)) * 100 - 5)}%` }}
          />

          {STATUS_LIST.map((s, i) => (
            <div key={s} className="relative flex flex-col items-center z-10" style={{ flex: 1 }}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                i < currentIdx ? 'bg-primary border-primary text-white shadow-xs'
                : i === currentIdx ? 'bg-white border-primary text-primary ring-4 ring-primary/10'
                : 'bg-white border-slate-200 text-slate-400'
              }`}>
                {i < currentIdx ? <CheckCircle2 className="w-5 h-5" /> : (i === currentIdx ? <Clock className="w-5 h-5" /> : <span className="text-xs font-bold">{i + 1}</span>)}
              </div>
              <div className={`text-xs mt-2 font-bold ${i <= currentIdx ? 'text-foreground' : 'text-muted'}`}>
                {statusMeta[s]?.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Map placeholder */}
          <div className="section-card rounded-2xl p-0 overflow-hidden shadow-xs">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-72 sm:h-80 flex flex-col items-center justify-center text-muted relative">
              <Route className="w-12 h-12 mb-2 text-primary opacity-60" />
              <div className="font-bold text-sm text-foreground">{t.aiOptimizedRoute}</div>
              <div className="text-xs text-muted mt-1">{t.multiPointPickup}: Nashik → Pune → Mumbai</div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 800 400">
                <path d="M 120 120 Q 300 60 450 220 T 700 300" stroke="#2F6F4E" strokeWidth="3" fill="none" strokeDasharray="8,6" opacity="0.4" />
                <circle cx="120" cy="120" r="8" fill="#2F6F4E" opacity="0.6" />
                <circle cx="450" cy="220" r="8" fill="#2F6F4E" opacity="0.6" />
                <circle cx="700" cy="300" r="8" fill="#D97706" opacity="0.6" />
              </svg>
            </div>
          </div>

          {/* Logistics sequence */}
          <div className="section-card rounded-2xl shadow-xs">
            <h2 className="section-title flex items-center gap-2 mb-5">
              <Truck className="w-4 h-4 text-accent" /> {t.orderTrackingTitle}
            </h2>
            <div className="space-y-0 relative ml-4 border-l-2 border-slate-200 pl-6">
              {[
                { type: t.statusPickup, name: 'Ramesh Patel — Nashik', detail: `1,500 ${t.kg} Tomato · Est 10:00 AM`, color: 'bg-primary' },
                { type: t.statusPickup, name: 'Suresh Kumar — Pune', detail: `3,000 ${t.kg} Tomato · Est 01:30 PM`, color: 'bg-primary' },
                { type: t.statusDelivered, name: 'FreshMart Hub — Mumbai', detail: `4,500 ${t.kg} Total · Est 05:00 PM`, color: 'bg-accent' },
              ].map((stop, i) => (
                <div key={i} className="relative pb-6 last:pb-0">
                  <div className={`absolute -left-[31px] w-4 h-4 rounded-full ${stop.color} border-[3px] border-white shadow-xs`} />
                  <div className="text-sm font-bold text-foreground">{stop.type}: {stop.name}</div>
                  <div className="text-xs text-muted mt-0.5">{stop.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Route impact */}
          <div className="section-card rounded-2xl shadow-xs">
            <h2 className="section-title mb-4 font-bold">{t.aiOptimizedRoute}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Route className="w-4 h-4" /> Traditional Mandi
                </div>
                <span className="text-sm font-medium text-muted line-through">420 km</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Route className="w-4 h-4 text-primary" /> AgriDirect Direct
                </div>
                <span className="text-lg font-extrabold text-primary">313 km</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                  <Timer className="w-4 h-4 text-muted" /> {t.eta}
                </div>
                <span className="text-sm font-bold text-foreground">{t.hoursRemaining}</span>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-foreground font-bold">
                    <TrendingDown className="w-4 h-4 text-success" /> {t.consumerSavings}
                  </div>
                  <span className="text-xl font-extrabold text-success">25.4%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="section-card rounded-2xl shadow-xs">
            <h2 className="section-title mb-4 font-bold">{t.orderSummary}</h2>
            <div className="text-sm space-y-3">
              <div className="flex justify-between">
                <span className="text-muted font-medium">{t.totalQuantityTitle}</span>
                <span className="font-bold text-foreground">{order.totalQuantityKg.toLocaleString()} {t.kg}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted font-medium">{t.totalCostTitle}</span>
                <span className="font-bold text-foreground">₹{order.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted font-medium">{t.contributors}</span>
                <span className="font-bold text-foreground">{order.listingIds.length} {t.farmersCount}</span>
              </div>
              <div className="pt-3 border-t border-border flex justify-between items-center">
                <span className="text-muted text-xs">ID</span>
                <span className="text-xs font-mono text-muted">{order.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
