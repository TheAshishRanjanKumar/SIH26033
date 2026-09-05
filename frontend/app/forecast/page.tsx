'use client';
import { useAppStore } from '@/lib/mock-data/store';
import { BarChart3, Info, TrendingUp, Lightbulb, Layers } from 'lucide-react';
import { useState } from 'react';

const forecastData: Record<string, number[]> = {
  Tomato:  [42, 48, 45, 52, 68, 75, 82],
  Onion:   [55, 60, 58, 50, 45, 40, 38],
  Potato:  [30, 35, 38, 42, 55, 60, 65],
};

const demandLevel: Record<string, { level: string; badge: string; change: string }> = {
  Tomato:  { level: 'High', badge: 'badge-green', change: '+15%' },
  Onion:   { level: 'Declining', badge: 'badge-red', change: '-12%' },
  Potato:  { level: 'Rising', badge: 'badge-amber', change: '+8%' },
};

export default function ForecastPage() {
  const { currentUser } = useAppStore();
  const [crop, setCrop] = useState('Tomato');
  const [region, setRegion] = useState('Maharashtra');

  if (!currentUser) return null;

  const data = forecastData[crop] || forecastData.Tomato;
  const maxVal = Math.max(...data);
  const demand = demandLevel[crop] || demandLevel.Tomato;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Demand & Price Forecast</h1>
        <p className="text-sm text-muted mt-1">AI-powered market predictions based on historical mandi data</p>
      </div>

      {/* Selectors */}
      <div className="section-card flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="label-text">Crop</label>
          <select value={crop} onChange={e => setCrop(e.target.value)} className="select-field w-full">
            <option>Tomato</option>
            <option>Onion</option>
            <option>Potato</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="label-text">Region</label>
          <select value={region} onChange={e => setRegion(e.target.value)} className="select-field w-full">
            <option>Maharashtra</option>
            <option>Karnataka</option>
            <option>Delhi NCR</option>
          </select>
        </div>
        <div className="flex items-end">
          <span className="badge-slate text-xs flex items-center gap-1 h-fit">
            <Info className="w-3 h-3" /> Model estimate
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 section-card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" /> Historical vs Forecast
            </h2>
            <div className="flex items-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-slate-300 inline-block" /> Historical</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-accent inline-block" /> Forecast</span>
            </div>
          </div>

          <div className="relative">
            <div className="text-[10px] text-muted absolute -top-1 right-0">* Based on historical market data</div>
            <div className="flex items-end justify-between gap-2 h-56 pt-6">
              {data.map((val, i) => {
                const isForecast = i >= 4;
                const height = (val / maxVal) * 100;
                const labels = ['W-3', 'W-2', 'W-1', 'Now', 'F+1', 'F+2', 'F+3'];
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="text-[10px] font-medium text-muted">{val}%</div>
                    <div className="w-full max-w-10 relative" style={{ height: `${height}%` }}>
                      <div className={`absolute inset-0 rounded-t ${isForecast ? 'bg-accent/80' : 'bg-slate-300'} transition-all`} />
                    </div>
                    <div className={`text-[11px] font-medium ${isForecast ? 'text-accent' : 'text-muted'}`}>{labels[i]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Demand overview */}
          <div className="section-card">
            <h2 className="section-title flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-primary" /> Demand Overview
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Level</span>
                <span className={demand.badge}>{demand.level}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">7-day Change</span>
                <span className="text-sm font-semibold text-foreground">{demand.change}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Confidence</span>
                <span className="text-sm font-semibold text-foreground">87%</span>
              </div>
            </div>
          </div>

          {/* Prediction factors */}
          <div className="section-card">
            <h2 className="section-title flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-muted" /> Prediction Factors
            </h2>
            <div className="space-y-2.5">
              {[
                { label: 'Historical Demand', value: 'High', color: 'bg-success' },
                { label: 'Mandi Prices', value: 'Stable', color: 'bg-accent' },
                { label: 'Seasonality', value: 'Peak', color: 'bg-info' },
                { label: 'Regional Supply', value: 'Moderate', color: 'bg-primary' },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted">
                    <span className={`w-2 h-2 rounded-full ${f.color}`} />
                    {f.label}
                  </span>
                  <span className="font-medium text-foreground">{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="section-card bg-primary-light border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              <h2 className="section-title text-primary">Recommendation</h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Demand for <strong>{crop}</strong> in <strong>{region}</strong> is expected to rise by {demand.change} over the next 7 days.
              Consider listing at ₹22–25/kg to match projected buyer willingness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
