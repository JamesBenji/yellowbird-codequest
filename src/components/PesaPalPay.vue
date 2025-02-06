<!-- eslint-disable linebreak-style -->
<template>
  <button @click="handlePayment">Pay Now</button>
  <p v-if="orderStore.errorMessage" class="text-red-500 mt-2">{{ orderStore.errorMessage }}</p>
</template>
<!-- eslint-disable linebreak-style -->

<script lang="ts">
import { defineComponent } from 'vue';
import useOrderStore from '@/stores/order';
import useCartStore from '@/stores/cart';

export default defineComponent({
  name: 'PesaPalPay',
  setup() {
    const orderStore = useOrderStore();
    const cartStore = useCartStore();

    const handlePayment = async () => {
      await orderStore.processPesaPalPayment(cartStore.cartItems, cartStore.totalPrice);
    };

    return {
      orderStore,
      handlePayment,
    };
  },
});
</script>
