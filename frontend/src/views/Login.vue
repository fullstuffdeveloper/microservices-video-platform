<template>
  <div class="flex h-screen">
    <!-- Left Side Image -->
    <div class="w-1/2 relative bg-blue-600">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/multilingual-ecommerce.firebasestorage.app/o/signin-new.svg?alt=media&token=d76ec42d-0440-4965-8403-87d7d2230eff"
        alt="Placeholder"
        class="w-full h-full object-cover mix-blend-multiply"
      />
    </div>
    <!-- Right Side Form -->
    <div class="w-1/2 flex flex-col justify-center items-center px-16">
      <div class="login-box bg-white shadow-lg p-10 rounded-lg w-full max-w-md">
        <!-- Heading -->
        <h1 class="text-4xl font-semibold mb-4 text-gray-900 text-red">Welcome back!</h1>
        <div class="mb-6 flex items-center">
          <span class="text-white bg-yellow-500 text-sm mr-2 px-2 py-1 rounded-md shadow-md">
            Please sign-in with Google, sorry for the inconvenience.
          </span>

          <!-- <router-link to="/signup" class="text-blue-500 font-semibold text-sm"
            >Sign Up</router-link
          > -->
        </div>
        <!-- Email Field -->
        <div class="w-full mb-4">
          <label for="email" class="block text-gray-700 text-sm font-medium">Email Address</label>
          <el-input
            placeholder="Enter your email"
            type="email"
            v-model="email"
            :disabled="true"
            class="mt-1"
          ></el-input>
        </div>
        <!-- Password Field -->
        <div class="w-full mb-6">
          <label for="password" class="block text-gray-700 text-sm font-medium">Password</label>
          <el-input
            placeholder="Enter your password"
            type="password"
            v-model="password"
            :disabled="true"
            class="mt-1"
            show-password
          ></el-input>
        </div>
        <!-- Login Button -->
        <el-button type="primary" class="w-full py-3 mb-4" @click="handleLogin" :disabled="true">
          Login
        </el-button>
        <div class="flex justify-between items-center w-full text-sm">
          <span class="text-gray-500">Forgot Password?</span>
          <router-link to="/recover" class="text-blue-500 font-semibold">Recover</router-link>
        </div>
        <!-- Divider -->
        <div class="relative flex items-center my-8">
          <div class="w-full h-px bg-gray-200"></div>
          <span class="px-4 bg-white text-gray-500">Or</span>
        </div>
        <!-- Social Logins -->
        <div class="flex gap-4 w-full">
          <!-- Google Login Button -->
          <button
            class="social-button w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2"
            @click="handleGoogleLogin"
          >
            <img src="@/assets/icons/google-icon.svg" class="w-5 h-5" alt="Google" />
            Google
          </button>
          <!-- Twitter Login Button -->
          <button
            class="social-button w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2"
            :disabled="true"
          >
            <img src="@/assets/icons/twitter-icon.svg" class="w-5 h-5" alt="Twitter" />
            Twitter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()

// return {
//   authStore,
// }

const email = ref('')
const password = ref('')
const handleLogin = () => {
  console.log('Login with:', email.value, password.value)
  // Add your login logic here
}
const handleGoogleLogin = async () => {
  console.log('Google Login')
  // Add your Google login logic here
  console.log('Google Login')
  const res = await authStore.signInWithGoogle()
  if (res.role === 'admin') {
    console.log('Google Login Success')
    // router.push('/')
    router.push('/admin')
  } else {
    router.push('/user')
  }
}
</script>

<style scoped>
/* Style for the left side image */
.w-12 {
  width: 50%;
}

.bg-blue-600 {
  background-color: #1d4ed8;
}

.object-cover {
  object-fit: cover;
}

.mix-blend-multiply {
  mix-blend-mode: multiply;
}

/* Style for the right-side form */
.login-box {
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
}

h1 {
  font-size: 2.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1b1b1b;
}

.text-sm {
  font-size: 0.875rem;
}

.text-gray-500 {
  color: #6b7280;
}

.text-blue-500 {
  color: #3b82f6;
}

.font-semibold {
  font-weight: 600;
}

.text-gray-700 {
  color: #374151;
}

.el-input {
  width: 100%;
}

.el-button {
  width: 100%;
  padding: 1rem;
  background-color: #1d4ed8;
  color: white;
  border-radius: 0.375rem;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

.social-button {
  background-color: white;
  color: #374151;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  gap: 1rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  cursor: pointer;
}

.social-button img {
  width: 20px;
  height: 20px;
}

.relative {
  position: relative;
}

.my-8 {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.h-px {
  height: 1px;
}

.bg-gray-200 {
  background-color: #e5e7eb;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.bg-white {
  background-color: white;
}

.flex {
  display: flex;
}

.gap-4 {
  gap: 1rem;
}

.w-full {
  width: 100%;
}

.border-gray-300 {
  border-color: #e5e7eb;
}

.rounded-lg {
  border-radius: 0.375rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
</style>
