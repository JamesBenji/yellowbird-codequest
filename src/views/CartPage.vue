<!-- eslint-disable linebreak-style -->
<!-- eslint-disable max-len -->

<script setup>
import useCartStore from '../stores/cart';

const cartStore = useCartStore();
</script>
<!-- eslint-disable linebreak-style -->
<!-- eslint-disable max-len -->
<template>
  <div class="p-4 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-2">Shopping Cart</h2>
    <div v-if="cartStore.cartItems.length === 0">
      <p class="text-gray-500">Your cart is empty.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="item in cartStore.cartItems" :key="item.id" class="border-b p-2">
          <span class="font-semibold">{{ item.name }}</span> - ${{ item.price }} x {{ item.quantity }}
          <button @click="cartStore.removeFromCart(item.id)" class="text-red-500 ml-4">Remove</button>
        </li>
      </ul>
      <p class="mt-4 font-bold">Total: ${{ cartStore.totalPrice }}</p>
      <button @click="cartStore.clearCart()" class="bg-red-500 text-white p-2 mt-2 rounded">Clear Cart</button>
    </div>
  </div>
</template>
