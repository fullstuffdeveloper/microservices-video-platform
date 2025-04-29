// src/services/userService.js
import axios from 'axios'

// Replace this with your backend API base URL (through API Gateway if needed)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData)
    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}
