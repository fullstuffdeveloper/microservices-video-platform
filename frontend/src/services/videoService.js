// src/services/videoService.js
import axios from 'axios'
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { firebaseApp } from '@/api/firebaseConfig' // Update if your path is different

// Initialize Firestore
const db = getFirestore(firebaseApp)

const API_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:3000'

export async function saveVideoMetadata(videoData) {
  console.log('Saving video metadata:', videoData)
  try {
    const response = await axios.post(`${API_URL}/api/content/upload-metadata`, videoData)
    return response.data
  } catch (error) {
    console.error('Error saving video metadata:', error)
    throw error
  }
}

export async function fetchAllVideos() {
  const querySnapshot = await getDocs(collection(db, 'videos'))
  const videos = []
  querySnapshot.forEach((doc) => {
    videos.push(doc.data())
  })
  return videos
}
