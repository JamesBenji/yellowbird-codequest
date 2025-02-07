<!-- eslint-disable linebreak-style -->

<!-- <template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Admin Product Management</h1>

    <div class="mb-6">
      <label for="name">
        <input v-model="name" type="text" placeholder="Name" class="border p-2 w-full mb-2" />
      </label>
      <label for="description">
        <textarea v-model="description"
        placeholder="Description" class="border p-2 w-full mb-2"></textarea>
      </label>
      <label for="price">
        <input v-model="price" type="number" placeholder="Price" class="border p-2 w-full mb-2" />
      </label>
      <label for="imageUrl">
        Main image
        <input v-model="imageUrl"
        type="text" placeholder="Paste image URL" class="border p-2 w-full mb-2" />
        or upload image file
        <input type="file" @change="handleFileUpload"
        class="border p-2 w-full mb-2" accept="image/*"/>
      </label>

      <label for="galleryImages">
        Gallery Images:
        <input type="file" multiple accept="image/*"
        @change="handleGalleryUpload" class="border p-2 w-full mb-2" />
      </label>
      <button @click="addGalleryUrl"
      class="bg-green-500 text-white p-2 rounded mt-2">+ Add Gallery URL</button>

      <div v-for="(url, index) in galleryUrls" :key="index" class="flex items-center mt-2">
        <input v-model="galleryUrls[index]" type="text"
        disabled class="border p-2 w-full" />
        <button @click="removeGalleryUrl(index)"
        class="bg-red-500 text-white p-2 ml-2">Remove</button>
      </div>

      <button @click="addProduct" class="bg-blue-500 text-white p-2 rounded">Add Product</button>
    </div>

    <h2 class="text-xl font-bold mb-4">Existing Products</h2>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="product in productStore.products" :key="product.id" class="border p-4 rounded">
        <img :src="product.imageUrl"
        :alt="product.name + 'image'" class="w-full h-40 object-cover rounded mb-2" />
        <h2 class="text-lg font-semibold">{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p class="font-bold text-green-600">${{ product.price }}</p>

        <p>Stock: {{ product.stockQuantity }}</p>
        <button @click="editProduct(product)" class="bg-yellow-500 text-white p-2 rounded mt-2">
          Edit Stock
        </button>
        <button @click="productStore.deleteProduct(product.id)"
        class="bg-red-500 text-white p-2 rounded mt-2">
          Delete
        </button>
      </div>
    </div>

    <div v-if="selectedProduct" class="mt-6">
      <h2 class="text-xl font-bold mb-2">Edit Stock for: {{ selectedProduct.name }}</h2>
      <label for="newStockQuantity">
        <input v-model="newStockQuantity" type="number" class="border p-2 mb-2" />
      </label>
      <button @click="updateStock" class="bg-green-500 text-white p-2 rounded">Update Stock</button>
    </div>

    <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Manage Categories</h1>

    <label for="newCategory">
      <input v-model="newCategory" type="text"
    placeholder="New Category" class="border p-2 w-full mb-2" />
    </label>
    <button :disabled="newCategory ? false : true" @click="productStore.addCategory(newCategory)"
    class="bg-green-500 text-white p-2 rounded">Add Category</button>

    <h2 class="text-xl font-bold mt-6">Existing Categories</h2>
    <ul>
      <li v-for="category in productStore.categories" :key="category">{{ category }}</li>
    </ul>
  </div>
  </div>
</template> -->
<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Admin Product Management</h1>

    <!-- Product Form -->
    <div class="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Add New Product</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="name" type="text"
        placeholder="Product Name" class="border p-3 rounded" />
        <label for="price">
          Price
          <input v-model="price" type="number"
        placeholder="Price" class="border p-3 rounded" />
        </label>
      </div>

      <label for="description">
        <textarea v-model="description"
      placeholder="Description" class="border p-3 rounded w-full mt-4"></textarea>
      </label>

      <!-- Image Upload -->
      <div class="flex flex-wrap justify-between items-center align-middle mt-4 gap-4">
        <label for="imageUrl" class="flex-1 font-semibold text-gray-700">Main Image &nbsp;
          <input v-model="imageUrl" type="text" placeholder="Paste image URL"
          class="border p-3 rounded w-full" />
        </label>
        <div class="mt-2 flex items-center">
          <label for="uploadMainImage"> &nbsp;
            <input type="file" @change="handleFileUpload" accept="image/*"
          class="rounded w-full" />
          </label>
        </div>
      </div>

      <!-- Gallery Upload -->
      <div class="mt-4">
        <!-- <label for="galleryFiles" class="block font-semibold text-gray-700">Gallery Images
        <input type="file" multiple accept="image/*" @change="handleGalleryUpload"
        class="border p-3 rounded w-full" />
      </label> -->
      <p class="block font-semibold text-gray-700">Gallery images</p>
      </div>

      <div class="mt-4">
        <button @click="addGalleryUrl"
        class="bg-green-500 text-white px-4 py-2 rounded">+ Add Gallery URL</button>
      </div>

      <div v-for="(url, index) in galleryUrls" :key="index"
      class="flex items-center mt-2">
        <label for="galleryUrls">
          <input v-model="galleryUrls[index]" type="text"
        class="border p-3 w-full rounded" />
        </label>
        <button @click="removeGalleryUrl(index)"
        class="bg-red-500 text-white px-3 py-2 ml-2 rounded">Remove</button>
      </div>

      <button @click="addProduct"
      class="bg-blue-600 text-white px-6 py-2 rounded mt-4 w-full">Add Product</button>
    </div>

    <!-- Existing Products -->
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Existing Products</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="product in productStore.products" :key="product.id"
      class="bg-white p-4 rounded-lg shadow-md">
        <img :src="product.imageUrl" :alt="product.name"
        class="w-full h-40 object-cover rounded mb-3" />
        <h3 class="text-lg font-semibold">{{ product.name }}</h3>
        <p class="text-gray-600">{{ product.description }}</p>
        <p class="text-green-600 font-bold">${{ product.price }}</p>
        <p class="text-gray-600">Stock: {{ product.stockQuantity }}</p>

        <div class="flex space-x-2 mt-3">
          <button @click="editProduct(product)"
          class="bg-yellow-500 text-white px-4 py-2 rounded">Edit Stock</button>
          <button @click="productStore.deleteProduct(product.id)"
          class="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Stock Editing -->
    <div v-if="selectedProduct" class="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-bold text-gray-800 mb-2">
        Edit Stock for: {{ selectedProduct.name }}</h2>
      <label for="stockQuantity">
        <input v-model="newStockQuantity" type="number"
      class="border p-3 rounded w-full mb-2" />
      </label>
      <button @click="updateStock"
      class="bg-green-500 text-white px-6 py-2 rounded">Update Stock</button>
    </div>

    <!-- Category Management -->
    <div class="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Manage Categories</h2>
      <div class="flex space-x-2">
        <label for="newCategory">
          <input v-model="newCategory" type="text" placeholder="New Category"
        class="border p-3 rounded w-full" />
        </label>
        <button :disabled="!newCategory" @click="productStore.addCategory(newCategory)"
        class="bg-green-500 text-white px-6 py-2 rounded">
          Add Category
        </button>
      </div>
      <h3 class="text-xl font-bold mt-6">Existing Categories</h3>
      <ul class="list-disc ml-6 mt-2 text-gray-700">
        <li v-for="category in productStore.categories" :key="category">{{ category }}</li>
      </ul>
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Product } from '@/types';
import useProductStore from '../stores/product';

