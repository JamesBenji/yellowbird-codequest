<!-- eslint-disable linebreak-style -->
<!-- eslint-disable max-len -->
<template>
  <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <router-link to="/" class="cursive-non-selectable text-4xl">{{ COMPANY_NAME }}</router-link>

    <div class="space-x-4 flex items-center">
      <!-- Regular Navigation Items -->
      <router-link v-if="!authStore.user" to="/" class="hover:text-gray-300">Home</router-link>

      <!-- Admin Dropdown -->
      <div v-if="authStore.user?.role === 'admin'" class="relative group">
        <button class="hover:text-gray-300 px-2 py-1 transition-colors">
          Admin
          <svg class="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div class="absolute hidden group-hover:block bg-gray-700 min-w-[200px] rounded-md shadow-lg z-50">
          <div class="py-1">
            <router-link
              to="/admin-dashboard"
              class="block px-4 py-2 hover:bg-gray-600 transition-colors"
            >
              Dashboard
            </router-link>
            <router-link
              to="/admin-products"
              class="block px-4 py-2 hover:bg-gray-600 transition-colors"
            >
              Products
            </router-link>
          </div>
        </div>
      </div>

      <router-link to="/store" class="hover:text-gray-300">Store</router-link>

      <!-- Other Conditional Items -->
      <router-link v-if="!authStore.user" to="/login" class="hover:text-gray-300">
        Login
      </router-link>
      <router-link v-else to="/cart" class="hover:text-gray-300 relative">
        Cart
        <span v-if="cartStore.totalItems > 0"
              class="absolute -top-2 -right-4 bg-red-500 text-white
                     text-xs rounded-full h-5 w-5 flex items-center
                     justify-center">
          {{ cartStore?.totalItems }}
        </span>
      </router-link>
      <router-link v-if="authStore.user" to="/profile" class="hover:text-gray-300">Profile</router-link>

      <button
        v-if="authStore.user"
        @click="logOut"
        class="hover:text-gray-300 transition-colors"
      >
        Sign out
      </button>
    </div>
  </nav>

  <div v-if="authStore.user" class="w-full bg-gradient-to-r from-pink-400 to-purple-500 py-3 px-4 text-center">
    <div class="max-w-7xl mx-auto">
      <p class="text-white font-bold text-xl md:text-xl animate-pulse">
        🌟February Big Sales Are Here!🌠✨
        <span class="inline-block bg-white/20 px-3 py-1 rounded-full ml-2 text-sm">
          📌📌Get up to 51% OFF 😮 💪
        </span>
        <span class="inline-block ml-2">Home-Office Furniture</span>
      </p>
      <div class="mt-1 text-white/90 text-sm flex items-center justify-center gap-1">
        <span class="animate-bounce">⏳</span>
        Limited Time Offer - Shop Now!
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->

<script setup>
import { COMPANY_NAME } from '@/config';
import useAuthStore from '@/stores/auth';
import useCartStore from '@/stores/cart';
import useNotificationStore from '@/stores/notification';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const cartStore = useCartStore();
const notificationStore = useNotificationStore();

const logOut = async () => {
  try {
    await authStore.logOut();
    router.push({ name: 'HomePage' });
  } catch (error) {
    if (error instanceof Error) { notificationStore.addNotification(error.message, 'error'); } else { notificationStore.addNotification(String(error), 'error'); }
  }
};
</script>
<!-- eslint-disable linebreak-style -->
<style>
.cursive-non-selectable {
  font-family: 'Tangerine', cursive;
  user-select: none;
  font-size: 1.125rem;
  font-weight: bold;
}
</style>
