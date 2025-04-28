<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
    <h1 class="text-3xl font-bold mb-8 text-center">🎥 Watch Uploaded Videos</h1>
    <el-button type="danger" class="w-auto" @click="logout"> Logout </el-button>

    <el-card class="w-full max-w-6xl" shadow="hover">
      <div v-if="loading" class="text-center p-6">
        <el-spinner />
        <p class="mt-4">Loading videos...</p>
      </div>

      <div v-else-if="videos.length === 0" class="text-center p-6 text-gray-500">
        No videos available yet.
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
        <el-card
          v-for="(video, index) in videos"
          :key="index"
          shadow="always"
          class="flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition"
          @click="selectVideo(video)"
        >
          <h2 class="text-lg font-semibold mb-2">{{ video.title }}</h2>
          <video controls class="w-full rounded-lg">
            <source :src="video.url" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </el-card>
      </div>
    </el-card>

    <!-- Recommendation Section -->
    <div v-if="selectedVideo" class="w-full max-w-5xl mt-12">
      <h2 class="text-2xl font-semibold mb-6 text-center">
        🔮 Recommended for you based on "{{ selectedVideo.title }}"
      </h2>

      <div v-if="recommendations.length === 0" class="text-center text-gray-500">
        No recommendations found.
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <el-card
          v-for="(rec, idx) in recommendations"
          :key="idx"
          shadow="hover"
          class="hover:scale-105 transition"
        >
          <h3 class="text-md font-semibold mb-2">{{ rec.title }}</h3>
          <video controls class="w-full rounded">
            <source :src="rec.url" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import axios from 'axios'
const authStore = useAuthStore()
const router = useRouter()

const videos = ref([])
const loading = ref(true)
const selectedVideo = ref(null)
const recommendations = ref([])

const fetchVideos = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/content/videos')
    videos.value = response.data
  } catch (error) {
    console.error('Error fetching videos:', error)
  } finally {
    loading.value = false
  }
}

const fetchRecommendations = async (videoTitle) => {
  try {
    const response = await axios.get('http://localhost:3000/api/recommendation/recommend')
    // Dummy recommendation matching for now
    recommendations.value = response.data.map((rec) => ({
      title: `${rec.message} based on ${videoTitle}`,
      downloadUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    }))
  } catch (error) {
    console.error('Error fetching recommendations:', error)
  }
}

const selectVideo = (video) => {
  selectedVideo.value = video
  fetchRecommendations(video.title)
}

onMounted(() => {
  fetchVideos()
})

const logout = async () => {
  await authStore.logOut()
  router.push('/login')
}
</script>

<style scoped>
.w-auto {
  width: auto;
}
</style>
