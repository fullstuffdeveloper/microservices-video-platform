<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="flex justify-between items-center mb-8 custom-header">
      <div>
        <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>
      </div>
      <div>
        <el-button type="danger" class="w-auto mb-8" @click="logout"> Logout </el-button>
      </div>
    </div>

    <el-card shadow="hover" class="upload-section" v-loading="loading">
      <h2 class="section-title">Upload New Video</h2>
      <el-form label-position="top" class="upload-form">
        <el-form-item label="Video Title">
          <el-input v-model="title" placeholder="Enter video title..." />
        </el-form-item>

        <el-form-item label="Select Video File">
          <el-upload
            class="upload-box"
            drag
            :show-file-list="false"
            :auto-upload="false"
            :before-upload="handleFileChange"
            :on-change="handleFileChange"
            :on-remove="handleFileRemove"
            :file-list="fileList"
            :limit="1"
            :accept="'video/*'"
          >
            <div class="el-upload__text">Drop or click to select file</div>

            <template v-if="selectedFile">
              <!-- <video :src="selectedFile" class="preview-video" controls></video> -->
              <video controls width="300" class="w-full rounded-lg">
                <source :src="selectedFile.url" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div class="selected-filename">{{ selectedFile.name }}</div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="upload-btn" @click="handleUpload">
            Upload Video
          </el-button>
        </el-form-item>
      </el-form>

      <div v-if="uploadProgress > 0 && uploadProgress < 100" class="mt-4">
        <el-progress :percentage="uploadProgress" status="active" />
      </div>

      <div v-if="uploadMessage" class="upload-success-message">
        {{ uploadMessage }}
      </div>
    </el-card>

    <div>
      <h2 class="text-2xl font-bold mb-6">Uploaded Videos</h2>

      <div v-if="videos.length" class="video-grid">
        <div v-for="video in videos" :key="video.id" class="video-card">
          <video id="myVideo" controls preload="auto" class="video-element">
            <source :src="video.url" type="video/mp4" />
            <p>Your browser does not support the video tag.</p>
          </video>
          <div class="video-info">
            <p><strong>Title:</strong> {{ video.title }}</p>
            <p><strong>Uploaded By:</strong> {{ video.uploadedBy }}</p>
          </div>
        </div>
      </div>

      <div v-else class="text-gray-600">
        <p>No videos uploaded yet.</p>
      </div>
    </div>
  </div>
  
  <!-- Add AI Chatbot for Admin -->
  <ChatBot userType="admin" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import useFileUpload from '@/composables/useFileUpload'
import { saveVideoMetadata, uploadVideoToBackend } from '@/services/videoService'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import ChatBot from '@/components/ChatBot.vue'

const { uploadFile, uploadProgress, uploadError, downloadUrl } = useFileUpload()
const authStore = useAuthStore()
const router = useRouter()

const selectedFile = ref(null)
const title = ref('')
const uploadMessage = ref('')
const videos = ref([])
const loading = ref(false)

const fetchVideos = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/content/videos')
    videos.value = response.data
    console.log('Fetched Videos:', videos.value)
  } catch (error) {
    console.error('Error fetching videos:', error)
  }
}

onMounted(async () => {
  await fetchVideos()
})

const handleFileChange = async (file) => {
  console.log(file)
  selectedFile.value = file
}

const handleUpload = async () => {
  loading.value = true
  if (!selectedFile.value || !title.value) {
    alert('Please select a file and enter a title.')
    return
  }
  const url = await uploadVideoToBackend(selectedFile.value.raw, title.value, authStore.user?.email)
  await uploadFile(selectedFile.value)

  if (url) {
    const videoData = {
      title: title.value,
      url: url || '',
      uploadedBy: authStore.user?.email || 'anonymous',
      createdAt: new Date().toISOString(),
    }
    uploadMessage.value = 'Video uploaded successfully! ✨'
    loading.value = false
  }
}

const logout = async () => {
  await authStore.logOut()
  router.push('/login')
}
</script>

<style scoped>
.upload-demo {
  border: 2px dashed #dcdfe6;
  border-radius: 6px;
  background-color: #fafafa;
  text-align: center;
  padding: 40px 20px;
  margin-bottom: 20px;
}

.w-auto {
  width: auto;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.video-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 400px;
}

.video-element {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
}

.video-info {
  margin-top: 0.75rem;
  text-align: center;
}
.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 18px;
}

.upload-section {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 30px;
  background: white;
  border-radius: 12px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.upload-form {
  margin-top: 20px;
}

.upload-box {
  border: 2px dashed #dcdfe6;
  border-radius: 8px;
  padding: 30px;
  background: #f9fafb;
  transition: border-color 0.3s;
  text-align: center;
}

.upload-box:hover {
  border-color: #409eff;
}

.preview-video {
  width: 100%;
  height: 250px;
  object-fit: cover;
  margin-top: 20px;
  border-radius: 8px;
}

.selected-filename {
  margin-top: 8px;
  font-size: 14px;
  color: #555;
}

.upload-btn {
  width: 100%;
}

.upload-success-message {
  margin-top: 20px;
  color: #22c55e;
  font-weight: 600;
  text-align: center;
}
</style>
