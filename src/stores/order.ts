/* eslint-disable linebreak-style */
import { defineStore } from 'pinia';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  updateDoc,
  doc,
  setDoc,
} from 'firebase/firestore';
import { firebaseApp } from '@/plugins/vuefire';
import type { CartItem, Order, OrderStatus } from '@/types';
import { ORDER_COLLECTION, PAYMENT_CALLBACK, SERVER_URL } from '@/config';
import axios from 'axios';
import { v4 as uuidv } from 'uuid';
import useAuthStore from './auth';
import useNotificationStore from './notification';

const db = getFirestore(firebaseApp);
const notificationStore = useNotificationStore();

const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [] as Order[],
    errorMessage: '',
    currentOrderId: '',
  }),

  actions: {
    getCurrentOrderId() {
      if (!this.currentOrderId) {
        this.currentOrderId = `ORDER-${uuidv()}`;
      }

      return this.currentOrderId;
    },

    async processPesaPalPayment(cartItems: CartItem[], totalAmount: number) {
      this.errorMessage = '';

      try {
        // Step 1: Get access token
        const accessTokenResponse = await axios.get(`${SERVER_URL}/api/get-access-token`);
        const { accessToken } = accessTokenResponse.data;

        // Step 2: Register IPN
        const IPNResponse = await axios.post(`${SERVER_URL}/api/register-ipn`, { accessToken });
        const notificationId = IPNResponse.data.ipnId;

        // Step 4: Prepare Order Data
        const authStore = useAuthStore();
        if (!authStore.user) throw new Error('User is not authenticated.');

        const orderData = {
          id: this.getCurrentOrderId(),
          currency: 'UGX',
          amount: totalAmount || 100.00,
          description: `Payment for ${this.getCurrentOrderId()}`,
          callback_url: PAYMENT_CALLBACK,
          notification_id: notificationId,
          billing_address: {
            email_address: authStore.user.email,
          },
        };

        // Step 5: Submit Order to PesaPal
        const response = await axios.post(`${SERVER_URL}/api/submit-order`, {
          accessToken,
          orderData,
        });

        // Step 6: Redirect to PesaPal Payment Page
        window.location.href = response.data.redirect_url;
      } catch (error) {
        console.error('Payment failed:', error);
        this.errorMessage = 'Payment failed. Please try again.';
      }
    },

    async placeOrder(items: CartItem[], totalAmount: number, currency: string) {
      const authStore = useAuthStore();
      if (!authStore.user) throw new Error('User is not authenticated.');

      const orderData = {
        id: this.getCurrentOrderId(),
        userId: authStore.user.uid,
        items,
        totalAmount,
        currency,
        status: 'pending',
        createdAt: Timestamp.now(),
      };

      await setDoc(
        doc(db, ORDER_COLLECTION, this.getCurrentOrderId()),
        orderData,
      );
      this.orders.push({ ...orderData } as Order);

      try {
        await this.processPesaPalPayment(items, totalAmount);
      } catch (error: unknown) {
        if (error instanceof Error) { throw new Error(error.message); } else {
          throw new Error('Unknown error when processing payment.');
        }
      }
    },

    async fetchOrders() {
      const authStore = useAuthStore();
      if (!authStore.user) return;

      const q = query(collection(db, ORDER_COLLECTION), where('userId', '==', authStore.user.uid));
      const querySnapshot = await getDocs(q);

      this.orders = querySnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      })) as Order[];
    },

    async fetchAllOrders() {
      const querySnapshot = await getDocs(collection(db, 'Orders'));
      this.orders = querySnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      })) as Order[];
    },

    async updateOrderStatus(orderId: string, newStatus: OrderStatus) {
      await updateDoc(doc(db, ORDER_COLLECTION, orderId), { status: newStatus });
      this.orders = this.orders.map(
        (order) => (order.id === orderId ? { ...order, status: newStatus } : order),
      );
      notificationStore.addNotification(`Order ${orderId} updated to ${newStatus}`, 'success');
    },

    async cancelOrder(orderId: string) {
      await updateDoc(doc(db, ORDER_COLLECTION, orderId), { status: 'cancelled' });
      this.orders = this.orders.map((order) => (order.id === orderId ? { ...order, status: 'cancelled' } : order));
    },

  },
});

export default useOrderStore;
