'use client';
import { useAppStore } from '@/lib/mock-data/store';
import { mockUsers } from '@/lib/mock-data/seed';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Sprout, Tractor, ShoppingCart, Shield, ArrowRight } from 'lucide-react';

const roleConfig: Record<string, { icon: typeof Tractor; color: string; bg: string; label: string }> = {
  FARMER: { icon: Tractor, color: 'text-success', bg: 'bg-success-light', label: 'Farmer' },
  FPO: { icon: Tractor, color: 'text-purple-600', bg: 'bg-purple-100', label: 'FPO / Aggregator' },
  BUYER: { icon: ShoppingCart, color: 'text-accent', bg: 'bg-accent-light', label: 'Bulk Buyer' },
  ADMIN: { icon: Shield, color: 'text-info', bg: 'bg-info-light', label: 'DoCA Admin' },
};

export default function LoginPage() {
  const { currentUser, setCurrentUser } = useAppStore();
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleLogin = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setLoadingId(userId);
      setCurrentUser(user);
      // Route immediately instead of waiting for useEffect
      if (user.role === 'FARMER') router.push('/dashboard/farmer');
      else if (user.role === 'FPO') router.push('/dashboard/fpo');
      else if (user.role === 'BUYER') router.push('/dashboard/buyer');
      else router.push('/dashboard/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative z-10">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
            <Sprout className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">AgriDirect</h1>
          <p className="text-sm text-muted mt-1.5">Connecting farmers directly with buyers</p>
        </div>

        {/* Card */}
        <div className="section-card">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-foreground">Select a persona</h2>
            <p className="text-xs text-muted mt-0.5">Choose a demo role to explore the platform</p>
          </div>

          <div className="space-y-2.5">
            {mockUsers.map(user => {
              const config = roleConfig[user.role];
              const Icon = config?.icon || Shield;
              const isPushed = loadingId === user.id;
              
              return (
                <button
                  key={user.id}
                  onClick={() => handleLogin(user.id)}
                  className={`w-full flex items-center gap-3.5 p-3.5 border rounded-lg transition-all group text-left ${
                    isPushed ? 'border-primary bg-primary/5 opacity-75' : 'border-border hover:border-primary/40 hover:bg-slate-50'
                  }`}
                  disabled={loadingId !== null}
                >
                  <div className={`w-10 h-10 rounded-lg ${config?.bg} flex items-center justify-center shrink-0`}>
                    {isPushed ? (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Icon className={`w-5 h-5 ${config?.color}`} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">{user.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`badge ${config?.bg} ${config?.color} text-[10px]`}>{config?.label}</span>
                      {user.location && <span className="text-xs text-muted">· {user.location}</span>}
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-colors shrink-0 ${isPushed ? 'text-primary translate-x-1' : 'text-slate-300 group-hover:text-primary'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted mt-6">
          Demo Mode — SIH 2026 · Problem Statement 26033
        </p>
      </div>
    </div>
  );
}
