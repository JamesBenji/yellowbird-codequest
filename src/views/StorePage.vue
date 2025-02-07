<!-- eslint-disable linebreak-style -->
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PLATFORM_CURRENCY } from '@/config';
import useNotificationStore from '@/stores/notification';
import useProductStore from '../stores/product';
import useAuthStore from '../stores/auth';
import useCartStore from '../stores/cart';

const productStore = useProductStore();
const authStore = useAuthStore();
const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();
const notificationStore = useNotificationStore();

const selectedCategory = ref(route.query.category || '');

onMounted(async () => {
  // productCategories.value = await productStore.getProductCategories();
  notificationStore.addNotification('Loading...', 'success');
  await productStore.fetchCategories();
  await productStore.fetchProducts();
});

const filteredProducts = computed(() => {
  if (!selectedCategory.value) return productStore.products;
  return productStore.products.filter((product) => product.category === selectedCategory.value);
});

const filterByCategory = (category) => {
  selectedCategory.value = category;
  router.push({ path: '/store', query: { category } });
};

const addToCart = (product) => {
  if (!authStore.user) {
    router.push('/login');
  } else {
    cartStore.addToCart({
      id: product.name,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }
};
</script>
<!-- eslint-disable linebreak-style -->
<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Explore Our Furniture Collection</h1>

    <!-- Category Filters -->
    <div class="relative max-w-full mb-6">
      <div class="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l
      from-white pointer-events-none"></div>
      <div class="flex space-x-4 overflow-x-auto whitespace-nowrap pb-2 custom-scrollbar">
        <button
          v-if="productStore.categories.length > 0"
          @click="filterByCategory('')"
          :class="['p-2 rounded flex-shrink-0 transition-colors duration-300',
          selectedCategory === '' ? 'bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300']"
        >
          All
        </button>
        <p v-if="productStore.categories.length < 1" class="flex-shrink-0">
          Loading categories ...</p>
        <button
          v-else
          v-for="category in productStore.categories"
          :key="category"
          @click="filterByCategory(category)"
          :class="['p-2 rounded flex-shrink-0 transition-colors duration-300',
          selectedCategory === category ?
          'bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300']"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="group border p-4 rounded-lg shadow-md hover:shadow-lg
        transition-shadow duration-300 bg-white"
      >
        <router-link :to="`/product/${product.id}`">
          <img
            :src="product.imageUrl"
            :alt="product.name + 'image'"
            class="w-full h-48 object-cover rounded-lg mb-4
            transition-transform duration-300 group-hover:scale-105"
          />
          <h2 class="text-lg font-semibold text-gray-800">{{ product.name }}</h2>
          <p class="text-gray-600 text-sm mb-2 custom-text-ellipsis">
            {{ product.description }}</p>

          <!-- Price Display -->
           <p v-if="product.hasDiscount" class="font-normal text-sm">
            📌{{ product.discountPercentage }}% Discount</p>
          <div class="flex items-center space-x-2">
            <p
              v-if="product.hasDiscount"
              class="text-gray-400 line-through text-sm"
            >
              {{ PLATFORM_CURRENCY }} {{ product.price.toLocaleString() }}
            </p>
            <p
              :class="['font-bold', product.hasDiscount ? 'text-green-600' : 'text-gray-800']"
            >
              {{ PLATFORM_CURRENCY }}
              {{
                product.hasDiscount
                  ? (
                      product.price *
                      (1 - product.discountPercentage / 100)
                    ).toLocaleString()
                  : product.price.toLocaleString()
              }}
            </p>
          </div>
        </router-link>

        <!-- Add to Cart / Quantity Controls -->
        <div class="mt-4">
          <div v-if="!cartStore.cartItems.some((item) => item.id === product.name)">
            <button
              @click="addToCart(product)"
              class="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700
              transition-colors duration-300"
            >
              {{ authStore.user ? "Add to Cart" : "Login to Purchase" }}
            </button>
          </div>
          <div v-else class="flex items-center justify-between">
            <button
              @click="cartStore.decreaseQuantity(product.name)"
              class="bg-gray-200 text-gray-800 w-8 h-8 rounded-full flex items-center
              justify-center hover:bg-gray-300 transition-colors duration-300"
            >
              -
            </button>
            <span class="text-gray-800 font-semibold">
              {{ cartStore.cartItems.find((item) => item.id === product.name)?.quantity || 0 }}
            </span>
            <button
              @click="cartStore.increaseQuantity(product.name)"
              class="bg-gray-200 text-gray-800 w-8 h-8 rounded-full flex items-center
              justify-center hover:bg-gray-300 transition-colors duration-300"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: linear-gradient(to right, #4f46e5, #818cf8);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to right, #4338ca, #6366f1);
  }
}

.custom-text-ellipsis {
 display: -webkit-box;
 -webkit-line-clamp: 2;
 line-clamp: 2;
 -webkit-box-orient: vertical;
 overflow: hidden;
}
</style>
