<!-- eslint-disable linebreak-style -->

<template>
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
        <input v-model="imageUrl"
        type="text" placeholder="Image URL" class="border p-2 w-full mb-2" />
      </label>

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
  </div>
</template>
<!-- eslint-disable linebreak-style -->

<script setup>
import { ref, onMounted } from 'vue';
import useProductStore from '../stores/product';

const productStore = useProductStore();
const selectedProduct = ref(null);
const newStockQuantity = ref(0);
const name = ref('');
const description = ref('');
const price = ref(0);
const imageUrl = ref('');

onMounted(() => {
  productStore.fetchProducts();
});

const addProduct = async () => {
  await productStore.addProduct({
    name: name.value,
    description: description.value,
    price: price.value,
    imageUrl: imageUrl.value,
  });

  name.value = '';
  imageUrl.value = '';
  description.value = '';
  price.value = 0;
};

const editProduct = (product) => {
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
