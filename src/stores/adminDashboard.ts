/* eslint-disable linebreak-style */
import { defineStore } from 'pinia';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { firebaseApp } from '@/plugins/vuefire';
import type { CartItem, Order, Product } from '@/types';
import { ORDER_COLLECTION, PRODUCT_COLLECTION } from '@/config';

const db = getFirestore(firebaseApp);

const useAdminDashboardStore = defineStore('adminDashboard', {
  state: () => ({
    totalOrders: 0,
    pendingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    salesTrends: [] as { date: string; revenue: number }[],
    topSellingProducts: [] as { name: string; sales: number }[],
  }),

  actions: {
    async fetchDashboardData() {
      const orderSnapshot = await getDocs(query(collection(db, ORDER_COLLECTION)));
      const orders = orderSnapshot.docs.map((doc) => doc.data() as Order);

      this.totalOrders = orders.length;
      this.pendingOrders = orders.filter((o) => o.status === 'pending').length;
      this.shippedOrders = orders.filter((o) => o.status === 'shipped').length;
      this.deliveredOrders = orders.filter((o) => o.status === 'delivered').length;

      this.totalRevenue = orders
        .filter((o) => o.status === 'paid')
        .reduce((sum, order) => sum + order.totalAmount, 0);

      const productSnapshot = await getDocs(query(collection(db, PRODUCT_COLLECTION)));
      const products = productSnapshot.docs.map((doc) => doc.data() as Product);

      this.totalProducts = products.length;
      this.lowStockProducts = products.filter((p) => p.stockLevel === 'low_stock').length;
    },

    async fetchSalesReports() {
      const orderSnapshot = await getDocs(query(collection(db, ORDER_COLLECTION), orderBy('createdAt', 'desc')));
      const orders = orderSnapshot.docs.map((doc) => doc.data() as Order);

      this.totalRevenue = orders
        .filter((o) => o.status === 'paid')
        .reduce((sum, order) => sum + order.totalAmount, 0);

      const revenueByDate: Record<string, number> = {};
      const productSales: Record<string, number> = {};

      orders.filter((o) => o.status === 'paid').forEach((order) => {
        const orderDate = order.createdAt.toDate().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        revenueByDate[orderDate] = (revenueByDate[orderDate] || 0) + order.totalAmount;

        order.items.forEach((item: CartItem) => {
          productSales[item.name] = (productSales[item.name] || 0) + item.quantity;
        });
      });

      this.salesTrends = Object.entries(revenueByDate)
        .map(([date, revenue]) => ({ date, revenue }))
        .sort((a, b) => (a.date > b.date ? 1 : -1));

      this.topSellingProducts = Object.entries(productSales)
        .map(([name, sales]) => ({ name, sales }))
        .sort((a, b) => b.sales - a.sales);
    },
  },
});

export default useAdminDashboardStore;
