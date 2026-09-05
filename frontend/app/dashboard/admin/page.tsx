'use client';
import { useAppStore } from '@/lib/mock-data/store';
import { LineChart, Activity, ShieldCheck, ShoppingCart, Leaf, Coins, Truck, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  const { currentUser, orders } = useAppStore();

  if (!currentUser) return null;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="page-title flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-primary"/> Price Intelligence & Impact
        </h1>
        <p className="text-muted mt-1 text-sm md:text-base">Department of Consumer Affairs — Market Monitoring</p>
      </div>

      {/* Impact Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-slate-600" />
            </div>
            <div className="text-sm font-medium text-muted">Total Orders</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold">{orders.length}</div>
            <div className="text-xs text-muted mt-1">Platform total</div>
          </div>
        </div>

        <div className="stat-card flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-success-light flex items-center justify-center">
              <Leaf className="w-5 h-5 text-success" />
            </div>
            <div className="text-sm font-medium text-muted">Farmer Income Boost</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-success">+18.5%</div>
            <div className="text-xs text-muted mt-1">vs traditional mandi</div>
          </div>
        </div>

        <div className="stat-card flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-warning-light flex items-center justify-center">
              <Coins className="w-5 h-5 text-warning" />
            </div>
            <div className="text-sm font-medium text-muted">Consumer Savings</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-accent">-12.3%</div>
            <div className="text-xs text-muted mt-1">vs retail average</div>
          </div>
        </div>

        <div className="stat-card flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-info-light flex items-center justify-center">
              <Truck className="w-5 h-5 text-info" />
            </div>
            <div className="text-sm font-medium text-muted">Logistics Emissions</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-info">-22.4%</div>
            <div className="text-xs text-muted mt-1">via AI route optimization</div>
          </div>
        </div>
      </div>

      {/* Supply-Demand Overview Table */}
      <div className="section-card overflow-x-auto">
        <h2 className="section-title mb-4 flex items-center gap-2"><Activity className="w-5 h-5"/> Supply-Demand Overview</h2>
        <div className="min-w-[600px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-sm text-muted">
                <th className="pb-3 font-medium">Crop</th>
                <th className="pb-3 font-medium">Farm Price (avg)</th>
                <th className="pb-3 font-medium">Retail Price (avg)</th>
                <th className="pb-3 font-medium">Spread %</th>
                <th className="pb-3 font-medium">Supply Level</th>
                <th className="pb-3 font-medium">Demand Level</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-border">
              <tr>
                <td className="py-3 font-medium text-foreground">Tomato</td>
                <td className="py-3">₹22 / kg</td>
                <td className="py-3">₹42 / kg</td>
                <td className="py-3 text-error font-medium">+90.9%</td>
                <td className="py-3"><span className="badge-green">High</span></td>
                <td className="py-3"><span className="badge-amber">High</span></td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-foreground">Onion</td>
                <td className="py-3">₹18 / kg</td>
                <td className="py-3">₹30 / kg</td>
                <td className="py-3 text-warning font-medium">+66.7%</td>
                <td className="py-3"><span className="badge-amber">Moderate</span></td>
                <td className="py-3"><span className="badge-amber">Moderate</span></td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-foreground">Potato</td>
                <td className="py-3">₹12 / kg</td>
                <td className="py-3">₹20 / kg</td>
                <td className="py-3 text-warning font-medium">+66.7%</td>
                <td className="py-3"><span className="badge-green">High</span></td>
                <td className="py-3"><span className="badge-green">Low</span></td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-foreground">Green Chilli</td>
                <td className="py-3">₹45 / kg</td>
                <td className="py-3">₹80 / kg</td>
                <td className="py-3 text-error font-medium">+77.8%</td>
                <td className="py-3"><span className="badge-red">Low</span></td>
                <td className="py-3"><span className="badge-amber">High</span></td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-foreground">Cabbage</td>
                <td className="py-3">₹15 / kg</td>
                <td className="py-3">₹25 / kg</td>
                <td className="py-3 text-warning font-medium">+66.7%</td>
                <td className="py-3"><span className="badge-green">High</span></td>
                <td className="py-3"><span className="badge-green">Low</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Price Spread */}
        <div className="section-card">
          <h2 className="section-title mb-4 flex items-center gap-2"><Activity className="w-5 h-5"/> Regional Price Spread (Tomato)</h2>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 gap-3 sm:gap-0">
              <div>
                <div className="font-semibold text-foreground">Nashik, MH</div>
                <div className="text-xs text-muted flex items-center gap-2 mt-1">
                  <span className="badge-green">High Supply</span>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="text-right">
                  <div className="text-xs text-muted mb-0.5">Farm</div>
                  <div className="font-bold text-primary">₹20/kg</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted mb-0.5">Retail</div>
                  <div className="font-bold text-accent">₹35/kg</div>
                </div>
                <div className="text-right w-16">
                  <div className="text-xs text-muted mb-0.5">Spread</div>
                  <div className="font-bold text-error">+75%</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 gap-3 sm:gap-0">
              <div>
                <div className="font-semibold text-foreground">Pune, MH</div>
                <div className="text-xs text-muted flex items-center gap-2 mt-1">
                  <span className="badge-amber">Mod Supply</span>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="text-right">
                  <div className="text-xs text-muted mb-0.5">Farm</div>
                  <div className="font-bold text-primary">₹22/kg</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted mb-0.5">Retail</div>
                  <div className="font-bold text-accent">₹38/kg</div>
                </div>
                <div className="text-right w-16">
                  <div className="text-xs text-muted mb-0.5">Spread</div>
                  <div className="font-bold text-error">+72%</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 gap-3 sm:gap-0">
              <div>
                <div className="font-semibold text-foreground">Delhi NCR</div>
                <div className="text-xs text-muted flex items-center gap-2 mt-1">
                  <span className="badge-red">High Demand</span>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="text-right">
                  <div className="text-xs text-muted mb-0.5">Farm</div>
                  <div className="font-bold text-primary">₹28/kg</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted mb-0.5">Retail</div>
                  <div className="font-bold text-accent">₹50/kg</div>
                </div>
                <div className="text-right w-16">
                  <div className="text-xs text-muted mb-0.5">Spread</div>
                  <div className="font-bold text-error">+78%</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 gap-3 sm:gap-0">
              <div>
                <div className="font-semibold text-foreground">Bengaluru, KA</div>
                <div className="text-xs text-muted flex items-center gap-2 mt-1">
                  <span className="badge-amber">Mod Demand</span>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="text-right">
                  <div className="text-xs text-muted mb-0.5">Farm</div>
                  <div className="font-bold text-primary">₹25/kg</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted mb-0.5">Retail</div>
                  <div className="font-bold text-accent">₹45/kg</div>
                </div>
                <div className="text-right w-16">
                  <div className="text-xs text-muted mb-0.5">Spread</div>
                  <div className="font-bold text-error">+80%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Price Forecast */}
        <div className="section-card flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <h2 className="section-title flex items-center gap-2"><LineChart className="w-5 h-5"/> AI Price Forecast</h2>
            <span className="badge-blue text-[10px] md:text-xs">Model estimate</span>
          </div>
          
          <div className="flex-1 min-h-[220px] bg-slate-50 rounded-lg border border-slate-200 relative overflow-hidden p-4 flex flex-col justify-end">
            {/* Simple mock chart visualization using CSS */}
            <div className="w-full flex items-end justify-between px-2 sm:px-6 pt-10">
               {[1, 2, 3, 4, 5, 6, 7].map((day, i) => (
                 <div key={day} className="flex flex-col items-center gap-2">
                   <div className="w-6 sm:w-8 flex flex-col justify-end relative h-32">
                     {/* Retail price bar (taller, background) */}
                     <div className="absolute bottom-0 w-full bg-accent/20 rounded-t" style={{ height: `${60 + Math.sin(i)*20}%` }}></div>
                     {/* Farm price bar (shorter, foreground) */}
                     <div className="absolute bottom-0 w-full bg-primary rounded-t" style={{ height: `${30 + Math.cos(i)*10}%` }}></div>
                   </div>
                   <div className="text-xs text-muted">D+{day}</div>
                 </div>
               ))}
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-sm justify-center">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-sm"></div> Predicted Farm Price</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-accent/20 rounded-sm"></div> Predicted Retail Price</div>
          </div>
        </div>
      </div>
      
      {/* Price Stabilization Metrics */}
      <div className="section-card">
        <h2 className="section-title mb-4">Price Stabilization Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-sm text-muted mb-1">Spread Reduction</div>
            <div className="text-2xl font-bold text-success">-15.2%</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-sm text-muted mb-1">Direct Trade Vol</div>
            <div className="text-2xl font-bold text-foreground">45,000 <span className="text-base font-normal text-muted">kg</span></div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-sm text-muted mb-1">Active Farmers</div>
            <div className="text-2xl font-bold text-foreground">234</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-sm text-muted mb-1">Active Buyers</div>
            <div className="text-2xl font-bold text-foreground">45</div>
          </div>
        </div>
      </div>

      {/* Market Alert */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3 items-start">
        <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-amber-800 flex items-center gap-2">Market Alert</h3>
          <p className="text-amber-700 text-sm mt-1">Tomato supply in Maharashtra is projected to exceed demand by 15% next week. Suggesting FPOs to route excess supply to MP/UP borders to stabilize prices.</p>
        </div>
      </div>

    </div>
  );
}
