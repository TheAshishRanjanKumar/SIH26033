'use client';
import { useAppStore } from '@/lib/mock-data/store';
import { useState } from 'react';
import { Plus, TrendingUp, Package, IndianRupee, Truck, Star, Sparkles } from 'lucide-react';
import { Listing } from '@/lib/mock-data/types';

export default function FarmerDashboard() {
  const { currentUser, listings, addListing } = useAppStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newListing, setNewListing] = useState({ crop: '', grade: 'A' as const, quantityKg: 0, pricePerKg: 0 });

  if (!currentUser) return null;

  const myListings = listings.filter(l => l.farmerId === currentUser.id);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const l: Listing = {
      id: `l_${Date.now()}`,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      crop: newListing.crop,
      grade: newListing.grade,
      pricePerKg: newListing.pricePerKg,
      quantityKg: newListing.quantityKg,
      location: currentUser.location || 'Unknown'
    };
    addListing(l);
    setShowAddForm(false);
    setNewListing({ crop: '', grade: 'A', quantityKg: 0, pricePerKg: 0 });
  };

  const estValue = myListings.reduce((sum, l) => sum + (l.pricePerKg * l.quantityKg), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-muted text-slate-500 mt-1">{currentUser.name} • {currentUser.location || 'Unknown Location'}</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card flex items-center p-4 bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-4">
            <Package className="w-5 h-5"/>
          </div>
          <div>
            <div className="text-muted text-xs uppercase tracking-wide text-slate-500 mb-1">Active Listings</div>
            <div className="text-2xl font-semibold text-slate-900">{myListings.length}</div>
          </div>
        </div>
        <div className="stat-card flex items-center p-4 bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mr-4">
            <IndianRupee className="w-5 h-5"/>
          </div>
          <div>
            <div className="text-muted text-xs uppercase tracking-wide text-slate-500 mb-1">Estimated Value</div>
            <div className="text-2xl font-semibold text-slate-900">₹{estValue.toLocaleString()}</div>
          </div>
        </div>
        <div className="stat-card flex items-center p-4 bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
            <Truck className="w-5 h-5"/>
          </div>
          <div>
            <div className="text-muted text-xs uppercase tracking-wide text-slate-500 mb-1">Orders Fulfilled</div>
            <div className="text-2xl font-semibold text-slate-900">12</div>
          </div>
        </div>
        <div className="stat-card flex items-center p-4 bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600 mr-4">
            <Star className="w-5 h-5"/>
          </div>
          <div>
            <div className="text-muted text-xs uppercase tracking-wide text-slate-500 mb-1">Average Rating</div>
            <div className="text-2xl font-semibold text-slate-900">4.8</div>
          </div>
        </div>
      </div>

      {/* Market Intelligence */}
      <div className="section-card bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-primary/5 p-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="section-title flex items-center gap-2 m-0 text-primary font-semibold">
            <Sparkles className="w-5 h-5"/> AI Market Intelligence
          </h2>
          <span className="badge-slate text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md border border-slate-200">Model estimate</span>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="text-muted text-xs uppercase tracking-wide text-slate-500 mb-1">Recommended Crop</div>
              <div className="text-lg font-semibold text-slate-900">Tomato (Grade A)</div>
            </div>
            <div>
              <div className="text-muted text-xs uppercase tracking-wide text-slate-500 mb-1">Expected Demand</div>
              <div className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <span className="badge-green bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm font-medium">High</span> <span className="text-sm font-normal text-slate-500">(Next 14 days)</span>
              </div>
            </div>
            <div>
              <div className="text-muted text-xs uppercase tracking-wide text-slate-500 mb-1">Suggested Price</div>
              <div className="text-lg font-semibold text-slate-900">₹22 - ₹25 / kg</div>
            </div>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="section-card bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="section-title text-lg font-bold text-slate-900 m-0">My Produce Listings</h2>
          <button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition text-sm font-medium">
            <Plus className="w-4 h-4" /> Add Listing
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddSubmit} className="mb-6 bg-slate-50 p-5 rounded-lg border border-slate-200">
            <h3 className="text-sm font-semibold mb-4 text-slate-800">Add New Produce</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="label-text block text-xs font-semibold mb-1.5 text-slate-700">Crop</label>
                <input required className="input-field w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="e.g. Tomato" value={newListing.crop} onChange={e => setNewListing({...newListing, crop: e.target.value})} />
              </div>
              <div>
                <label className="label-text block text-xs font-semibold mb-1.5 text-slate-700">Grade</label>
                <select className="select-field w-full border border-slate-300 rounded-lg p-2 text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={newListing.grade} onChange={e => setNewListing({...newListing, grade: e.target.value as any})}>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>
              </div>
              <div>
                <label className="label-text block text-xs font-semibold mb-1.5 text-slate-700">Quantity (kg)</label>
                <input required type="number" min="1" className="input-field w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={newListing.quantityKg || ''} onChange={e => setNewListing({...newListing, quantityKg: parseInt(e.target.value) || 0})} />
              </div>
              <div>
                <label className="label-text block text-xs font-semibold mb-1.5 text-slate-700">Price (₹/kg)</label>
                <input required type="number" min="1" className="input-field w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={newListing.pricePerKg || ''} onChange={e => setNewListing({...newListing, pricePerKg: parseInt(e.target.value) || 0})} />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button type="submit" className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition text-sm font-semibold">Save Listing</button>
            </div>
          </form>
        )}

        {myListings.length === 0 ? (
          <div className="text-center text-slate-500 py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
            <Package className="w-8 h-8 mx-auto mb-3 text-slate-400" />
            <p>You haven't listed any produce yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 border-y border-slate-200">
                <tr>
                  <th className="p-3 font-semibold">Crop</th>
                  <th className="p-3 font-semibold">Grade</th>
                  <th className="p-3 font-semibold">Quantity</th>
                  <th className="p-3 font-semibold">Price</th>
                  <th className="p-3 font-semibold">Location</th>
                  <th className="p-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {myListings.map(l => (
                  <tr key={l.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-3 font-medium text-slate-900">{l.crop}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                        {l.grade}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">{l.quantityKg} kg</td>
                    <td className="p-3 font-medium text-slate-900">₹{l.pricePerKg} <span className="text-slate-500 text-xs font-normal">/ kg</span></td>
                    <td className="p-3 text-slate-600">{l.location}</td>
                    <td className="p-3">
                      <span className="badge-green bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-medium border border-green-200">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
