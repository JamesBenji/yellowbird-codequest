/* eslint-disable linebreak-style */
import { Timestamp } from 'firebase/firestore';

export type Gender = 'male' | 'female' | 'unspecified';

export type Role = 'admin' | 'customer'

export type StockLevel = 'in_stock' | 'low_stock' | 'out_of_stock';

export type AppUser = {
    email: string,
    firstName: string,
    lastName: string,
    gender: Gender,
    role: Role,
    createdAt: Date,
    uid: string,
    purchasesRef?: string,
}

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    galleryUrls: string[];
    hasDiscount: boolean;
    discountPercentage: number;
    category: string;
    stockLevel: StockLevel;
    currency: string;
    stockQuantity: string;
};

export type CartItem = Pick<Product, 'id' | 'price' | 'name'> & {
    quantity: number
}

export type OrderStatus = 'pending' | 'paid' | 'failed';

export type Order = {
    id: string;
    userId: string;
    items: CartItem[];
    totalAmount: number;
    currency: string;
    status: OrderStatus;
    createdAt: Timestamp;
  };
