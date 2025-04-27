import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { firebaseApp } from '@/api/firebaseConfig' // Update if your path is different

// Initialize Firestore
const db = getFirestore(firebaseApp)

// 🔥 Create user only if not exists
export async function createUserProfile(uid, data) {
  try {
    const usersRef = collection(db, 'users')

    // Search if user with same uid already exists
    const q = query(usersRef, where('uid', '==', uid))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      console.log('User already exists, skipping creation.')
      return
    }

    // If not found, create new user
    const docRef = await addDoc(usersRef, {
      uid,
      ...data,
    })
    console.log('New User created with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding user: ', e)
  }
}

// Fetch All Users (optional if needed)
export async function getUsers() {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data())
    })
  } catch (e) {
    console.error('Error getting users: ', e)
  }
}

export async function getUserProfile(uid) {
  try {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('uid', '==', uid))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data()
      console.log('User data:', userData)
      return userData
    } else {
      console.log('User not found')
      return null
    }
  } catch (e) {
    console.error('Error getting user: ', e)
    return null
  }
}
