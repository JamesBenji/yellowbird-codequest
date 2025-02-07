/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import { CartItem } from '@/types';
import { defineStore } from 'pinia';

const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as CartItem[],
  }),

  getters: {
    totalItems: (state) => state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },

  actions: {
    addToCart(item: { id: string; name: string; price: number }) {
      const existingItem = this.cartItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cartItems.push({ ...item, quantity: 1 });
      }
    },

    removeFromCart(id: string) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
    },

    increaseQuantity(id: string) {
      const item = this.cartItems.find((cartItem) => cartItem.id === id);
      if (item && item.quantity > 0) {
        item.quantity += 1;
      }
    },

    decreaseQuantity(id: string) {
      const item = this.cartItems.find((cartItem) => cartItem.id === id);
      if (item && item.quantity > 0) {
        item.quantity -= 1;
      }
    },

    isInCart(id: string): boolean {
      return this.cartItems.some((item) => item.id === id);
    },

    clearCart() {
      this.cartItems = [];
    },
  },
});

export default useCartStore;
