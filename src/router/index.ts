import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { firebaseApp } from '@/plugins/vuefire';
import { getAuth } from 'firebase/auth';
import useAuthStore from '@/stores/auth';
import BlockedPage from '@/views/BlockedPage.vue';
import AdminPanel from '@/views/AdminPanel.vue';
import HomeView from '../views/HomeView.vue';
import LoginPage from '../views/LoginPage.vue';
import SignUpPage from '../views/SignUpPage.vue';
import UserDashboard from '../views/UserDashboard.vue';

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
    component: SignUpPage,
  },
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin-panel',
    name: 'AdminPanel',
    component: AdminPanel,
    meta: { requiresAuth: true, isAdminOnly: true },
  },
  {
    path: '/restricted',
    name: 'Restricted',
    component: BlockedPage,
    meta: { requiresAuth: true },
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
