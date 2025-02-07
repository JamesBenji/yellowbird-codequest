<!-- eslint-disable linebreak-style -->
<template>
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
</template>
<!-- eslint-disable linebreak-style -->

<script setup>
import { onMounted } from 'vue';
import useOrderStore from '../stores/order';

const orderStore = useOrderStore();

onMounted(() => {
  orderStore.fetchOrders();
});
</script>
