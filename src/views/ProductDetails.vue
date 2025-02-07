<!-- eslint-disable linebreak-style -->
<script setup>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { PLATFORM_CURRENCY } from '@/config';
import useProductStore from '../stores/product';
import useAuthStore from '../stores/auth';
import useCartStore from '../stores/cart';

const route = useRoute();
const productStore = useProductStore();
const authStore = useAuthStore();
const cartStore = useCartStore();

const product = computed(() => productStore.products.find((p) => p.id === route.params.id));

onMounted(() => {
  productStore.fetchProducts();
});

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart({
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      quantity: 1,
    });
  }
};
</script>
<!-- eslint-disable linebreak-style -->

<!-- <template>
  <div class="p-6" v-if="product">
    <h1 class="text-2xl font-bold mb-4">{{ product.name }}</h1>
    <img :src="product.imageUrl" :alt="product.name + 'image'"
    class="w-full h-96 object-cover rounded mb-4" />

    <h2 class="text-lg font-semibold">Description</h2>
    <p class="mb-4">{{ product.description }}</p>

    <h2 class="text-lg font-semibold">Gallery</h2>
    <div class="grid grid-cols-3 gap-4">
      <img v-for="url in product.galleryUrls" :key="url" :src="url"
      :alt="product.name + 'image'" class="w-full h-40 object-cover rounded" />
    </div>

    <h2 class="text-lg font-semibold mt-4">Price</h2>
    <p class="font-bold text-green-600"> {{ PLATFORM_CURRENCY }} {{ product.price }}</p>

    <div v-if="authStore.user?.role === 'admin'" class="mt-6">
      <h2 class="text-lg font-semibold">Admin Options</h2>
      <button class="bg-yellow-500 text-white p-2 rounded mt-2">Edit Product</button>
      <button class="bg-red-500 text-white p-2 rounded mt-2 ml-2">Delete Product</button>
    </div>

    <button v-else @click="addToCart" class="bg-blue-500 text-white p-2 rounded mt-4">
        Add to Cart
    </button>
  </div>
</template> -->

<template>
    <div class="p-6 max-w-7xl mx-auto" v-if="product">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Image Section -->
        <div class="flex flex-col items-center">
          <img :src="product.imageUrl" :alt="product.name + 'image'"
               class="w-full max-w-lg h-auto object-contain
               rounded-lg shadow-lg mb-4 transition-transform duration-300 hover:scale-105" />

        </div>

        <!-- Details Section -->
        <div class="space-y-6">
          <h1 class="font-bold text-gray-900 cursive-non-selectable text-6xl">
            {{ product.name }}</h1>

          <div class="prose max-w-none">
            <!-- <h2 class="text-2xl font-semibold text-gray-800 mb-2 cursive-non-selectable">
                Description</h2> -->
            <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>
          </div>

          <div v-if="product.galleryUrls"
            class="prose max-w-none">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">Gallery</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <img v-for="url in product.galleryUrls" :key="url" :src="url"
                   :alt="product.name + 'image'"
                   class="w-full h-32 md:h-40 object-cover rounded-lg
                   border hover:shadow-lg transition-all duration-300 cursor-pointer" />
            </div>
          </div>

          <div class="w-full max-w-lg">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
                {{ PLATFORM_CURRENCY }} {{ product.price.toLocaleString() }}
            </h2>

            <div v-if="authStore.user?.role === 'admin'"
            class="mt-4 space-y-2 flex justify-between">
              <button class="admin-btn bg-yellow-500 hover:bg-yellow-600">
                Edit Product
              </button>
              <button class="admin-btn bg-red-500 hover:bg-red-600 ml-0 md:ml-2">
                Delete Product
              </button>
            </div>

            <button v-else @click="addToCart"
                    class="w-full bg-gray-800 hover:bg-gray-600 my-2
                    text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
<!-- eslint-disable linebreak-style -->

<style scoped>
.admin-btn {
  @apply w-full md:w-auto text-white font-semibold py-2 px-4
  rounded-lg transition-colors duration-300;
}

@media (min-width: 768px) {
  .admin-btn {
    width: auto;
  }
}

.cursive-non-selectable {
  font-family: 'Tangerine', cursive;
  user-select: none;
  font-weight: bold;
}
</style>
