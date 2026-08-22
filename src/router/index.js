import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import AddReceiptView from '../views/AddReceiptView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/dashboard', name: 'dashboard', component: DashboardView },
    { path: '/add-receipt', name: 'add-receipt', component: AddReceiptView },
    { path: '/profile', name: 'profile', component: ProfileView },
  ],
})

export default router