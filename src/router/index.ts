import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { firebaseApp } from '@/plugins/vuefire';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import useAuthStore from '@/stores/auth';
import { AppUser, Role } from '@/types';
import HomeView from '../views/HomeView.vue';
import LoginPage from '../views/LoginPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomePage',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUpPage.vue'),
  },
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: () => import('@/views/UserDashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin-panel',
    name: 'AdminPanel',
    component: () => import('@/views/AdminPanel.vue'),
    meta: { requiresAuth: true, isAdminOnly: true },
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: () => import('@/views/CartPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/restricted',
    name: 'Restricted',
    component: () => import('@/views/BlockedPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/CheckOut.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/OrdersPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin-orders',
    name: 'AdminOrders',
    component: () => import('@/views/AdminOrders.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: () => import('@/views/AdminDashboard.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin-products',
    name: 'AdminProducts',
    component: () => import('@/views/AdminProducts.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: () => import('@/views/ProductDetails.vue'),
  },
  {
    path: '/store',
    name: 'StorePage',
    component: () => import('@/views/StorePage.vue'),
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: () => import('@/views/ProfilePage.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const storedUser = localStorage.getItem('userAuth');
let storedRole: Role;
if (storedUser) {
  const { role } = JSON.parse(storedUser) as AppUser;
  storedRole = role;
}

router.beforeEach(async (to, from, next) => {
  const auth = getAuth(firebaseApp);
  const routeRequiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  const isAdminOnly = to.matched.some((route) => route.meta.isAdminOnly);

  await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });

  const user = auth.currentUser;

  if (routeRequiresAuth) {
    if (user) {
      const authStore = useAuthStore();
      const userData = authStore.user;

      if (isAdminOnly) {
        if (userData?.role === 'admin' || storedRole === 'admin') {
          next();
        } else {
          next({ name: 'Restricted' });
        }
      } else {
        next();
      }
    } else {
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});

export default router;
