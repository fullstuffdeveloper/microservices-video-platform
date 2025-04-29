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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useFileUpload from '@/composables/useFileUpload'
import { saveVideoMetadata } from '@/services/videoService'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const { uploadFile, uploadProgress, uploadError, downloadUrl } = useFileUpload()
const authStore = useAuthStore()
const router = useRouter()

const selectedFile = ref(null)
const title = ref('')
const uploadMessage = ref('')

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

  await uploadFile(selectedFile.value)

  if (downloadUrl.value) {
    const videoData = {
      title: title.value,
      url: downloadUrl.value,
      uploadedBy: authStore.user?.email || 'anonymous',
      createdAt: new Date().toISOString(),
    }

    await saveVideoMetadata(videoData)
    uploadMessage.value = 'Video uploaded successfully! 🎉'
  }
}

const logout = async () => {
  await authStore.logout()
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
