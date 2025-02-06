<!-- eslint-disable linebreak-style -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Admin Order Management</h1>

    <div v-if="orderStore.orders.length === 0">
      <p class="text-gray-500">No orders found.</p>
    </div>

    <div v-else>
      <div v-for="order in orderStore.orders" :key="order.id" class="border p-4 rounded mb-4">
        <h2 class="text-lg font-semibold">Order #{{ order.id }}</h2>
        <p>Status: <span class="font-bold">{{ order.status }}</span></p>
        <p>Total: <span class="font-bold">{{ order.currency }} {{ order.totalAmount }}</span></p>
        <p>Date: {{ order.createdAt.toDate().toLocaleString() }}</p>
        <button @click="viewOrderDetails(order)" class="bg-blue-500 text-white p-2 rounded mt-2">
          View Details
        </button>

        <div v-if="selectedOrder" class="mt-6 border p-4 rounded shadow-lg">
          <h2 class="text-xl font-bold mb-2">Order Details: {{ selectedOrder.id }}</h2>
          <p><b>User ID:</b> {{ selectedOrder.userId }}</p>
          <ul>
            <li v-for="item in selectedOrder.items" :key="item.id">
              {{ item.name }} — ${{ item.price }} x {{ item.quantity }}
            </li>
          </ul>
          <p><b>Total:</b> ${{ selectedOrder.totalAmount }}</p>
          <p><b>Status:</b> {{ selectedOrder.status }}</p>
        </div>

        <ul class="mt-2">
          <li v-for="item in order.items" :key="item.id">
            {{ item.name }} - ${{ item.price }}
          </li>
        </ul>

        <label for="status" class="block mt-2">Update Status:
          <select v-model="order.status"
          @change="orderStore.updateOrderStatus(order.id, order.status)" class="border p-2">
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>

        <button v-if="order.status !== 'cancelled'" @click="cancelOrder(order.id)"
          class="bg-red-500 text-white p-2 rounded mt-2">
          Cancel Order
        </button>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->

<script setup>
import { ref, onMounted } from 'vue';
import useOrderStore from '../stores/order';

const orderStore = useOrderStore();
const selectedOrder = ref(null);

onMounted(() => {
  orderStore.fetchAllOrders();
});

const viewOrderDetails = (order) => {
  selectedOrder.value = order;
};
</script>
