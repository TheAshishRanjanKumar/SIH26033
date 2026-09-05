'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/mock-data/store';
import {
  Sprout, LayoutDashboard, ShoppingBasket, BarChart3,
  User as UserIcon, LogOut, Package, Users
} from 'lucide-react';
import { useState } from 'react';

const farmerNav = [
  { label: 'Dashboard', href: '/dashboard/farmer', icon: LayoutDashboard },
  { label: 'Marketplace', href: '/dashboard/buyer', icon: ShoppingBasket },
  { label: 'Demand Forecast', href: '/forecast', icon: BarChart3 },
];

const fpoNav = [
  { label: 'FPO Dashboard', href: '/dashboard/fpo', icon: LayoutDashboard },
  { label: 'Marketplace', href: '/dashboard/buyer', icon: ShoppingBasket },
  { label: 'Demand Forecast', href: '/forecast', icon: BarChart3 },
];

const buyerNav = [
  { label: 'Marketplace', href: '/dashboard/buyer', icon: ShoppingBasket },
  { label: 'Demand Forecast', href: '/forecast', icon: BarChart3 },
];

const adminNav = [
  { label: 'DoCA Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
  { label: 'Demand Forecast', href: '/forecast', icon: BarChart3 },
];

export default function Sidebar() {
  const { currentUser, setCurrentUser } = useAppStore();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!currentUser) return null;

  const nav = currentUser.role === 'FARMER' ? farmerNav
    : currentUser.role === 'FPO' ? fpoNav
    : currentUser.role === 'BUYER' ? buyerNav
    : adminNav;

  const handleLogout = () => {
    setCurrentUser(null);
    router.push('/');
  };

  const roleLabel = currentUser.role === 'FARMER' ? 'Farmer'
    : currentUser.role === 'FPO' ? 'FPO Aggregator'
    : currentUser.role === 'BUYER' ? 'Bulk Buyer'
    : 'DoCA Admin';

  const roleBadgeColor = currentUser.role === 'FARMER' ? 'bg-success-light text-success'
    : currentUser.role === 'FPO' ? 'bg-purple-100 text-purple-700'
    : currentUser.role === 'BUYER' ? 'bg-accent-light text-accent'
    : 'bg-info-light text-info';

  const SidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-border">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Sprout className="w-6 h-6" />
          <span>AgriDirect</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {nav.map(item => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
            <UserIcon className="w-5 h-5 text-slate-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground truncate">{currentUser.name}</div>
            <div className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-0.5 ${roleBadgeColor}`}>
              {roleLabel}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0">
        {SidebarContent}
      </aside>

      {/* Mobile Toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-[60]">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        >
          <LayoutDashboard className={`w-5 h-5 transition-transform duration-300 ${mobileOpen ? 'rotate-90 opacity-0 absolute' : 'rotate-0 opacity-100'}`} />
          <div className={`w-5 h-5 relative transition-transform duration-300 ${mobileOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0 absolute'}`}>
            <span className="absolute block w-5 h-0.5 bg-white top-2 left-0 rotate-45"></span>
            <span className="absolute block w-5 h-0.5 bg-white top-2 left-0 -rotate-45"></span>
          </div>
        </button>
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setMobileOpen(false)}>
          <div className="w-64 h-full bg-white shadow-2xl transition-transform transform translate-x-0" onClick={e => e.stopPropagation()}>
            {SidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
