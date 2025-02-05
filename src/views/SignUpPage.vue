<!-- eslint-disable linebreak-style -->
<!-- eslint-disable max-len -->
<template>
    <div >
        <h2 class="text-xl font-bold mb-4">Sign up with Lancelot</h2>
        <form @submit.prevent="handleSignUp" class="flex flex-col p-6 bg-white rounded shadow-md">
            <label for="email">
                <input v-model="email" type="email" placeholder="Email" class="p-2 border rounded mb-2" name="email" required/>
            </label>
            <label for="password">
                <input v-model="password" type="password" placeholder="Password" class="p-2 border rounded mb-4"
                    name="password" required/>
            </label>
            <label for="firstName">
                <input v-model="firstName" type="text" placeholder="First name" class="p-2 border rounded mb-4"
                    name="firstName" required/>
            </label>
            <label for="lastName">
                <input v-model="lastName" type="text" placeholder="Last name" class="p-2 border rounded mb-4"
                    name="lastName" required/>
            </label>

              <select name="gender" v-model="gender">
                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

            <button type="submit" class="bg-blue-500 text-white p-2 rounded">Create account</button>
            <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
        </form>
        <button @click="handleGoogleAuth" class="bg-blue-500 text-white p-2 rounded mt-2">
      Sign In with Google
    </button>

        <button @click="redirectToCreateAccount">Already have an account? Login!</button>
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
const gender = ref<Gender>('');
const router = useRouter();
const errorMessage = ref<string>('');

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
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const handleGoogleAuth = async () => {
  try {
    errorMessage.value = '';
    await authStore.authenticateWithGoogle();
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const redirectToCreateAccount = () => {
  router.replace({ name: 'SignUp' });
};
</script>
