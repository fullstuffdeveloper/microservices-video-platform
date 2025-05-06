<script setup>
import { ref, onMounted, computed } from 'vue'
import { sendChatMessage, isChatbotAvailable } from '@/services/chatbotService'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps({
  userType: {
    type: String,
    default: 'user',
    validator: (value) => ['user', 'admin'].includes(value)
  }
})

const authStore = useAuthStore()
const message = ref('')
const messages = ref([])
const loading = ref(false)
const isServiceAvailable = ref(true)
const isChatOpen = ref(false)

const userName = computed(() => {
  return authStore.user?.displayName || 'User'
})

onMounted(async () => {
  // Check if chatbot service is available
  isServiceAvailable.value = await isChatbotAvailable()
})

async function sendMessage() {
  if (!message.value.trim() || loading.value) return

  // Add user message to chat
  const userMessage = {
    role: 'user',
    content: message.value
  }
  messages.value.push(userMessage)
  
  // Clear input and save query
  const userQuery = message.value
  message.value = ''
  
  // Set loading state
  loading.value = true
  
  try {
    console.log('Sending message to chatbot:', userQuery)
    
    // Prepare messages for API - ensure correct format
    const apiMessages = messages.value.map(m => ({
      role: m.role || 'user',
      content: m.content || ''
    }))
    
    // Send to chatbot service
    const response = await sendChatMessage(apiMessages, props.userType)
    
    // Check if we got a valid response
    if (response && response.response) {
      // Add bot response to chat
      messages.value.push({
        role: 'assistant',
        content: response.response
      })
    } else {
      throw new Error('Invalid response format from AI service')
    }
  } catch (error) {
    console.error('Failed to get response from chatbot:', error)
    // Add a user-friendly error message to the chat
    messages.value.push({
      role: 'assistant',
      content: 'I seem to be having connection issues. Please try again in a moment.'
    })
  } finally {
    loading.value = false
  }
}

function toggleChat() {
  isChatOpen.value = !isChatOpen.value
}

function clearChat() {
  messages.value = []
}
</script>

<template>
  <div class="chat-container" :class="{ 'chat-open': isChatOpen }">
    <!-- Chat toggle button -->
    <button @click="toggleChat" class="chat-toggle-btn">
      <span v-if="!isChatOpen">
        <i class="fas fa-comment"></i> Ask AI
      </span>
      <span v-else>
        <i class="fas fa-times"></i>
      </span>
    </button>
    
    <div v-if="isChatOpen" class="chat-window">
      <div class="chat-header">
        <h3>AI Assistant ({{ props.userType === 'admin' ? 'Admin Mode' : 'User Mode' }})</h3>
        <button @click="clearChat" class="clear-btn" title="Clear chat">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      
      <div v-if="!isServiceAvailable" class="service-unavailable">
        <p>The AI chatbot service is currently unavailable.</p>
      </div>
      
      <div v-else class="chat-messages" ref="messagesContainer">
        <div v-if="messages.length === 0" class="empty-chat">
          <p>How can I help you today?</p>
        </div>
        
        <div v-for="(msg, index) in messages" :key="index" class="message" :class="msg.role">
          <div class="message-bubble">
            <div class="message-sender">{{ msg.role === 'user' ? userName : 'AI Assistant' }}</div>
            <div class="message-content" v-html="msg.content.replace(/\n/g, '<br>')"></div>
          </div>
        </div>
        
        <div v-if="loading" class="message assistant">
          <div class="message-bubble">
            <div class="message-sender">AI Assistant</div>
            <div class="message-content typing">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chat-input">
        <input 
          v-model="message"
          @keyup.enter="sendMessage"
          placeholder="Type your message here..."
          :disabled="loading || !isServiceAvailable"
        />
        <button @click="sendMessage" :disabled="loading || !isServiceAvailable">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.chat-toggle-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: all 0.3s ease;
}

.chat-window {
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;
}

.chat-header {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
}

.clear-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  display: flex;
  margin-bottom: 10px;
}

.message.user {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  position: relative;
}

.message.user .message-bubble {
  background-color: #e6f7ff;
  border-top-right-radius: 5px;
}

.message.assistant .message-bubble {
  background-color: #f1f1f1;
  border-top-left-radius: 5px;
}

.message-sender {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.message-content {
  font-size: 14px;
  line-height: 1.4;
  word-break: break-word;
}

.typing .dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #999;
  margin-right: 4px;
  animation: typing 1.4s infinite both;
}

.typing .dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing .dot:nth-child(3) {
  animation-delay: 0.4s;
}

.chat-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #eee;
}

.chat-input input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  margin-right: 10px;
}

.chat-input button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-input button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.service-unavailable {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  color: #666;
}

.empty-chat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  text-align: center;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-4px);
  }
}
</style> 