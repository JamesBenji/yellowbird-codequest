<!-- eslint-disable linebreak-style -->
<!-- <template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Your Orders</h1>

    <div v-if="orderStore.orders.length === 0">
      <p class="text-gray-500">No orders yet.</p>
    </div>

    <div v-else>
      <div v-for="order in orderStore.orders" :key="order.id" class="border p-4 rounded mb-4">
        <h2 class="text-lg font-semibold">Order #{{ order.id }}</h2>
        <p>Status: <span class="font-bold">{{ order.status }}</span></p>
        <p>Total: <span class="font-bold">{{ order.currency }} {{ order.totalAmount }}</span></p>
        <p>Date: {{ order.createdAt.toDate().toLocaleString() }}</p>

        <ul class="mt-2">
          <li v-for="item in order.items" :key="item.id">
            {{ item.name }} - ${{ item.price }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template> -->
<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="max-w-4xl mx-auto mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Your Orders</h1>
      <p class="text-gray-500 mt-2">View and manage your past and current orders.</p>
    </div>

    <!-- Empty State -->
    <div v-if="orderStore.orders.length === 0" class="max-w-4xl mx-auto">
      <div class="bg-white p-8 rounded-xl shadow-sm text-center">
        <p class="text-gray-500">No orders yet.</p>
        <router-link
          to="/store"
          class="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg
          hover:bg-blue-600 transition-colors duration-200"
        >
          Start Shopping
        </router-link>
      </div>
    </div>

    <!-- Orders List -->
    <div v-else class="max-w-4xl mx-auto space-y-6">
      <div
        v-for="order in orderStore.orders"
        :key="order.id"
        class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <!-- Order Header -->
        <div class="p-6 border-b border-gray-100">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800">Order #{{ order.id }}</h2>
            <span
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                order.status === 'delivered'
                  ? 'bg-green-100 text-green-700'
                  : order.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700',
              ]"
            >
              {{ order.status }}
            </span>
          </div>
          <p class="text-sm text-gray-500 mt-1">
            Placed on {{ order.createdAt.toDate().toLocaleString() }}
          </p>
        </div>

        <!-- Order Details -->
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Items List -->
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Items</h3>
              <ul class="space-y-3">
                <li
                  v-for="item in order.items"
                  :key="item.id"
                  class="flex items-center space-x-4"
                >
                  <!-- <img
                    :src="item.imageUrl || 'https://via.placeholder.com/80'"
                    :alt="item.name"
                    class="w-12 h-12 object-cover rounded-lg"
                  /> -->
                  <div>
                    <p class="font-medium text-gray-800">{{ item.name }}</p>
                    <p class="text-sm text-gray-500">
                      {{ PLATFORM_CURRENCY }} {{ item.price?.toLocaleString() }}
                      x {{ item.quantity }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Order Summary -->
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Summary</h3>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <p class="text-gray-600">Subtotal</p>
                  <p class="font-medium text-gray-800">
                    {{ PLATFORM_CURRENCY }} {{ order.subtotal?.toLocaleString() || 0 }}
                  </p>
                </div>
                <div class="flex justify-between">
                  <p class="text-gray-600">Shipping</p>
                  <p class="font-medium text-gray-800">
                    {{ PLATFORM_CURRENCY }} {{ order.shippingCost?.toLocaleString() || 0 }}
                  </p>
                </div>
                <div class="flex justify-between border-t border-gray-100 pt-2">
                  <p class="text-gray-600 font-semibold">Total</p>
                  <p class="font-bold text-gray-800">
                    {{ PLATFORM_CURRENCY }} {{ order.totalAmount?.toLocaleString() || 0 }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="p-6 border-t border-gray-100 flex justify-end space-x-4">
          <button
            v-if="order.status === 'Pending'"
            class="px-6 py-2 bg-blue-500 text-white rounded-lg
            hover:bg-blue-600 transition-colors duration-200"
          >
            Track Order
          </button>
          <button
            class="px-6 py-2 bg-gray-100 text-gray-800 rounded-lg
            hover:bg-gray-200 transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->

<script setup>
import { onMounted } from 'vue';
import { PLATFORM_CURRENCY } from '@/config';
import useOrderStore from '../stores/order';

const orderStore = useOrderStore();

onMounted(() => {
  orderStore.fetchOrders();
});
</script>
