/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import { defineStore } from 'pinia';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { firebaseApp } from '@/plugins/vuefire';
import { Product } from '@/types';
import { PRODUCT_COLLECTION } from '@/config';

const db = getFirestore(firebaseApp);

const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    searchQuery: '',
    selectedCategory: 'all',
    priceRange: [0, 10000],
  }),

  getters: {
    filteredProducts: (state) => state.products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
          || product.description.toLowerCase().includes(state.searchQuery.toLowerCase());

      const matchesCategory = state.selectedCategory === 'all' || product.category === state.selectedCategory;

      const matchesPrice = product.price >= state.priceRange[0] && product.price <= state.priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    }),
  },

  actions: {
    async fetchProducts() {
      const querySnapshot = await getDocs(collection(db, PRODUCT_COLLECTION));
      this.products = querySnapshot.docs.map((document) => ({ id: document.id, ...document.data() } as Product));
    },

    async addProduct(product: Omit<Product, 'id'>) {
      await addDoc(collection(db, PRODUCT_COLLECTION), product);
      await this.fetchProducts(); // Refresh list
    },

    async updateProduct(id: string, updatedProduct: Partial<Product>) {
      await updateDoc(doc(db, PRODUCT_COLLECTION, id), updatedProduct);
      await this.fetchProducts();
    },

    async deleteProduct(id: string) {
      await deleteDoc(doc(db, PRODUCT_COLLECTION, id));
      await this.fetchProducts();
    },

    setSearchQuery(query: string) {
      this.searchQuery = query;
    },

    setCategory(category: string) {
      this.selectedCategory = category;
    },

    setPriceRange(range: [number, number]) {
      this.priceRange = range;
    },
  },
});

export default useProductStore;
