<!-- eslint-disable linebreak-style -->
<!-- eslint-disable max-len -->

<script setup>
import { useRouter } from 'vue-router';
import { PLATFORM_CURRENCY } from '@/config';
import useCartStore from '../stores/cart';

const cartStore = useCartStore();
const router = useRouter();
</script>
<!-- eslint-disable linebreak-style -->
<!-- eslint-disable max-len -->
<!-- <template>
  <div class="p-4 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-2">Shopping Cart</h2>
    <div v-if="cartStore.cartItems.length === 0">
      <p class="text-gray-500">Your cart is empty.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="item in cartStore.cartItems" :key="item.id" class="border-b p-2">
          <span class="font-semibold">{{ item.name }}</span> - ${{ item.price }} x {{ item.quantity }}
          <button @click="cartStore.removeFromCart(item.id)" class="text-red-500 ml-4">Remove</button>
        </li>
      </ul>
      <p class="mt-4 font-bold">Total: ${{ cartStore.totalPrice }}</p>
      <button @click="cartStore.clearCart()" class="bg-red-500 text-white p-2 mt-2 rounded">Clear Cart</button>
      <button @click="router.push('/checkout')" class="bg-emerald-500 text-white p-2 mt-2 rounded">Proceed to checkout</button>
    </div>
  </div>
</template> -->
<template>
  <div class="max-w-4xl mx-auto p-8">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-2xl font-bold text-gray-800">Shopping Cart</h2>
      </div>

      <div class="p-6">
        <div v-if="cartStore.cartItems.length === 0"
             class="text-center py-12">
          <p class="text-gray-500 text-lg">Your cart is empty.</p>
          <button @click="router.push('/store')"
                  class="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
            Continue Shopping
          </button>
        </div>

        <div v-else>
          <ul class="divide-y divide-gray-200">
            <li v-for="item in cartStore.cartItems"
                :key="item.id"
                class="py-4 flex justify-between items-center">
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
                <p class="text-gray-500"> {{ PLATFORM_CURRENCY }} {{ item.price }} x {{ item.quantity }}</p>
              </div>
              <button @click="cartStore.removeFromCart(item.id)"
                      class="ml-4 text-sm font-medium text-red-600 hover:text-red-800">
                Remove
              </button>
            </li>
          </ul>

          <div class="mt-8 border-t border-gray-200 pt-6">
            <div class="flex justify-between text-lg font-medium text-gray-900 mb-6">
              <span>Total</span>
              <span> {{ PLATFORM_CURRENCY }} {{ cartStore.totalPrice.toLocaleString() }}</span>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <button @click="cartStore.clearCart()"
                      class="w-full sm:w-auto px-6 py-3 text-sm font-medium text-red-600 hover:text-red-800
                             border border-red-600 rounded-md hover:bg-red-50 transition-colors">
                Clear Cart
              </button>
              <button @click="router.push('/checkout')"
                      class="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-emerald-600
                             rounded-md hover:bg-emerald-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 </template>
