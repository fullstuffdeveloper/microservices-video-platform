<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()
const logout = () => {
  authStore.logOut()
  // send user to login page
  router.push('/login')
}
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    Yayyy, Welcome to Microservices-Based Media Streaming Platform
    <!-- // logout button -->
    <button @click="logout">Logout</button>
  </main>
</template>
