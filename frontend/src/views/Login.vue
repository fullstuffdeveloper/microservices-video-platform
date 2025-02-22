<template>
  <div>
    <button @click="signInWithGoogle">Login with Google</button>
  </div>
</template>

<script>
import { auth, googleProvider } from '../api/firebaseConfig'
import { signInWithPopup } from 'firebase/auth'

export default {
  methods: {
    async signInWithGoogle() {
      try {
        const result = await signInWithPopup(auth, googleProvider)
        console.log('User Signed In:', result.user)
      } catch (error) {
        console.error('Auth Error:', error)
      }
    },
  },
}
</script>
