import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { firebaseApp } from '@/plugins/vuefire';
import { getAuth } from 'firebase/auth';
import useAuthStore from '@/stores/auth';
import HomeView from '../views/HomeView.vue';
import LoginPage from '../views/LoginPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
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
    component: import('@/views/SignUpPage.vue'),
  },
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: import('@/views/UserDashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin-panel',
    name: 'AdminPanel',
    component: import('@/views/AdminPanel.vue'),
    meta: { requiresAuth: true, isAdminOnly: true },
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: import('@/views/CartPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/restricted',
    name: 'Restricted',
    component: import('@/views/BlockedPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: import('@/views/CheckOut.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: import('@/views/OrdersPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin-orders',
    name: 'AdminOrders',
    component: import('@/views/AdminOrders.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },

  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: import('@/views/AdminDashboard.vue'),
    meta: { requiresAdmin: true },
  },

  {
    path: '/admin-products',
    name: 'AdminProducts',
    component: import('@/views/AdminProducts.vue'),
    meta: { requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth(firebaseApp);
  const routeRequiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  const isAdminOnly = to.matched.some((route) => route.meta.isAdminOnly);

  if (routeRequiresAuth) {
    const user = auth.currentUser;

    if (user) {
      if (isAdminOnly) {
        const userData = useAuthStore().$state.user;
        if (userData?.role === 'admin') {
          next();
        } else {
          next({ name: 'Restricted' });
        }
      }
      next();
    } else {
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});

export default router;
