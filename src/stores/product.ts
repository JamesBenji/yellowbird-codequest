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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { firebaseApp } from '@/plugins/vuefire';
import { Product } from '@/types';
import { CATEGORIES_COLLECTION, PRODUCT_COLLECTION } from '@/config';

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    categories: [] as string[],
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

    async uploadImage(file: File): Promise<string> {
      const storageRef = ref(storage, `products/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          null,
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          },
        );
      });
    },

    async getProductCategories() {
      if (this.categories.length < 1) await this.fetchCategories();
      return this.categories;
    },

    async fetchCategories() {
      const querySnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
      this.categories = querySnapshot.docs.map((d) => d.id);
    },

    async addCategory(name: string) {
      await addDoc(collection(db, CATEGORIES_COLLECTION), { name });
      await this.fetchCategories();
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
