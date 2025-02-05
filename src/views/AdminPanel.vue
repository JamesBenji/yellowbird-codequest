<!-- eslint-disable linebreak-style -->
<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold">User Dashboard</h1>
        <p v-if="authStore.user">Welcome, Admin {{ authStore.user.firstName }}!</p>
        <p v-else>Welcome, user!</p>
        <button @click="logOut">Sign out</button>
        <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </div>
</template>
<!-- eslint-disable linebreak-style -->
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from '../stores/auth';

export default defineComponent({
  name: 'AdminPanel',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const errorMessage = ref<string>('');
    const logOut = async () => {
      try {
        await authStore.logOut();
        router.push({ name: 'Login' });
      } catch (error) {
        if (error instanceof Error) errorMessage.value = error.message;
      }
    };
    return {
      authStore,
      errorMessage,
      logOut,
    };
  },
});
</script>
