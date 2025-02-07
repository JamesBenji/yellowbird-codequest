/* eslint-disable linebreak-style */
import { defineStore } from 'pinia';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  browserLocalPersistence,
  setPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import { firebaseApp } from '@/plugins/vuefire';
import { AppUser, Gender } from '@/types';
import { USER_COLLECTION } from '@/config';
import {
  doc, getDoc, getFirestore, setDoc,
} from 'firebase/firestore';

type User = AppUser | null;

const firestore = getFirestore(firebaseApp);

const useAuthStore = defineStore('auth', {
  state() {
    return {
      user: null as User,
    };
  },

  actions: {
    getAuthInstance() {
      return getAuth(firebaseApp);
    },

    async saveUser(userData: AppUser) {
      try {
        await setDoc(doc(firestore, USER_COLLECTION, userData.uid), userData);
      } catch (error: unknown) {
        if (error instanceof Error) throw new Error(error.message);
      }
    },

    async getUser(uid: string): Promise<AppUser | null> {
      try {
        const userDoc = await getDoc(doc(firestore, USER_COLLECTION, uid));
        if (userDoc.exists()) {
          if (!userDoc.data()) return null;
          return userDoc.data() as AppUser;
        }
        return null;
      } catch (error: unknown) {
        if (error instanceof Error) throw new Error(error.message);
        throw new Error('Error getting user');
      }
    },

    async signUp(
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      gender: Gender,
    ) {
      const auth = this.getAuthInstance();
      await setPersistence(auth, browserLocalPersistence);
      if (!auth) throw new Error('Firebase Authentication is not initialized.');

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        const userData: AppUser = {
          email,
          firstName,
          lastName,
          gender,
          role: 'customer',
          createdAt: new Date(),
          uid: firebaseUser.uid,
          purchasesRef: '',
        };

        await this.saveUser(userData);
        localStorage.setItem('userAuth', JSON.stringify(userData));
      } catch (error: unknown) {
        throw this.handleFirebaseError(error);
      }
    },

    async login(email: string, password: string) {
      const auth = this.getAuthInstance();
      await setPersistence(auth, browserLocalPersistence);
      if (!auth) throw new Error('Firebase authentication is not initialized');

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        this.user = await this.getUser(firebaseUser.uid);
      } catch (error: unknown) {
        throw this.handleFirebaseError(error);
      }
    },

    async logOut() {
      const auth = this.getAuthInstance();
      if (!auth) throw new Error('Firebase auth is not initialized.');

      try {
        await signOut(auth);
        this.user = null;
        localStorage.removeItem('userAuth');
      } catch (error: unknown) {
        throw new Error('Log Out failed. Please try again.');
      }
    },

    persistUserAuth() {
      const auth = this.getAuthInstance();
      const storedUser = localStorage.getItem('userAuth');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
      if (!auth) return;

      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const user = await this.getUser(firebaseUser.uid);
          localStorage.setItem('userAuth', JSON.stringify(user));
          this.user = user;
        } else {
          this.user = null;
          localStorage.removeItem('userAuth');
        }
      });
    },

    initialize() {
      this.persistUserAuth();
    },

    async authenticateWithGoogle() {
      const auth = this.getAuthInstance();
      await setPersistence(auth, browserLocalPersistence);
      if (!auth) throw new Error('Firebase Authentication is not initialized.');

      const provider = new GoogleAuthProvider();

      try {
        const result = await signInWithPopup(auth, provider);
        const firebaseUser = result.user;

        const existingUser = await this.getUser(firebaseUser.uid);
        if (!existingUser) {
          const userData: AppUser = {
            email: firebaseUser.email || '',
            firstName: firebaseUser.displayName?.split(' ')[0] || '',
            lastName: firebaseUser.displayName?.split(' ')[1] || '',
            gender: 'unspecified',
            role: 'customer',
            createdAt: new Date(),
            uid: firebaseUser.uid,
            purchasesRef: '',
            address: '',
          };

          await this.saveUser(userData);
          this.user = userData;
        } else {
          this.user = existingUser;
        }
      } catch (error) {
        throw this.handleFirebaseError(error);
      }
    },

    handleFirebaseError(error: unknown): Error {
      if (error instanceof Error) {
        const firebaseError = error as { code?: string };
        switch (firebaseError.code) {
          case 'auth/email-already-in-use':
            return new Error('This email is already registered.');
          case 'auth/invalid-email':
            return new Error('Invalid email format.');
          case 'auth/weak-password':
            return new Error('Password should be at least 6 characters.');
          case 'auth/user-not-found':
            return new Error('No account found with this email.');
          case 'auth/wrong-password':
            return new Error('Incorrect password. Please try again.');
          case 'auth/too-many-requests':
            return new Error('Too many failed attempts. Please try again later.');
          default:
            return new Error(error.message || 'Authentication failed. Please try again.');
        }
      }
      return new Error('An unknown error occurred.');
    },
  },
});

// const authStore = useAuthStore();
// authStore.initialize();

export default useAuthStore;
