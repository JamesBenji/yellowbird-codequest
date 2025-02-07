<!-- eslint-disable linebreak-style -->
<!-- eslint-disable max-len -->
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-md space-y-8">
      <!-- Header Section -->
      <div class="text-center">
        <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Join Lancelot
        </h2>
        <p class="mt-2 text-gray-600">Create your account in seconds</p>
      </div>

      <!-- Signup Form -->
      <form @submit.prevent="handleSignUp" class="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <!-- Form Fields -->
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First name
              <input
                v-model="firstName"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="John"
              >
            </label>
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last name
              <input
                v-model="lastName"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Doe"
              >
            </label>
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="john@example.com"
            >
          </label>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="••••••••"
            >
          </label>
          </div>

          <div>
            <div class="relative">
              <label for="gender" class="block text-sm font-medium text-gray-700 mb-1">Gender
              <select
                v-model="gender"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="" disabled hidden>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {{ errorMessage }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all relative"
          :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">Create Account</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Creating Account...
          </span>
        </button>

        <!-- Social Login -->
        <button
          @click="handleGoogleAuth"
          type="button"
          class="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            <path fill="none" d="M0 0h48v48H0z"/>
          </svg>
          Continue with Google
        </button>

        <!-- Login Redirect -->
        <p class="text-center text-gray-600 text-sm">
          Already have an account?
          <button
            @click="redirectToCreateAccount"
            class="text-blue-600 hover:text-blue-700 font-medium underline transition-colors"
          >
            Log in here
          </button>
        </p>
      </form>
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from '../stores/auth';
import { Gender } from '../types';

const authStore = useAuthStore();
const email = ref<string>('');
const password = ref<string>('');
const firstName = ref<string>('');
const lastName = ref<string>('');
const gender = ref<Gender>('unspecified');
const router = useRouter();
const errorMessage = ref<string>('');
const isSubmitting = ref(false);

const handleSignUp = async () => {
  try {
    errorMessage.value = '';
    await authStore.signUp(
      email.value,
      password.value,
      firstName.value,
      lastName.value,
      gender.value,
    );
    router.push({ name: 'Login' });
  } catch (error: unknown) {
    if (error instanceof Error) errorMessage.value = error.message;
  } finally {
    isSubmitting.value = false;
  }
};

const handleGoogleAuth = async () => {
  try {
    errorMessage.value = '';
    await authStore.authenticateWithGoogle();
  } catch (error: unknown) {
    if (error instanceof Error) errorMessage.value = error.message;
  }
};

const redirectToCreateAccount = () => {
  router.replace({ name: 'SignUp' });
};
</script>
