'use client';
import { useAppStore } from '@/lib/mock-data/store';
import { useTranslation } from '@/lib/i18n';
import { LineChart, Activity, ShieldCheck, ShoppingCart, Leaf, Coins, Truck, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  const { currentUser, orders } = useAppStore();
  const { t } = useTranslation();

  if (!currentUser) return null;

  return (
    <div className="space-y-6 md:space-y-8 pb-20 md:pb-8">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="page-title flex items-center gap-2 text-xl sm:text-2xl font-extrabold">
          <ShieldCheck className="w-6 h-6 text-primary"/> {t.docaTitle}
        </h1>
        <p className="text-muted mt-1 text-xs sm:text-sm font-medium">{t.docaSubtitle}</p>
      </div>

      {/* Impact Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card rounded-2xl flex flex-col gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-slate-600" />
            </div>
            <div className="text-sm font-bold text-muted">{t.totalOrders}</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-foreground">{orders.length}</div>
            <div className="text-xs text-muted mt-1">Platform total</div>
          </div>
        </div>

        <div className="stat-card rounded-2xl flex flex-col gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success-light flex items-center justify-center">
              <Leaf className="w-5 h-5 text-success" />
            </div>
            <div className="text-sm font-bold text-muted">{t.farmerIncomeBoost}</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-success">+18.5%</div>
            <div className="text-xs text-muted mt-1">vs traditional mandi</div>
          </div>
        </div>

        <div className="stat-card rounded-2xl flex flex-col gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning-light flex items-center justify-center">
              <Coins className="w-5 h-5 text-warning" />
            </div>
            <div className="text-sm font-bold text-muted">{t.consumerSavings}</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-accent">-12.3%</div>
            <div className="text-xs text-muted mt-1">vs retail average</div>
          </div>
        </div>

        <div className="stat-card rounded-2xl flex flex-col gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-info-light flex items-center justify-center">
              <Truck className="w-5 h-5 text-info" />
            </div>
            <div className="text-sm font-bold text-muted">{t.logisticsEmissions}</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-info">-22.4%</div>
            <div className="text-xs text-muted mt-1">via AI route optimization</div>
          </div>
        </div>
      </div>

      {/* Supply-Demand Overview Table */}
      <div className="section-card rounded-2xl shadow-xs overflow-x-auto">
        <h2 className="section-title mb-4 flex items-center gap-2 font-bold text-base">
          <Activity className="w-5 h-5 text-primary"/> {t.supplyDemandOverview}
        </h2>
        <div className="min-w-[600px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-xs text-muted uppercase tracking-wider font-bold">
                <th className="pb-3">{t.crop}</th>
                <th className="pb-3">{t.farmPriceAvg}</th>
                <th className="pb-3">{t.retailPriceAvg}</th>
                <th className="pb-3">{t.priceSpread}</th>
                <th className="pb-3">{t.supplyLevel}</th>
                <th className="pb-3">{t.demandLevel}</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-border">
              <tr>
                <td className="py-3 font-bold text-foreground">Tomato</td>
                <td className="py-3">₹22 / kg</td>
                <td className="py-3 font-semibold">₹42 / kg</td>
                <td className="py-3 text-error font-extrabold">+90.9%</td>
                <td className="py-3"><span className="badge-green">High</span></td>
                <td className="py-3"><span className="badge-amber">High</span></td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-foreground">Onion</td>
                <td className="py-3">₹18 / kg</td>
                <td className="py-3 font-semibold">₹30 / kg</td>
                <td className="py-3 text-warning font-extrabold">+66.7%</td>
                <td className="py-3"><span className="badge-amber">Moderate</span></td>
                <td className="py-3"><span className="badge-amber">Moderate</span></td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-foreground">Potato</td>
                <td className="py-3">₹12 / kg</td>
                <td className="py-3 font-semibold">₹20 / kg</td>
                <td className="py-3 text-warning font-extrabold">+66.7%</td>
                <td className="py-3"><span className="badge-green">High</span></td>
                <td className="py-3"><span className="badge-green">Low</span></td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-foreground">Green Chilli</td>
                <td className="py-3">₹45 / kg</td>
                <td className="py-3 font-semibold">₹80 / kg</td>
                <td className="py-3 text-error font-extrabold">+77.8%</td>
                <td className="py-3"><span className="badge-red">Low</span></td>
                <td className="py-3"><span className="badge-amber">High</span></td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-foreground">Cabbage</td>
                <td className="py-3">₹15 / kg</td>
                <td className="py-3 font-semibold">₹25 / kg</td>
                <td className="py-3 text-warning font-extrabold">+66.7%</td>
                <td className="py-3"><span className="badge-green">High</span></td>
                <td className="py-3"><span className="badge-green">Low</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Price Spread */}
        <div className="section-card rounded-2xl shadow-xs">
          <h2 className="section-title mb-4 flex items-center gap-2 font-bold text-base">
            <Activity className="w-5 h-5 text-primary"/> {t.regionalPriceSpread}
          </h2>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 gap-3 sm:gap-0">
              <div>
                <div className="font-bold text-foreground">Nashik, MH</div>
                <div className="text-xs text-muted flex items-center gap-2 mt-1">
                  <span className="badge-green">High Supply</span>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="text-right">
                  <div className="text-xs text-muted mb-0.5 font-semibold">{t.farmLabel}</div>
                  <div className="font-bold text-primary">₹20/kg</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted mb-0.5 font-semibold">{t.retailLabel}</div>
                  <div className="font-bold text-accent">₹35/kg</div>
                </div>
                <div className="text-right w-16">
                  <div className="text-xs text-muted mb-0.5 font-semibold">{t.spreadLabel}</div>
                  <div className="font-bold text-error">+75%</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 gap-3 sm:gap-0">
              <div>
                <div className="font-bold text-foreground">Pune, MH</div>
                <div className="text-xs text-muted flex items-center gap-2 mt-1">
                  <span className="badge-amber">Mod Supply</span>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="text-right">
                  <div className="text-xs text-muted mb-0.5 font-semibold">{t.farmLabel}</div>
                  <div className="font-bold text-primary">₹22/kg</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted mb-0.5 font-semibold">{t.retailLabel}</div>
                  <div className="font-bold text-accent">₹38/kg</div>
                </div>
                <div className="text-right w-16">
                  <div className="text-xs text-muted mb-0.5 font-semibold">{t.spreadLabel}</div>
                  <div className="font-bold text-error">+72%</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 gap-3 sm:gap-0">
              <div>
                <div className="font-bold text-foreground">Delhi NCR</div>
                <div className="text-xs text-muted flex items-center gap-2 mt-1">
                  <span className="badge-red">High Demand</span>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="text-right">
                  <div className="text-xs text-muted mb-0.5 font-semibold">{t.farmLabel}</div>
                  <div className="font-bold text-primary">₹28/kg</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted mb-0.5 font-semibold">{t.retailLabel}</div>
                  <div className="font-bold text-accent">₹50/kg</div>
                </div>
                <div className="text-right w-16">
                  <div className="text-xs text-muted mb-0.5 font-semibold">{t.spreadLabel}</div>
                  <div className="font-bold text-error">+78%</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 gap-3 sm:gap-0">
              <div>
                <div className="font-bold text-foreground">Bengaluru, KA</div>
                <div className="text-xs text-muted flex items-center gap-2 mt-1">
                  <span className="badge-amber">Mod Demand</span>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="text-right">
                  <div className="text-xs text-muted mb-0.5 font-semibold">{t.farmLabel}</div>
                  <div className="font-bold text-primary">₹25/kg</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted mb-0.5 font-semibold">{t.retailLabel}</div>
                  <div className="font-bold text-accent">₹45/kg</div>
                </div>
                <div className="text-right w-16">
                  <div className="text-xs text-muted mb-0.5 font-semibold">{t.spreadLabel}</div>
                  <div className="font-bold text-error">+80%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Price Forecast */}
        <div className="section-card rounded-2xl flex flex-col shadow-xs">
          <div className="flex items-start justify-between mb-4">
            <h2 className="section-title flex items-center gap-2 font-bold text-base">
              <LineChart className="w-5 h-5 text-primary"/> {t.aiPriceForecastModel}
            </h2>
            <span className="badge-blue text-[10px] md:text-xs font-semibold">Model v2.4</span>
          </div>
          
          <div className="flex-1 min-h-[220px] bg-slate-50 rounded-xl border border-slate-200 relative overflow-hidden p-4 flex flex-col justify-end">
            <div className="w-full flex items-end justify-between px-2 sm:px-6 pt-10">
               {[1, 2, 3, 4, 5, 6, 7].map((day, i) => (
                 <div key={day} className="flex flex-col items-center gap-2">
                   <div className="w-6 sm:w-8 flex flex-col justify-end relative h-32">
                     <div className="absolute bottom-0 w-full bg-accent/20 rounded-t" style={{ height: `${60 + Math.sin(i)*20}%` }}></div>
                     <div className="absolute bottom-0 w-full bg-primary rounded-t shadow-xs" style={{ height: `${30 + Math.cos(i)*10}%` }}></div>
                   </div>
                   <div className="text-xs font-bold text-muted">D+{day}</div>
                 </div>
               ))}
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-xs font-medium justify-center flex-wrap">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-xs"></div> {t.predictedFarmPrice}</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-accent/30 rounded-xs"></div> {t.predictedRetailPrice}</div>
          </div>
        </div>
      </div>
      
      {/* Price Stabilization Metrics */}
      <div className="section-card rounded-2xl shadow-xs">
        <h2 className="section-title mb-4 font-bold text-base">{t.priceStabilizationMetrics}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xs font-semibold text-muted mb-1">{t.spreadReduction}</div>
            <div className="text-2xl font-extrabold text-success">-15.2%</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xs font-semibold text-muted mb-1">{t.directTradeVol}</div>
            <div className="text-2xl font-extrabold text-foreground">45,000 <span className="text-sm font-normal text-muted">{t.kg}</span></div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xs font-semibold text-muted mb-1">{t.activeFarmers}</div>
            <div className="text-2xl font-extrabold text-foreground">234</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xs font-semibold text-muted mb-1">{t.activeBuyers}</div>
            <div className="text-2xl font-extrabold text-foreground">45</div>
          </div>
        </div>
      </div>

      {/* Market Alert */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex gap-3 items-start shadow-xs">
        <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-amber-900 flex items-center gap-2 text-sm">{t.marketAlertTitle}</h3>
          <p className="text-amber-800 text-xs sm:text-sm mt-1 leading-relaxed">{t.marketAlertDesc}</p>
        </div>
      </div>

    </div>
  );
}