const productStore = useProductStore();
const selectedProduct = ref<Product | null>(null);
const newStockQuantity = ref(0);
const name = ref('');
const description = ref('');
const price = ref(0);
const imageUrl = ref('');
const newCategory = ref('');
// const selectedFile = ref<File | null>(null);
const galleryUrls = ref<string[]>([]);
const selectedGalleryFiles = ref<File[]>([]);

onMounted(() => {
  productStore.fetchProducts();
  productStore.fetchCategories();
});

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;
  productStore.uploadImage(target.files[0]);
};

const handleGalleryUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;
  selectedGalleryFiles.value = Array.from(target.files);
  const urls = await Promise.all(
    selectedGalleryFiles.value.map((file) => productStore.uploadImage(file)),
  );
  galleryUrls.value.push(...urls);
};

const addGalleryUrl = () => {
  galleryUrls.value.push('');
};

const removeGalleryUrl = (index: number) => {
  galleryUrls.value.splice(index, 1);
};

const addProduct = async () => {
  await productStore.addProduct({
    name: name.value,
    description: description.value,
    price: price.value,
    imageUrl: imageUrl.value,
  } as Omit<Product, 'id'>);

  name.value = '';
  imageUrl.value = '';
  description.value = '';
  price.value = 0;
};

const editProduct = (product: Product) => {
  selectedProduct.value = product;
  newStockQuantity.value = parseInt(product.stockQuantity, 10);
};

const updateStock = async () => {
  if (selectedProduct.value) {
    await productStore.updateProduct(selectedProduct.value.id, {
      stockQuantity: newStockQuantity.value.toString(),
      stockLevel: newStockQuantity.value > 5 ? 'in_stock' : 'low_stock',
    });
    selectedProduct.value = null;
    newStockQuantity.value = 0;
  }
};
</script>
