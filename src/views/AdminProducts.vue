<!-- eslint-disable linebreak-style -->
<template>
  <div class="max-w-4xl mx-auto p-8 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

    <div class="grid gap-8">
      <!-- Product Form -->
      <form @submit.prevent="addProduct" class="bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Add New Product</h2>

        <div class="space-y-6">
          <div class="grid md:grid-cols-2 gap-6">
            <label for="name" class="block">
              <span class="text-gray-700 mb-2">Product Name *</span>
              <input v-model="name" type="text" required
                     class="w-full px-4 py-2 mt-1 border rounded-lg
                     focus:ring-2 focus:ring-blue-500" />
            </label>

            <label for="price" class="block">
              <span class="text-gray-700 mb-2">Price *</span>
              <input v-model="price" type="number" step="0.01" min="0" required
                     class="w-full px-4 py-2 mt-1 border rounded-lg
                     focus:ring-2 focus:ring-blue-500" />
            </label>
          </div>

          <label for="description" class="block">
            <span class="text-gray-700 mb-2">Description *</span>
            <textarea v-model="description" rows="4" required
                      class="w-full px-4 py-2 mt-1 border rounded-lg
                      focus:ring-2 focus:ring-blue-500"></textarea>
          </label>

          <label for="imageUrl" class="block">
            <span class="text-gray-700 mb-2">Main Image URL *</span>
            <input v-model="imageUrl" type="text" required
                   class="w-full px-4 py-2 mt-1 border rounded-lg
                   focus:ring-2 focus:ring-blue-500" />
          </label>

          <div class="grid md:grid-cols-2 gap-6">
            <label for="category" class="block">
              <span class="text-gray-700 mb-2">Category *</span>
              <select v-model="category" required
                      class="w-full px-4 py-2 mt-1 border rounded-lg
                      focus:ring-2 focus:ring-blue-500">
                <option value="" disabled>Select a category</option>
                <option v-for="cat in productStore.categories" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>
            </label>

            <label for="stockQuantity" class="block">
              <span class="text-gray-700 mb-2">Stock Quantity *</span>
              <input v-model.number="stockQuantity" type="number" min="0" required
                     class="w-full px-4 py-2 mt-1 border rounded-lg
                     focus:ring-2 focus:ring-blue-500" />
            </label>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <label for="discount" class="block">
              <span class="text-gray-700 mb-2">Discount</span>
              <div class="flex items-center gap-3 mt-1">
                <input v-model="hasDiscount" type="checkbox"
                       class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                <span>Apply Discount</span>
              </div>
            </label>

            <label for="discountPercentage" class="block" v-if="hasDiscount">
              <span class="text-gray-700 mb-2">Discount Percentage</span>
              <input v-model.number="discountPercentage" type="number" min="0" max="100"
                     class="w-full px-4 py-2 mt-1 border rounded-lg
                     focus:ring-2 focus:ring-blue-500" />
            </label>
          </div>

          <!-- Gallery Section -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-medium text-gray-800">Gallery Images</h3>
              <button @click.prevent="addGalleryUrl" type="button"
                      class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Add Image URL
              </button>
            </div>

            <div class="space-y-3">
              <label for="galleryUrls" v-for="(url, index) in galleryUrls" :key="index"
              class="flex gap-3">
                <input v-model="galleryUrls[index]" type="text"
                       class="flex-1 px-4 py-2 border rounded-lg
                       focus:ring-2 focus:ring-blue-500" />
                <button @click.prevent="removeGalleryUrl(index)" type="button"
                        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Remove
                </button>
              </label>
            </div>
          </div>

          <button type="submit" :disabled="isAddingProduct"
                  class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                         disabled:opacity-50 disabled:cursor-not-allowed">
            {{ isAddingProduct ? 'Adding...' : 'Add Product' }}
          </button>
        </div>
      </form>

      <!-- Category Management -->
      <div class="bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Categories</h2>

        <form @submit.prevent="addCategory" class="flex gap-4 mb-6">
          <label for="newCategory">
            <input v-model="newCategory" type="text" required
                 placeholder="New category name"
                 class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </label>
          <button type="submit" :disabled="!newCategory || isAddingCategory"
                  class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600
                         disabled:opacity-50 disabled:cursor-not-allowed">
            {{ isAddingCategory ? 'Adding...' : 'Add' }}
          </button>
        </form>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-medium text-gray-700 mb-3">Existing Categories</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="category in productStore.categories" :key="category"
                  class="px-3 py-1 bg-gray-200 rounded-full text-sm">
              {{ category }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Product } from '@/types';
import useNotificationStore from '@/stores/notification';
import useProductStore from '../stores/product';

const productStore = useProductStore();
const notificationStore = useNotificationStore();

const name = ref('');
const description = ref('');
const price = ref<number>(0);
const imageUrl = ref('');
const category = ref('');
const stockQuantity = ref<number>(0);
const hasDiscount = ref(false);
const discountPercentage = ref<number>(0);
const galleryUrls = ref<string[]>([]);
const newCategory = ref('');
const isAddingProduct = ref(false);
const isAddingCategory = ref(false);

onMounted(() => {
  notificationStore.addNotification('Loading...', 'success');
  productStore.fetchProducts();
  productStore.fetchCategories();
});

const addGalleryUrl = () => galleryUrls.value.push('');
const removeGalleryUrl = (index: number) => galleryUrls.value.splice(index, 1);

const addProduct = async () => {
  try {
    isAddingProduct.value = true;
    const productData: Omit<Product, 'id'> = {
      name: name.value,
      description: description.value,
      price: price.value,
      imageUrl: imageUrl.value,
      category: category.value,
      stockQuantity: stockQuantity.value,
      stockLevel: stockQuantity.value > 0 ? 'in_stock' : 'out_of_stock',
      hasDiscount: hasDiscount.value,
      discountPercentage: hasDiscount.value ? discountPercentage.value : 0,
      galleryUrls: galleryUrls.value.filter((url) => url.trim() !== ''),
    };

    await productStore.addProduct(productData);

    // Reset form
    name.value = '';
    description.value = '';
    price.value = 0;
    imageUrl.value = '';
    category.value = '';
    stockQuantity.value = 0;
    hasDiscount.value = false;
    discountPercentage.value = 0;
    galleryUrls.value = [];

    notificationStore.addNotification('Product added successfully!', 'success');
  } catch (error) {
    notificationStore.addNotification('Error adding product', 'error');
  } finally {
    isAddingProduct.value = false;
  }
};

const addCategory = async () => {
  try {
    isAddingCategory.value = true;
    await productStore.addCategory(newCategory.value);
    newCategory.value = '';
    notificationStore.addNotification('Category added successfully!', 'success');
  } catch (error) {
    notificationStore.addNotification('Error adding category', 'error');
  } finally {
    isAddingCategory.value = false;
  }
};
</script>
<!-- eslint-disable linebreak-style -->
