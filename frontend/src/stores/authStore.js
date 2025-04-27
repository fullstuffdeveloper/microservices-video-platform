import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { createUserProfile, getUserProfile } from '@/services/firestoreService'
import { nextTick } from 'vue'

import { defineStore } from 'pinia'
// import { useRouter } from 'vue-router'
import router from '@/router'

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return { user: null }
  },
  //   could also be defined as
  actions: {
    async signInWithGoogle() {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()

      try {
        const result = await signInWithPopup(auth, provider)
        console.log('Google Sign-In Result:', result)
        this.user = result.user // Update the user state after successful login
        // 🔥 Create user profile in Firestore
        await createUserProfile(result.user.uid, {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          role: 'user', // default role
        })

        // Fetch user profile from Firestore
        const profile = await getUserProfile(this.user.uid)
        console.log('User Profile:', profile)

        // Redirect based on role
        if (profile.role === 'admin') {
          // Redirect to admin dashboard
          console.log('Redirecting to admin dashboard')
          await nextTick()
          router.push('/admin')
        } else {
          await nextTick()
          router.push('/user')
        }

        return profile // Return the user object
        // router.push('/') // Redirect to the home page after successful login
      } catch (error) {
        console.error('Google Sign-In Error:', error)
      }
    },
    async logOut() {
      const auth = getAuth()
      try {
        await signOut(auth)
        this.user = null // Clear the user state on sign-outß
      } catch (error) {
        console.error('Sign-Out Error:', error)
      }
    },
    async initializeAuthListener() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        this.user = user || null // Update the user state based on the auth status
        console.log('Auth state changed:', user)
      })
    },
  },
  //     },
})
