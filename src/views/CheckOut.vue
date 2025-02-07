<!-- eslint-disable linebreak-style -->
<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <!-- Progress Indicator -->
    <div class="max-w-3xl mx-auto mb-8">
      <div class="flex justify-between items-center">
        <div class="flex-1">
          <div class="h-1 bg-gray-200 rounded-full">
            <div class="h-1 bg-blue-500 rounded-full" style="width: 66%"></div>
          </div>
        </div>
        <div class="ml-4 text-sm text-gray-600">Step 2 of 3</div>
      </div>
    </div>

    <!-- Checkout Container -->
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="p-6 border-b border-gray-100">
        <h1 class="text-2xl font-bold text-gray-800">Checkout</h1>
      </div>

      <!-- Empty Cart Message -->
      <div v-if="cartStore.cartItems.length === 0" class="p-6">
        <p class="text-gray-500 text-center">Your cart is empty. Add items before checkout.</p>
      </div>

      <!-- Cart Items -->
      <div v-else class="p-6">
        <ul class="space-y-4">
          <li
            v-for="item in cartStore.cartItems"
            :key="item.id"
            class="flex items-center justify-between p-4 rounded-lg
            hover:bg-gray-50 transition-colors duration-200"
          >
            <div class="flex items-center space-x-4">
              <div>
                <p class="font-semibold text-gray-800">{{ item.name }}</p>
                <p class="text-sm text-gray-500">
                  {{ PLATFORM_CURRENCY }} {{ item.price.toLocaleString() }} x {{ item.quantity }}
                </p>
              </div>
            </div>
            <p class="font-semibold text-gray-800">
              {{ PLATFORM_CURRENCY }} {{ (item.price * item.quantity).toLocaleString() }}
            </p>
          </li>
        </ul>

        <!-- Order Summary -->
        <div class="mt-8 space-y-3">
          <div class="flex justify-between">
            <p class="text-gray-600">Subtotal</p>
            <p class="font-semibold text-gray-800">
              {{ PLATFORM_CURRENCY }} {{ subtotal.toLocaleString() }}
            </p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-600">VAT (18%)</p>
            <p class="font-semibold text-gray-800">
              {{ PLATFORM_CURRENCY }} {{ vatAmount.toLocaleString() }}
            </p>
          </div>
          <div class="flex justify-between border-t border-gray-100 pt-3">
            <p class="text-lg font-bold text-gray-800">Total</p>
            <p class="text-lg font-bold text-gray-800">
              {{ PLATFORM_CURRENCY }} {{ totalAmount.toLocaleString() }}
            </p>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="mt-8">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Payment Method</h2>
          <p>We currently only support Mobile Money and Visa/Mastercard payments via PesaPal.
            Continuing with this checkout will directly take you to PesaPal's payment page.</p>
        </div>

        <!-- Place Order Button -->
        <button
          @click="placeOrder"
          class="w-full bg-blue-500 text-white py-3 rounded-lg mt-8
          hover:bg-blue-600 transition-colors duration-200"
        >
          Place Order
        </button>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-sm mt-4 text-center">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
// import PesaPalPay from '@/components/PesaPalPay.vue';
import { PLATFORM_CURRENCY, VAT_RATE } from '@/config';
import useNotificationStore from '@/stores/notification';
import useCartStore from '../stores/cart';
import useOrderStore from '../stores/order';

const cartStore = useCartStore();
const orderStore = useOrderStore();
const router = useRouter();
const currency = ref('UGX');
const errorMessage = ref<string>('');
const notificationStore = useNotificationStore();

const subtotal = computed(() => cartStore.totalPrice);
const vatAmount = computed(() => subtotal.value * VAT_RATE);
const totalAmount = computed(() => subtotal.value + vatAmount.value);

const placeOrder = async (): Promise<void> => {
  if (cartStore.cartItems.length === 0) {
    errorMessage.value = 'Your cart is empty!';
    return;
  }

  try {
    notificationStore.addNotification('Processing order...', 'success');
    await orderStore.placeOrder(cartStore.cartItems, totalAmount.value, currency.value);
    cartStore.clearCart();
    router.push('/orders');
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
      notificationStore.addNotification(error.message, 'error');
    } else {
      errorMessage.value = 'Caught an unknown error';
      notificationStore.addNotification('Unknown error', 'error');
    }
  }
};
</script>
