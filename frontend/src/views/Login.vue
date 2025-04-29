<template>
  <div class="signin-container">
    <div class="signin-left">
      <!-- Optional: Add an SVG later -->
    </div>
    <div class="signin-right">
      <div class="login-box">
        <h1 class="heading">Welcome Back 👋</h1>
        <p class="subheading">Sign in with Google to continue</p>

        <el-input
          placeholder="Enter your email"
          type="email"
          v-model="email"
          :disabled="true"
          class="input-field"
        ></el-input>

        <el-input
          placeholder="Enter your password"
          type="password"
          v-model="password"
          :disabled="true"
          show-password
          class="input-field"
        ></el-input>

        <el-button type="primary" class="primary-button" :disabled="true"> Login </el-button>

        <div class="divider">
          <span>Or</span>
        </div>

        <el-button class="social-button" @click="handleGoogleLogin">
          <img src="@/assets/icons/google-icon.svg" alt="Google" />
          <span>Sign in with Google</span>
        </el-button>
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
/* Page Layout */
.signin-container {
  display: flex;
  height: 100vh;
}

.signin-left {
  flex: 1;
  background-color: #2563eb; /* nice blue */
}

.signin-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* Form Box */
.login-box {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
}

/* Typography */
.heading {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
  text-align: center;
}

.subheading {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 2rem;
  text-align: center;
}

/* Inputs and Buttons */
.input-field {
  margin-bottom: 1rem;
}

.primary-button {
  width: 100%;
  height: 44px;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}

.divider span {
  padding: 0 1rem;
  color: #9ca3af;
}

/* Social Button */
.social-button {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  gap: 0.5rem;
}

.social-button img {
  width: 20px;
  height: 20px;
}
</style>
>
