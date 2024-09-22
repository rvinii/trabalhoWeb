// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';

// Importar as views
import HomePage from '../views/HomePage.vue';
import CatalogoPage from '../views/CatalogoPage.vue';
import LivroDetalhesPage from '../views/LivroDetalhesPage.vue';
import UserLogin from '../views/UserLogin.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import NovoLivro from '../views/NovoLivro.vue';
import EditarLivro from '../views/EditarLivro.vue';

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/catalogo', name: 'CatalogoPage', component: CatalogoPage },
  { path: '/livro/:id', name: 'LivroDetalhesPage', component: LivroDetalhesPage },
  { path: '/login', name: 'UserLogin', component: UserLogin },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/novo-livro',
    name: 'NovoLivro',
    component: NovoLivro,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/editar-livro/:id',
    name: 'EditarLivro',
    component: EditarLivro,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guarda de rota
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
