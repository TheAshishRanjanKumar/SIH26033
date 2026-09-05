import { create } from 'zustand';
import { Listing, RFQ, Order, User } from './types';
import { mockUsers, initialListings, initialRFQs, initialOrders } from './seed';

interface AppState {
  currentUser: User | null;
  listings: Listing[];
  rfqs: RFQ[];
  orders: Order[];
  
  setCurrentUser: (user: User | null) => void;
  addListing: (listing: Listing) => void;
  addRFQ: (rfq: RFQ) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateRFQStatus: (rfqId: string, status: RFQ['status']) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: null, // Start logged out
  listings: [...initialListings],
  rfqs: [...initialRFQs],
  orders: [...initialOrders],

  setCurrentUser: (user) => set({ currentUser: user }),
  addListing: (listing) => set((state) => ({ listings: [...state.listings, listing] })),
  addRFQ: (rfq) => set((state) => ({ rfqs: [...state.rfqs, rfq] })),
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o)
  })),
  updateRFQStatus: (rfqId, status) => set((state) => ({
    rfqs: state.rfqs.map(r => r.id === rfqId ? { ...r, status } : r)
  }))
}));
