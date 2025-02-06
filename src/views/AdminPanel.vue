<!-- eslint-disable linebreak-style -->

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Admin Panel - Manage Antiques</h1>

    <div class="mb-6">
      <label for="productName">
        Name
        <input
        name="productName" v-model="newProduct.name"
        type="text" placeholder="Name" class="border p-2 w-full mb-2" />
      </label>
      <label for="productDescription">
        Description
        <textarea name="productDescription" v-model="newProduct.description"
        placeholder="Description" class="border p-2 w-full mb-2"></textarea>
      </label>
      <label for="productPrice">
        Price
        <input
        name="productPrice" v-model="newProduct.price"
        type="number" placeholder="Price" class="border p-2 w-full mb-2" />
      </label>
      <label for="productImageUrl">
        ImageUrl
        <input
        name="productImageUrl" v-model="newProduct.imageUrl"
        type="text" placeholder="Image URL" class="border p-2 w-full mb-2" />
      </label>
      <label for="productGalleryUrl">
        Product Gallery (comma-separated urls)
        <input
        name="productGalleryUrl" v-model="newProduct.galleryUrls"
        type="text" placeholder="Gallery URLs (comma-separated)" class="border p-2 w-full mb-2"
        @input="handleGalleryUrls" />
      </label>
      <label for="productStockQuantity">
        Number of units
        <input
        name="productStockQuantity" v-model="newProduct.stockQuantity"
        type="number" placeholder="Stock Quantity" class="border p-2 w-full mb-2" />
      </label>

      <div class="mb-2">
        <label for="hasDiscount" class="block">Has Discount:
        <input name="hasDiscount" v-model="newProduct.hasDiscount" type="checkbox" />
      </label>
      </div>

      <label for="discountPercentage"  v-if="newProduct.hasDiscount">
        Discount percentage
        <input name="discountPercentage"
        v-model="newProduct.discountPercentage" type="number" placeholder="Discount %"
        class="border p-2 w-full mb-2" />
      </label>
      <label for="category" class="block">Category:
      <select v-model="newProduct.category" name="category" class="border p-2 w-full mb-2">
        <option value="furniture">Furniture</option>
        <option value="jewelry">Jewelry</option>
        <option value="art">Art</option>
        <option value="coins">Coins</option>
      </select>
    </label>

      <label for="stockLevel" class="block">Stock Level:
      <select name="stockLevel" v-model="newProduct.stockLevel" class="border p-2 w-full mb-2">
        <option value="in_stock">In Stock</option>
        <option value="low_stock">Low Stock</option>
        <option value="out_of_stock">Out of Stock</option>
      </select>
    </label>

      <label for="currency" class="block">Currency:
      <select name="currency" v-model="newProduct.currency" class="border p-2 w-full mb-2">
        <option value="UGX" selected>UGX</option>
      </select>
    </label>

      <button @click="addProduct" class="bg-blue-500 text-white p-2 rounded">Add Product</button>
    </div>

    <h2 class="text-xl font-bold mb-4">Existing Products</h2>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="product in productStore.products" :key="product.id" class="border p-4 rounded">
        <img :src="product.imageUrl" :alt="product.imageUrl + 'image'"
        class="w-full h-40 object-cover rounded mb-2" />
        <h2 class="text-lg font-semibold">{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p class="font-bold text-green-600">{{ product.currency }} {{ product.price }}</p>
        <button @click="productStore.deleteProduct(product.id)"
        class="bg-red-500 text-white p-2 rounded mt-2">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->

<script setup lang="ts">
import { Product } from '@/types';
import { ref, onMounted } from 'vue';
import useProductStore from '../stores/product';

type newProductType = Omit<Product, 'id'>

const productStore = useProductStore();
const newProduct = ref<newProductType>({
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  galleryUrls: [],
  hasDiscount: false,
  discountPercentage: 0,
  category: '',
  stockLevel: 'in_stock',
  currency: 'UGX',
  stockQuantity: '0',
});

onMounted(() => {
  productStore.fetchProducts();
});

const addProduct = async () => {
  await productStore.addProduct(newProduct.value);
  newProduct.value = {
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    galleryUrls: [],
    hasDiscount: false,
    discountPercentage: 0,
    category: '',
    stockLevel: 'in_stock',
    currency: 'USD',
    stockQuantity: '0',
  };
};

const handleGalleryUrls = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target) {
    newProduct.value.galleryUrls = target.value.split(',');
  }
};
</script>
