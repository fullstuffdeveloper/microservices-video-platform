import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import adminView from '@/views/adminView.vue'
import userView from '@/views/userView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
    { path: '/login', name: 'login', component: Login },
    { path: '/admin', name: 'admin', component: adminView },
    { path: '/user', name: 'user', component: userView },
    { path: '/test', name: 'test', component: () => import('@/views/Test.vue') },
  ],
})

export default router
