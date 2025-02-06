<!-- eslint-disable linebreak-style -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Antique Pieces</h1>

    <input
      v-model="productStore.searchQuery"
      type="text"
      placeholder="Search for antiques..."
      class="border p-2 w-full mb-4"
    />

    <label for="category" class="block mb-2">Category:
    <select v-model="productStore.selectedCategory" class="border p-2 mb-4">
      <option v-for="category in categories" :key="category" :value="category">
        {{ category.charAt(0).toUpperCase() + category.slice(1) }}
      </option>
    </select>
  </label>

    <div class="mb-4">
      <label for="min-range" class="block">Price Range:
      <input
        type="range"
        min="0"
        max="10000"
        v-model="productStore.priceRange[0]"
        class="mr-2"
      />
    </label>
      <label for="max-range">
        <input
        type="range"
        min="0"
        max="10000"
        v-model="productStore.priceRange[1]"
      />
      </label>
      <p>Price: ${{ productStore.priceRange[0] }} - ${{ productStore.priceRange[1] }}</p>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div v-for="product in productStore.products" :key="product.id" class="border p-4 rounded">
        <img :src="product.imageUrl" :alt="product.name + 'image'"
        class="w-full h-40 object-cover rounded mb-2" />
        <h2 class="text-lg font-semibold">{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p class="font-bold text-green-600">{{ product.currency }} {{ product.price }}</p>
        <p v-if="product.hasDiscount"
        class="text-red-500">Discount: {{ product.discountPercentage }}%</p>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->

<script setup>
import { onMounted } from 'vue';
import useProductStore from '../stores/product';

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});
</script>
