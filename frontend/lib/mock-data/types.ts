export type Role = 'FARMER' | 'BUYER' | 'ADMIN' | 'FPO';

export interface User {
  id: string;
  name: string;
  role: Role;
  location?: string;
}

export interface Listing {
  id: string;
  farmerId: string;
  farmerName: string;
  crop: string;
  grade: 'A' | 'B' | 'C';
  pricePerKg: number;
  quantityKg: number;
  location: string;
  distanceKm?: number;
}

export interface RFQ {
  id: string;
  buyerId: string;
  buyerName: string;
  crop: string;
  quantityKg: number;
  grade: 'A' | 'B' | 'C';
  targetPricePerKg: number;
  deliveryLocation: string;
  requiredByDate: string;
  status: 'OPEN' | 'MATCHED' | 'FULFILLED';
}

export type OrderStatus = 'PLACED' | 'MATCHED' | 'PICKUP' | 'IN_TRANSIT' | 'DELIVERED';

export interface Order {
  id: string;
  rfqId?: string;
  listingIds: string[];
  buyerId: string;
  totalQuantityKg: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
}
