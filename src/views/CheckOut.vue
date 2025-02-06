<!-- eslint-disable linebreak-style -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Checkout</h1>

    <div v-if="cartStore.cartItems.length === 0">
      <p class="text-gray-500">Your cart is empty. Add items before checkout.</p>
    </div>

    <div v-else>
      <ul>
        <li v-for="item in cartStore.cartItems" :key="item.id" class="border-b p-2">
          <span class="font-semibold">{{ item.name }}</span>
          - ${{ item.price }} x {{ item.quantity }}
        </li>
      </ul>
      <p class="mt-4 font-bold">Total: ${{ cartStore.totalPrice }}</p>

      <label for="currency" class="block mt-2">Currency:
      <select v-model="currency" class="border p-2 w-full">
        <option value="UGX" selected>UGX</option>
      </select>
    </label>

      <button @click="placeOrder"
      class="bg-blue-500 text-white p-2 rounded mt-4">Place Order</button>
      <PesaPalPay />
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>

    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PesaPalPay from '@/components/PesaPalPay.vue';
import useCartStore from '../stores/cart';
import useOrderStore from '../stores/order';

const cartStore = useCartStore();
const orderStore = useOrderStore();
const router = useRouter();
const currency = ref('UGX');
const errorMessage = ref<string>('');

const placeOrder = async (): Promise<void> => {
  if (cartStore.cartItems.length === 0) {
    errorMessage.value = 'Your cart is empty!';
    return;
  }

  try {
    await orderStore.placeOrder(cartStore.cartItems, cartStore.totalPrice, currency.value);
    cartStore.clearCart();
    router.push('/orders');
  } catch (error) {
    if (error instanceof Error) { errorMessage.value = error.message; } else {
      errorMessage.value = 'Caught an unknown error';
    }
  }
};
</script>
