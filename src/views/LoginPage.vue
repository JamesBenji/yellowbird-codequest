<!-- eslint-disable linebreak-style -->
<!-- eslint-disable max-len -->
<!-- <template>
    <div >
        <h2 class="text-xl font-bold mb-4">Login</h2>
        <form @submit.prevent="handleLogin" class="flex flex-col p-6 bg-white rounded shadow-md">
            <label for="email">
                <input v-model="email" type="email" placeholder="Email" class="p-2 border rounded mb-2" name="email" required/>
            </label>
            <label for="password">
                <input v-model="password" type="password" placeholder="Password" class="p-2 border rounded mb-4"
                    name="password" required/>
            </label>
            <button type="submit" class="bg-blue-500 text-white p-2 rounded">Login</button>
            <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
        </form>

        <button @click="redirectToCreateAccount">No account? Create your account today!</button>

        <button @click="handleGoogleAuth" class="bg-blue-500 text-white p-2 rounded mt-2">
      Sign In with Google
    </button>
    </div>
</template> -->
<template>
  <div class="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
       style="background-image: url('/assets/images/login-bg.jpg');">

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <div class="relative bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Welcome Back!</h2>

      <form @submit.prevent="handleLogin" class="flex flex-col">
        <label for="email" class="w-full mb-2">
          <input v-model="email" type="email" placeholder="Email"
               class="p-3 border rounded my-auto focus:ring focus:ring-blue-300 w-full" required />
        </label>

        <label for="password" class="w-full mb-2">
          <input v-model="password" type="password" placeholder="Password"
          class="p-3 border rounded my-auto focus:ring focus:ring-blue-300 w-full" required />
        </label>

        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded transition">
          Login
        </button>

        <p v-if="errorMessage" class="text-red-500 mt-2 text-center">{{ errorMessage }}</p>
      </form>

      <div class="text-center mt-4">
        <button @click="redirectToCreateAccount" class="text-blue-600 hover:underline">
          No account? Create your account today!
        </button>
      </div>

      <div class="mt-4 text-center">
        <button @click="handleGoogleAuth"
                class="bg-white border p-3 rounded flex items-center justify-center w-full hover:bg-gray-100">
          <img src="/assets/images/google-icon.png" class="w-6 h-6 mr-2" alt="Google Logo" />
          Sign In with Google
        </button>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from '../stores/auth';

const authStore = useAuthStore();
const email = ref<string>('');
const password = ref<string>('');
const router = useRouter();
const errorMessage = ref<string>('');

const handleLogin = async () => {
  try {
    errorMessage.value = '';
    await authStore.login(email.value, password.value);
    const userData = authStore.user;
    if (!userData) throw new Error('user data is null');
    const userRole = userData.role;
    if (userRole === 'customer') {
      router.push({ name: 'UserDashboard' });
    } else {
      router.push({ name: 'AdminPanel' });
    }
  } catch (error) {
    if (error instanceof Error) { errorMessage.value = error.message; } else {
      errorMessage.value = 'Caught an unknown error';
    }
  }
};

const handleGoogleAuth = async () => {
  try {
    errorMessage.value = '';
    await authStore.authenticateWithGoogle();
    const userData = authStore.user;
    if (!userData) throw new Error('user data is null');
    const userRole = userData.role;
    if (userRole === 'customer') {
      router.push({ name: 'StorePage' });
    } else {
      router.push({ name: 'AdminPanel' });
    }
  } catch (error) {
    if (error instanceof Error) { errorMessage.value = error.message; } else {
      errorMessage.value = 'Caught an unknown error';
    }
  }
};

const redirectToCreateAccount = () => {
  router.replace({ name: 'SignUp' });
};
</script>
