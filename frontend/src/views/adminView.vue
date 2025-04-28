<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>

    <el-card shadow="hover" class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Upload New Video</h2>
      <el-form label-position="top">
        <el-form-item label="Video Title">
          <el-input v-model="title" placeholder="Enter video title..." class="w-auto" />
        </el-form-item>
        <el-form-item label="Select Video File">
          <el-upload
            class="upload-demo"
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
            <div class="selected-file" v-if="selectedFile">
              <video :src="selectedFile" class="video-player" controls></video>
              Selected File: {{ selectedFile.name }}
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button class="w-auto" type="primary" @click="handleUpload">Upload Video</el-button>
        </el-form-item>
      </el-form>

      <div v-if="uploadProgress > 0 && uploadProgress < 100" class="mt-4">
        <el-progress :percentage="uploadProgress" status="active" />
      </div>

      <div v-if="uploadMessage" class="mt-4 text-green-600 font-semibold">
        {{ uploadMessage }}
      </div>
    </el-card>

    <el-button type="danger" class="w-auto" @click="logout"> Logout </el-button>

    <div>
      <h2 class="text-2xl font-bold mb-4">Uploaded Videos</h2>

      <div v-if="videos.length">
        <ul>
          <li v-for="video in videos" :key="video.id" class="mb-4">
            <p><strong>Title:</strong> {{ video.title }}</p>
            <!-- <video width="100%" controls>
              <source :src="video.url" type="video/mp4" />
              Your browser does not support HTML5 video.
            </video> -->
            <video
              id="myVideo"
              controls
              preload="auto"
              poster="https://s.cdpn.io/6035/vp_poster.jpg"
              width="380"
            >
              <source :src="video.url" type="video/mp4" />
              <p>Your browser does not support the video tag.</p>
            </video>
            <p><strong>Uploaded By:</strong> {{ video.uploadedBy }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No videos uploaded yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import useFileUpload from '@/composables/useFileUpload'
import { saveVideoMetadata, uploadVideoToBackend } from '@/services/videoService'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const { uploadFile, uploadProgress, uploadError, downloadUrl } = useFileUpload()
const authStore = useAuthStore()
const router = useRouter()

const selectedFile = ref(null)
const title = ref('')
const uploadMessage = ref('')
const videos = ref([])

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
  await handleUpload()
  //   return false // Prevent auto-upload
}

const handleUpload = async () => {
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

    await saveVideoMetadata(videoData)
    uploadMessage.value = 'Video uploaded successfully! 🎉'
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
</style>
