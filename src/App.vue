<!-- eslint-disable max-len -->
<template>
  <div>
    <div
    v-for="(notification, index) in notificationStore.notifications"
      :key="index"
    :class="[
      'absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center px-6 py-4 rounded-lg shadow-lg z-50 font-medium transition-all duration-300 animate-slide-in',
      notification.type === 'success'
        ? 'bg-emerald-50 border border-emerald-100 text-emerald-700'
        : 'bg-rose-50 border border-rose-100 text-rose-700',
    ]"
  >
    <!-- Icon -->
    <svg
      v-if="notification.type === 'success'"
      class="w-6 h-6 mr-3 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>

    <svg
      v-else
      class="w-6 h-6 mr-3 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>

    <!-- Message -->
    <span class="mr-4">{{ notification.message }}</span>

    <!-- Close Button -->
    <button
      @click="closeNotification"
      class="ml-auto -mr-2 -my-1 p-1 rounded-full hover:bg-opacity-20 transition-colors"
      :class="notification.type === 'success'
        ? 'hover:bg-emerald-100 text-emerald-600'
        : 'hover:bg-rose-100 text-rose-600'"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
  <NavBar />
  <router-view/>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import NavBar from './components/NavBar.vue';
import useNotificationStore from './stores/notification';
import useAuthStore from './stores/auth';

const notificationStore = useNotificationStore();
const authStore = useAuthStore();

onMounted(() => {
  authStore.initialize();
});

</script>

<style>
@keyframes slide-in {
  from {
    transform: translate(-50%, -20px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  to {
    transform: translate(-50%, -20px);
    opacity: 0;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out forwards;
}

.animate-fade-out {
  animation: fade-out 0.2s ease-in forwards;
}

/* Micro-interaction for error notification */
@keyframes gentle-shake {
  0% { transform: translate(-50%, 0) rotate(0deg); }
  25% { transform: translate(-50%, 0) rotate(2deg); }
  75% { transform: translate(-50%, 0) rotate(-2deg); }
  100% { transform: translate(-50%, 0) rotate(0deg); }
}

.error-shake {
  animation: gentle-shake 0.4s ease-in-out;
}
</style>

<!-- <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style> -->
