<!-- eslint-disable linebreak-style -->

<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <!-- Profile Section -->
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">My Profile</h1>
        <p class="text-gray-500 mt-2">Manage your
          personal information and view your order history.</p>
      </div>

      <!-- Profile Details -->
      <div v-if="userStore.profile" class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div class="space-y-4">
          <h2 v-if="userStore.profile"
            class="font-semibold text-xl">Hello {{ userStore.profile.firstName }}
            {{ userStore.profile.lastName }} 👋</h2>
          <!-- Email -->
          <div>
            <p class="text-gray-900">📬 {{ userStore.profile.email }}</p>
          </div>

          <!-- First Name -->
          <div>
            <label for="firstName" class="block text-sm font-medium
            text-gray-700 mb-1">First Name
            <input
              v-model="firstName"
              id="firstName"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2
              focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter your first name"
            />
          </label>
          </div>

          <!-- Last Name -->
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name
            <input
              v-model="lastName"
              id="lastName"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2
              focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter your last name"
            />
          </label>
          </div>

          <!-- Address -->
          <div>
            <label for="newAddress" class="block text-sm font-medium
            text-gray-700 mb-1">Address
            <input
              v-model="newAddress"
              id="newAddress"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter your address"
            />
          </label>
          </div>

          <!-- Update Button -->
          <button
    @click="updateProfile"
    :disabled="isUpdating"
    class="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg
           hover:bg-blue-600 transition-colors duration-200
           disabled:opacity-75 disabled:cursor-not-allowed"
  >
    <span v-if="!isUpdating">Update Profile</span>
    <span v-else class="flex items-center justify-center gap-2">
      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12"
        r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962
        0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Updating...
    </span>
  </button>
        </div>
      </div>

      <div v-else>Loading profile...</div>

      <!-- Order History -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Order History</h2>

        <!-- Empty State -->
        <div v-if="orderStore.orders.length === 0"
        class="bg-white rounded-xl shadow-sm p-6 text-center">
          <p class="text-gray-500">No orders yet.</p>
        </div>

        <!-- Orders List -->
        <div v-else class="space-y-4">
          <div
            v-for="order in orderStore.orders"
            :key="order.id"
            class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
          >
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold text-gray-800">Order #{{ order.id }}</h3>
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  order.status === 'Delivered'
                    ? 'bg-green-100 text-green-700'
                    : order.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700',
                ]"
              >
                {{ order.status }}
              </span>
            </div>
            <p class="text-gray-600 mt-2">
              Total: <span class="font-bold">${{ order.totalAmount.toLocaleString() }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->

<script setup>
import { ref, onMounted } from 'vue';
import useOrderStore from '@/stores/order';
import useNotificationStore from '@/stores/notification';
import useUserStore from '../stores/userStore';

const userStore = useUserStore();
const orderStore = useOrderStore();
const firstName = ref('');
const lastName = ref('');
const newAddress = ref('');
const notificationStore = useNotificationStore();

onMounted(async () => {
  notificationStore.addNotification('Loading...', 'success');
  await userStore.fetchUserProfile();
  firstName.value = userStore.profile.firstName;
  lastName.value = userStore.profile.lastName;
  newAddress.value = userStore.profile.address;
});

const updateProfile = async () => {
  await userStore.updateUserProfile({
    firstName: firstName.value,
    lastName: lastName.value,
    address: newAddress.value,
  });
};
</script>
