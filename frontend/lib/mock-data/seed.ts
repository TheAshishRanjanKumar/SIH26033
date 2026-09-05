import { Listing, RFQ, Order, User } from './types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Ramesh Patel', role: 'FARMER', location: 'Nashik, Maharashtra' },
  { id: 'u2', name: 'Suresh Kumar', role: 'FARMER', location: 'Pune, Maharashtra' },
  { id: 'u5', name: 'MahaAgri FPO', role: 'FPO', location: 'Nashik, Maharashtra' },
  { id: 'u3', name: 'FreshMart Logistics', role: 'BUYER', location: 'Mumbai, Maharashtra' },
  { id: 'u4', name: 'DoCA Admin', role: 'ADMIN' },
];

export const initialListings: Listing[] = [
  { id: 'l1', farmerId: 'u1', farmerName: 'Ramesh Patel', crop: 'Tomato', grade: 'A', pricePerKg: 22, quantityKg: 1500, location: 'Nashik, Maharashtra', distanceKm: 165 },
  { id: 'l2', farmerId: 'u2', farmerName: 'Suresh Kumar', crop: 'Tomato', grade: 'A', pricePerKg: 20, quantityKg: 3000, location: 'Pune, Maharashtra', distanceKm: 148 },
  { id: 'l3', farmerId: 'u1', farmerName: 'Ramesh Patel', crop: 'Onion', grade: 'B', pricePerKg: 18, quantityKg: 5000, location: 'Nashik, Maharashtra', distanceKm: 165 },
  { id: 'l4', farmerId: 'u2', farmerName: 'Suresh Kumar', crop: 'Potato', grade: 'A', pricePerKg: 15, quantityKg: 2000, location: 'Pune, Maharashtra', distanceKm: 148 },
  { id: 'l5', farmerId: 'u1', farmerName: 'Ramesh Patel', crop: 'Green Chilli', grade: 'A', pricePerKg: 45, quantityKg: 800, location: 'Nashik, Maharashtra', distanceKm: 165 },
  { id: 'l6', farmerId: 'u2', farmerName: 'Suresh Kumar', crop: 'Cabbage', grade: 'B', pricePerKg: 12, quantityKg: 4000, location: 'Pune, Maharashtra', distanceKm: 148 },
];

export const initialRFQs: RFQ[] = [];
export const initialOrders: Order[] = [];
