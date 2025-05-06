import axios from 'axios'

const API_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:3000'

/**
 * Send a message to the AI chatbot
 * @param {Array} messages - Array of chat messages in the format [{role: 'user', content: 'message'}]
 * @param {String} userType - Type of user ('admin' or 'user')
 * @returns {Promise} - Promise with the AI's response
 */
export async function sendChatMessage(messages, userType = 'user') {
  try {
    console.log('Sending chat message to AI chatbot:', { messages, userType });
    
    // Ensure all messages have the correct format
    const formattedMessages = messages.map(msg => {
      // If it's already in the correct format, return as is
      if (msg && typeof msg === 'object' && msg.role && msg.content) {
        return msg;
      }
      
      // Otherwise, try to format it properly
      if (typeof msg === 'string') {
        return { role: 'user', content: msg };
      }
      
      // If we can't format it, return a placeholder
      return { role: 'user', content: 'Message format error' };
    });
    
    const response = await axios.post(`${API_URL}/api/ai-chatbot/chat`, {
      messages: formattedMessages,
      userType
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('AI chatbot response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending message to AI chatbot:', error);
    return { 
      response: "I'm having trouble connecting to the AI service. Please try again later."
    };
  }
}

/**
 * Check if the AI chatbot service is available
 * @returns {Promise<boolean>} - Promise with a boolean indicating if the service is available
 */
export async function isChatbotAvailable() {
  try {
    const response = await axios.get(`${API_URL}/api/ai-chatbot`)
    return response.data.status === 'healthy'
  } catch (error) {
    console.error('Error checking AI chatbot service:', error)
    return false
  }
} 