/* eslint-disable linebreak-style */
import { defineStore } from 'pinia';
import {
  getFirestore, doc, getDoc, updateDoc,
} from 'firebase/firestore';
import { firebaseApp } from '@/plugins/vuefire';
import useAuthStore from './auth';

const db = getFirestore(firebaseApp);

type UserData = { email: string; firstName: string; lastName: string; address: string }

const useUserStore = defineStore('user', {
  state: () => ({
    profile: null as UserData | null,
  }),

  actions: {
    async fetchUserProfile() {
      const authStore = useAuthStore();
      if (!authStore.user) return;

      const userRef = doc(db, 'Users', authStore.user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        this.profile = userDoc.data() as UserData;
      }
    },

    async updateUserProfile(
      updatedData: { firstName: string; lastName: string; address: string; },
    ) {
      const authStore = useAuthStore();
      if (!authStore.user || !this.profile) return;

      const userRef = doc(db, 'Users', authStore.user.uid);
      await updateDoc(userRef, updatedData);
      this.profile = { ...this.profile, ...updatedData };
    },
  },
});

export default useUserStore;
