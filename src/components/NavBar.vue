<!-- eslint-disable linebreak-style -->
<template>
    <nav class="bg-gray-800 text-white p-4 flex justify-between">
      <router-link to="/" class="cursive-non-selectable text-4xl">{{ COMPANY_NAME }}</router-link>
      <div class="space-x-4">
        <router-link v-if="!authStore.user" to="/" class="hover:text-gray-300">Home</router-link>
        <router-link v-if="authStore.user && authStore.user.role === 'admin'" to="/admin-panel"
        class="hover:text-gray-300">Admin Panel</router-link>
        <router-link v-if="authStore.user && authStore.user.role === 'admin'" to="/admin-products"
        class="hover:text-gray-300">Products</router-link>
        <router-link to="/store" class="hover:text-gray-300">Store</router-link>
        <router-link v-if="!authStore.user" to="/login" class="hover:text-gray-300">
          Login
        </router-link>
        <router-link v-else to="/cart" class="hover:text-gray-300">Cart</router-link>
        <router-link v-if="authStore.user" to="/profile"
        class="hover:text-gray-300">Profile</router-link>
        <button v-if="authStore.user" @click="logOut">Sign out</button>
      </div>
    </nav>
  </template>
<!-- eslint-disable linebreak-style -->

<script setup>
import { COMPANY_NAME } from '@/config';
import useAuthStore from '@/stores/auth';
import useNotificationStore from '@/stores/notification';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
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
