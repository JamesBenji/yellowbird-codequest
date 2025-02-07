<!-- eslint-disable linebreak-style -->

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">My Profile</h1>

    <div v-if="userStore.profile">
      <p><b>Email:</b> {{ userStore.profile.email }}</p>

      <label for="newName">Name:
      <input v-model="newName" type="text" class="border p-2 w-full mb-2" />
    </label>
      <label for="newAddress">Address:
      <input v-model="newAddress" type="text" class="border p-2 w-full mb-2" />
    </label>
      <button @click="updateProfile" class="bg-blue-500 text-white p-2 rounded">
        Update Profile
    </button>
    </div>

    <h2 class="text-xl font-bold mt-6">Order History</h2>
    <div v-if="orderStore.orders.length === 0">
      <p class="text-gray-500">No orders yet.</p>
    </div>

    <div v-else>
      <div v-for="order in orderStore.orders" :key="order.id" class="border p-4 rounded mb-4">
        <h2 class="text-lg font-semibold">Order #{{ order.id }}</h2>
        <p>Status: <span class="font-bold">{{ order.status }}</span></p>
        <p>Total: <span class="font-bold">${{ order.totalAmount }}</span></p>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->

<script setup>
import { ref, onMounted } from 'vue';
import useOrderStore from '@/stores/order';
import useUserStore from '../stores/userStore';

const userStore = useUserStore();
const orderStore = useOrderStore();
const newName = ref('');
const newAddress = ref('');

onMounted(() => {
  userStore.fetchUserProfile();
});

const updateProfile = async () => {
  await userStore.updateUserProfile({ name: newName.value, address: newAddress.value });
};
</script>
