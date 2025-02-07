<!-- eslint-disable max-len -->
<script lang="ts">
import { COMPANY_NAME } from '@/config';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  setup() {
    return {
      COMPANY_NAME,
    };
  },
  // components: {
  //   AuthForm,
  // },
});
</script>
<!-- eslint-disable max-len -->

<template>
  <div class="bg-gray-100">
    <!-- 🏡 Hero Section -->
    <section class="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
    style="background-image: url('/assets/images/hero-furniture.jpg');">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative text-center text-white">
        <h1 class="text-5xl font-bold">{{ COMPANY_NAME }} - Elegant & Timeless Furniture</h1>
        <p class="mt-4 text-lg">Crafted for comfort, designed for style.</p>
        <router-link to="/store"
        class="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded text-lg">
          Shop Now
        </router-link>
      </div>
    </section>

    <!-- 🛋️ Featured Collections -->
    <section class="py-16 px-8">
      <h2 class="text-3xl font-bold text-center">Discover Our Exclusive Collections</h2>
      <p class="text-center text-gray-600 mt-2">Furniture that blends elegance, functionality, and craftsmanship.</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <!-- Collection Card -->
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src="/assets/images/living-room.jpg" alt="Living Room" class="w-full h-64 object-cover">
          <div class="p-4">
            <h3 class="text-xl font-semibold">Living Room</h3>
            <p class="text-gray-600">Find the perfect sofas, coffee tables, and decor for a cozy space.</p>
            <router-link to="/store?category=living-room" class="mt-3 inline-block text-yellow-500 hover:text-yellow-600 font-semibold">Explore Collection →</router-link>
          </div>
        </div>

        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src="/assets/images/bedroom.jpg" alt="Bedroom" class="w-full h-64 object-cover">
          <div class="p-4">
            <h3 class="text-xl font-semibold">Bedroom</h3>
            <p class="text-gray-600">Elegant beds, wardrobes, and nightstands for a restful retreat.</p>
            <router-link to="/store?category=bedroom" class="mt-3 inline-block text-yellow-500 hover:text-yellow-600 font-semibold">Explore Collection →</router-link>
          </div>
        </div>

        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src="/assets/images/dining.jpg" alt="Dining Room" class="w-full h-64 object-cover">
          <div class="p-4">
            <h3 class="text-xl font-semibold">Dining Room</h3>
            <p class="text-gray-600">Tables, chairs, and cabinets to complete your dining experience.</p>
            <router-link to="/store?category=dining-room" class="mt-3 inline-block text-yellow-500 hover:text-yellow-600 font-semibold">Explore Collection →</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 🏠 Why Choose Us -->
    <section class="bg-gray-900 text-white py-16 px-8">
      <h2 class="text-3xl font-bold text-center">Why Choose {{ COMPANY_NAME }}?</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div class="flex items-center">
          <div class="text-yellow-400 text-4xl mr-4">⭐</div>
          <div>
            <h3 class="text-xl font-semibold">Premium Quality</h3>
            <p>Every piece is crafted with the finest materials for durability and comfort.</p>
          </div>
        </div>
        <div class="flex items-center">
          <div class="text-yellow-400 text-4xl mr-4">🚚</div>
          <div>
            <h3 class="text-xl font-semibold">Fast & Free Delivery</h3>
            <p>Enjoy hassle-free shipping on all orders with fast delivery times.</p>
          </div>
        </div>
        <div class="flex items-center">
          <div class="text-yellow-400 text-4xl mr-4">💰</div>
          <div>
            <h3 class="text-xl font-semibold">Affordable Prices</h3>
            <p>Luxury furniture at unbeatable prices with flexible payment options.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ✨ Testimonials -->
    <section class="py-16 px-8">
      <h2 class="text-3xl font-bold text-center">What Our Customers Say</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div class="bg-white shadow-lg rounded-lg p-6">
          <p class="text-gray-600">"Absolutely love my new sofa! The quality and design exceeded my expectations."</p>
          <p class="mt-2 text-sm text-gray-500">- Alice M.</p>
        </div>
        <div class="bg-white shadow-lg rounded-lg p-6">
          <p class="text-gray-600">"The dining table set is stunning! Delivery was fast and customer service was excellent."</p>
          <p class="mt-2 text-sm text-gray-500">- James K.</p>
        </div>
        <div class="bg-white shadow-lg rounded-lg p-6">
          <p class="text-gray-600">"Great prices for such high-quality furniture. Will definitely buy again!"</p>
          <p class="mt-2 text-sm text-gray-500">- Sophia R.</p>
        </div>
      </div>
    </section>

    <!-- 🛍️ CTA Section -->
    <section class="bg-yellow-500 text-white py-16 text-center">
      <h2 class="text-4xl font-bold">Transform Your Space with {{ COMPANY_NAME }}</h2>
      <p class="text-lg mt-2">Find the perfect furniture pieces to complement your home.</p>
      <router-link to="/store" class="mt-4 inline-block bg-white text-yellow-500 px-6 py-3 rounded text-lg">Shop Now</router-link>
    </section>
  </div>
</template>
