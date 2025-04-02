// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/scss/main.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import './assets/main.css'
import ElementPlus from 'element-plus'
import { useAuthStore } from '@/stores/authStore'
import { browserLocalPersistence, setPersistence, getAuth } from 'firebase/auth'

// Initialize Firebase Authentication
import '@/api/firebaseConfig'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const auth = getAuth()

  // Ensure the auth listener is initialized
  if (!authStore.user) {
    await authStore.initializeAuthListener()
  }

  const isAuthenticated = !!authStore.user

  // Redirect unauthenticated users to the sign-in page
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'signin' }) // Store the intended path
  }

  // Redirect authenticated users away from sign-in or sign-up pages
  if ((to.name === 'signin' || to.name === 'signup') && isAuthenticated) {
    next({ name: 'home' }) // Redirect to the home page or another default page
  }

  next() // Allow navigation to proceed
})

app.mount('#app')
