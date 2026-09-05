import { useAppStore } from '../mock-data/store';
import { Listing, RFQ, Order } from '../mock-data/types';

// These functions wrap the Zustand store to simulate async API calls.
// In a real app, these would be fetch/axios calls to FastAPI.

export const api = {
  getListings: async () => {
    return useAppStore.getState().listings;
  },
  
  createListing: async (listingData: Omit<Listing, 'id'>) => {
    const newListing: Listing = {
      ...listingData,
      id: `l_${Date.now()}`
    };
    useAppStore.getState().addListing(newListing);
    return newListing;
  },

  getRFQs: async () => {
    return useAppStore.getState().rfqs;
  },

  createRFQ: async (rfqData: Omit<RFQ, 'id' | 'status'>) => {
    const newRFQ: RFQ = {
      ...rfqData,
      id: `r_${Date.now()}`,
      status: 'OPEN'
    };
    useAppStore.getState().addRFQ(newRFQ);
    return newRFQ;
  },

  getOrders: async () => {
    return useAppStore.getState().orders;
  },

  createOrder: async (orderData: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `o_${Date.now()}`,
      status: 'PLACED',
      createdAt: new Date().toISOString()
    };
    useAppStore.getState().addOrder(newOrder);
    if (newOrder.rfqId) {
      useAppStore.getState().updateRFQStatus(newOrder.rfqId, 'MATCHED');
    }
    return newOrder;
  },

  updateOrderStatus: async (orderId: string, status: Order['status']) => {
    useAppStore.getState().updateOrderStatus(orderId, status);
  }
};
