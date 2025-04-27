// src/pages/AdminPage.vue
<!-- <template>
  <div class="min-h-screen p-8">
    <h1 class="text-2xl font-bold mb-6">Admin Dashboard - Upload Video</h1>

    <form @submit.prevent="handleUpload" class="space-y-6">
      <div>
        <label class="block mb-2">Select Video File</label>
        <input type="file" accept="video/*" @change="handleFileChange" />
      </div>

      <div>
        <label class="block mb-2">Optional Thumbnail</label>
        <input type="file" accept="image/*" @change="handleThumbnailChange" />
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Upload Video
      </button>
    </form>

    <p v-if="uploadMessage" class="mt-4 text-green-600">{{ uploadMessage }}</p>
  </div>
</template> -->
<template>
  <div class="min-h-screen bg-gray-100 p-8 mx-auto max-w-3xl">
    <el-card shadow="hover">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-3xl font-bold bg-blue-500 text-white p-4 rounded-lg">Admin Dashboard</h1>
        </div>
        <div class="w-1/2">
          <el-button class="w-auto" type="danger" @click="logout">Logout</el-button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <el-card shadow="hover">
          <h2 class="text-xl font-semibold mb-2">Upload New Video</h2>
          <el-upload class="upload-demo" drag>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
          </el-upload>
        </el-card>
        <el-card shadow="hover">
          <h2 class="text-xl font-semibold mb-2">Manage Uploaded Videos</h2>
          <p class="text-gray-600">Coming soon...</p>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const videoFile = ref(null)
const thumbnailFile = ref(null)
const uploadMessage = ref('')

function handleFileChange(event) {
  videoFile.value = event.target.files[0]
}

onMounted(() => {
  // TODO: Fetch videos from backend content service
  console.log('Fetching videos...')
})

function handleThumbnailChange(event) {
  thumbnailFile.value = event.target.files[0]
}

async function handleUpload() {
  if (!videoFile.value) {
    alert('Please select a video file.')
    return
  }

  // Simulate upload API call
  console.log('Uploading video:', videoFile.value)
  console.log('Uploading thumbnail (optional):', thumbnailFile.value)

  // TODO: Connect with backend microservice

  uploadMessage.value = 'Video uploaded successfully!'
}
</script>

<style scoped>
.w-auto {
  width: auto;
}
</style>
