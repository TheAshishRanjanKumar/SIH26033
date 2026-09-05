'use client';
import { useAppStore } from '@/lib/mock-data/store';
import { Users, PackageOpen, FileText, CheckCircle2, TrendingUp, Filter } from 'lucide-react';
import { useState } from 'react';

export default function FPODashboard() {
  const { currentUser, listings, rfqs } = useAppStore();
  const [filter, setFilter] = useState('ALL');

  if (!currentUser || currentUser.role !== 'FPO') return null;

  // Mock member farmers for the FPO
  const fpoFarmers = ['Ramesh Patel', 'Suresh Kumar', 'MahaAgri Member 1', 'MahaAgri Member 2'];
  
  // Get listings belonging to farmers in this FPO
  const memberListings = listings.filter(l => fpoFarmers.includes(l.farmerName));
  
  // Aggregate inventory
  const aggregatedInventory = memberListings.reduce((acc, curr) => {
    const key = `${curr.crop}_${curr.grade}`;
    if (!acc[key]) {
      acc[key] = { crop: curr.crop, grade: curr.grade, totalQuantity: 0, avgPrice: 0, count: 0 };
    }
    acc[key].totalQuantity += curr.quantityKg;
    acc[key].avgPrice += curr.pricePerKg;
    acc[key].count += 1;
    return acc;
  }, {} as Record<string, { crop: string; grade: string; totalQuantity: number; avgPrice: number; count: number }>);

  const inventoryItems = Object.values(aggregatedInventory).map(item => ({
    ...item,
    avgPrice: Math.round(item.avgPrice / item.count)
  }));

  const totalVolume = inventoryItems.reduce((s, i) => s + i.totalQuantity, 0);
  const totalValue = inventoryItems.reduce((s, i) => s + (i.totalQuantity * i.avgPrice), 0);

  const activeRFQs = rfqs.filter(r => r.status === 'OPEN');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">FPO Operations Dashboard</h1>
        <p className="text-muted text-sm mt-1">{currentUser.name} • Managing {fpoFarmers.length} Farmers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card flex items-center p-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-4 shrink-0">
            <Users className="w-5 h-5"/>
          </div>
          <div>
            <div className="text-muted text-xs uppercase tracking-wide mb-1">Member Farmers</div>
            <div className="text-2xl font-semibold text-foreground">{fpoFarmers.length}</div>
          </div>
        </div>
        <div className="stat-card flex items-center p-4">
          <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center text-primary mr-4 shrink-0">
            <PackageOpen className="w-5 h-5"/>
          </div>
          <div>
            <div className="text-muted text-xs uppercase tracking-wide mb-1">Aggregated Volume</div>
            <div className="text-2xl font-semibold text-foreground">{totalVolume.toLocaleString()} kg</div>
          </div>
        </div>
        <div className="stat-card flex items-center p-4">
          <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center text-accent mr-4 shrink-0">
            <FileText className="w-5 h-5"/>
          </div>
          <div>
            <div className="text-muted text-xs uppercase tracking-wide mb-1">Open RFQs</div>
            <div className="text-2xl font-semibold text-foreground">{activeRFQs.length}</div>
          </div>
        </div>
        <div className="stat-card flex items-center p-4">
          <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center text-success mr-4 shrink-0">
            <TrendingUp className="w-5 h-5"/>
          </div>
          <div>
            <div className="text-muted text-xs uppercase tracking-wide mb-1">Projected Value</div>
            <div className="text-2xl font-semibold text-foreground">₹{totalValue.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Aggregated Inventory */}
        <div className="lg:col-span-2 space-y-6">
          <div className="section-card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="section-title">Aggregated Inventory</h2>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted" />
                <select className="select-field text-xs py-1.5" value={filter} onChange={e => setFilter(e.target.value)}>
                  <option value="ALL">All Crops</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Onion">Onion</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-600 border-y border-border">
                  <tr>
                    <th className="p-3 font-semibold">Crop</th>
                    <th className="p-3 font-semibold">Grade</th>
                    <th className="p-3 font-semibold">Pooled Quantity</th>
                    <th className="p-3 font-semibold">Avg Price</th>
                    <th className="p-3 font-semibold">Contributors</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inventoryItems.filter(i => filter === 'ALL' || i.crop === filter).map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition">
                      <td className="p-3 font-medium text-foreground">{item.crop}</td>
                      <td className="p-3">
                        <span className="badge-slate border border-slate-200">
                          {item.grade}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-primary">{item.totalQuantity.toLocaleString()} kg</td>
                      <td className="p-3 text-muted">₹{item.avgPrice}/kg</td>
                      <td className="p-3">
                        <span className="badge-green">{item.count} farmers</span>
                      </td>
                    </tr>
                  ))}
                  {inventoryItems.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-muted">
                        No inventory pooled yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Member Farmers */}
          <div className="section-card">
            <h2 className="section-title mb-4">Member Farmers Activity</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fpoFarmers.map((farmer, i) => {
                const fListings = memberListings.filter(l => l.farmerName === farmer);
                const activeCount = fListings.length;
                return (
                  <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg bg-slate-50">
                    <div>
                      <div className="font-medium text-sm text-foreground">{farmer}</div>
                      <div className="text-xs text-muted mt-0.5">{activeCount} active listings</div>
                    </div>
                    {activeCount > 0 ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Market Opportunities / RFQs */}
        <div className="space-y-6">
          <div className="section-card bg-accent-light/30 border-accent/20">
            <h2 className="section-title text-accent-dark mb-4">Market Opportunities (RFQs)</h2>
            <div className="space-y-3">
              {activeRFQs.map(rfq => {
                const matchingInventory = inventoryItems.find(i => i.crop === rfq.crop && i.grade === rfq.grade);
                const canFulfill = matchingInventory && matchingInventory.totalQuantity >= rfq.quantityKg;
                
                return (
                  <div key={rfq.id} className="bg-white p-3 rounded-lg border border-accent/10 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-sm">{rfq.crop} <span className="text-xs font-normal text-muted">({rfq.grade})</span></div>
                        <div className="text-xs text-muted">{rfq.buyerName}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-accent">{rfq.quantityKg.toLocaleString()} kg</div>
                        <div className="text-xs text-muted">@ ₹{rfq.targetPricePerKg}/kg</div>
                      </div>
                    </div>
                    
                    {canFulfill ? (
                      <button className="w-full btn-primary py-1.5 text-xs">
                        Fulfill Order
                      </button>
                    ) : (
                      <button disabled className="w-full bg-slate-100 text-slate-400 py-1.5 rounded-lg text-xs font-medium cursor-not-allowed">
                        Insufficient Pool (Need {rfq.quantityKg.toLocaleString()}kg)
                      </button>
                    )}
                  </div>
                );
              })}
              {activeRFQs.length === 0 && (
                <div className="text-center py-6 text-muted text-sm">
                  No active bulk requests right now.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
