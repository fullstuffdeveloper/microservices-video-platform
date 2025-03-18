import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
// import { defineStore } from 'pinia'
// // import { useRouter } from "vue-router";

// export const useAuthStore = defineStore({
//   id: 'authStore',
//   state: () => ({
//     user: null, // Store the authenticated user
//   }),
//   actions: {
//     async signInWithGoogle() {
//       const auth = getAuth()
//       const provider = new GoogleAuthProvider()

//       try {
//         const result = await signInWithPopup(auth, provider)
//         console.log('Google Sign-In Result:', result)
//         this.user = result.user // Update the user state after successful login
//         return result // Return the user object
//         // router.push('/') // Redirect to the home page after successful login
//       } catch (error) {
//         console.error('Google Sign-In Error:', error)
//       }
//     },
//     async logOut() {
//       const auth = getAuth()
//       try {
//         await signOut(auth)
//         this.user = null // Clear the user state on sign-outß
//       } catch (error) {
//         console.error('Sign-Out Error:', error)
//       }
//     },
//     async initializeAuthListener() {
//       const auth = getAuth()
//       onAuthStateChanged(auth, (user) => {
//         this.user = user || null // Update the user state based on the auth status
//         console.log('Auth state changed:', user)
//       })
//     },
//   },
// })

// stores/counter.js
import { defineStore } from 'pinia'

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
        return result // Return the user object
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
