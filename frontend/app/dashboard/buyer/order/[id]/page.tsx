'use client';
import { useAppStore } from '@/lib/mock-data/store';
import { Truck, CheckCircle2, Clock, MapPin, Package, Route, Timer, TrendingDown, AlertTriangle } from 'lucide-react';
import { use, useEffect } from 'react';

const STATUS_LIST = ['PLACED', 'MATCHED', 'PICKUP', 'IN_TRANSIT', 'DELIVERED'] as const;

const statusMeta: Record<string, { label: string; color: string }> = {
  PLACED: { label: 'Placed', color: 'bg-slate-400' },
  MATCHED: { label: 'Matched', color: 'bg-info' },
  PICKUP: { label: 'Pickup', color: 'bg-accent' },
  IN_TRANSIT: { label: 'In Transit', color: 'bg-primary' },
  DELIVERED: { label: 'Delivered', color: 'bg-success' },
};

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { orders, updateOrderStatus } = useAppStore();
  const order = orders.find(o => o.id === id);

  useEffect(() => {
    if (!order) return;
    const statuses = ['MATCHED', 'PICKUP', 'IN_TRANSIT', 'DELIVERED'] as const;
    const idx = statuses.indexOf(order.status as typeof statuses[number]);

    if (idx >= 0 && idx < statuses.length - 1) {
      const timer = setTimeout(() => {
        updateOrderStatus(order.id, statuses[idx + 1] as any);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [order, updateOrderStatus]);

  if (!order) return (
    <div className="flex flex-col items-center justify-center py-20">
      <AlertTriangle className="w-10 h-10 text-muted mb-3" />
      <p className="text-muted">Order not found</p>
    </div>
  );

  const currentIdx = STATUS_LIST.indexOf(order.status);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="page-title">Order Tracking</h1>
          <p className="text-sm text-muted mt-1">Real-time logistics and delivery status</p>
        </div>
        <span className={`badge text-xs ${statusMeta[order.status]?.color} text-white px-3 py-1`}>
          {statusMeta[order.status]?.label || order.status}
        </span>
      </div>

      {/* Timeline */}
      <div className="section-card overflow-x-auto">
        <div className="flex items-center justify-between min-w-[500px] relative">
          {/* Connecting line */}
          <div className="absolute left-6 right-6 top-5 h-0.5 bg-slate-200" />
          <div
            className="absolute left-6 top-5 h-0.5 bg-primary transition-all duration-700"
            style={{ width: `${Math.max(0, (currentIdx / (STATUS_LIST.length - 1)) * 100 - 5)}%` }}
          />

          {STATUS_LIST.map((s, i) => (
            <div key={s} className="relative flex flex-col items-center z-10" style={{ flex: 1 }}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                i < currentIdx ? 'bg-primary border-primary text-white'
                : i === currentIdx ? 'bg-white border-primary text-primary ring-4 ring-primary/10'
                : 'bg-white border-slate-200 text-slate-400'
              }`}>
                {i < currentIdx ? <CheckCircle2 className="w-5 h-5" /> : (i === currentIdx ? <Clock className="w-5 h-5" /> : <span className="text-xs font-medium">{i + 1}</span>)}
              </div>
              <div className={`text-xs mt-2 font-medium ${i <= currentIdx ? 'text-foreground' : 'text-muted'}`}>
                {statusMeta[s]?.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Map placeholder */}
          <div className="section-card p-0 overflow-hidden">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-72 sm:h-80 flex flex-col items-center justify-center text-muted relative">
              <Route className="w-12 h-12 mb-2 opacity-40" />
              <div className="font-medium text-sm">AI-Optimized Route</div>
              <div className="text-xs mt-1">Nashik → Pune → Mumbai</div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 800 400">
                <path d="M 120 120 Q 300 60 450 220 T 700 300" stroke="#2F6F4E" strokeWidth="3" fill="none" strokeDasharray="8,6" opacity="0.3" />
                <circle cx="120" cy="120" r="8" fill="#2F6F4E" opacity="0.5" />
                <circle cx="450" cy="220" r="8" fill="#2F6F4E" opacity="0.5" />
                <circle cx="700" cy="300" r="8" fill="#D97706" opacity="0.5" />
              </svg>
            </div>
          </div>

          {/* Logistics sequence */}
          <div className="section-card">
            <h2 className="section-title flex items-center gap-2 mb-5">
              <Truck className="w-4 h-4 text-accent" /> Logistics Sequence
            </h2>
            <div className="space-y-0 relative ml-4 border-l-2 border-slate-200 pl-6">
              {[
                { type: 'pickup', name: 'Ramesh Patel — Nashik', detail: '1,500 kg Tomato · Est 10:00 AM', color: 'bg-primary' },
                { type: 'pickup', name: 'Suresh Kumar — Pune', detail: '3,000 kg Tomato · Est 01:30 PM', color: 'bg-primary' },
                { type: 'delivery', name: 'FreshMart Hub — Mumbai', detail: '4,500 kg Total · Est 05:00 PM', color: 'bg-accent' },
              ].map((stop, i) => (
                <div key={i} className="relative pb-6 last:pb-0">
                  <div className={`absolute -left-[29px] w-3.5 h-3.5 rounded-full ${stop.color} border-[3px] border-white`} />
                  <div className="text-sm font-medium text-foreground">{stop.type === 'pickup' ? 'Pickup' : 'Delivery'}: {stop.name}</div>
                  <div className="text-xs text-muted mt-0.5">{stop.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Route impact */}
          <div className="section-card">
            <h2 className="section-title mb-4">Route Optimization</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Route className="w-4 h-4" /> Traditional
                </div>
                <span className="text-sm font-medium text-muted line-through">420 km</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Route className="w-4 h-4 text-primary" /> Optimized
                </div>
                <span className="text-lg font-semibold text-primary">313 km</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Timer className="w-4 h-4 text-muted" /> Est. Time
                </div>
                <span className="text-sm font-medium">7h 15m</span>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <TrendingDown className="w-4 h-4 text-success" /> Savings
                  </div>
                  <span className="text-xl font-semibold text-success">25.4%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="section-card">
            <h2 className="section-title mb-4">Order Summary</h2>
            <div className="text-sm space-y-3">
              <div className="flex justify-between">
                <span className="text-muted">Quantity</span>
                <span className="font-medium">{order.totalQuantityKg.toLocaleString()} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Total Value</span>
                <span className="font-medium">₹{order.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Sources</span>
                <span className="font-medium">{order.listingIds.length} farmers</span>
              </div>
              <div className="pt-3 border-t border-border flex justify-between">
                <span className="text-muted">Order ID</span>
                <span className="text-xs font-mono text-muted">{order.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
