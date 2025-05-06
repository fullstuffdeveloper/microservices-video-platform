<template>
  <div class="min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-gray-50">
    <div class="flex justify-between items-center mb-8 custom-header">
      <div>
        <h1 class="text-4xl font-bold mb-8 text-center">🎬 Watch Uploaded Videos</h1>
      </div>
      <div>
        <el-button type="danger" class="logout-btn" @click="logout">Logout</el-button>
      </div>
    </div>

    <el-card class="video-gallery-card" shadow="hover">
      <div v-if="loading" class="loading-section">
        <el-spinner />
        <p class="mt-4 text-gray-600">Loading videos...</p>
      </div>

      <div v-else-if="videos.length === 0" class="empty-state">
        <p>No videos available yet.</p>
      </div>

      <div v-else class="video-grid">
        <el-card
          v-for="(video, index) in videos"
          :key="index"
          shadow="hover"
          class="video-card"
          @click="selectVideo(video)"
        >
          <h2 class="video-title">{{ video.title }}</h2>
          <video controls class="video-player">
            <source :src="video.url" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </el-card>
      </div>
    </el-card>

    <!-- Recommendation Section -->
    <div v-if="selectedVideo" class="recommendation-section">
      <h2 class="text-2xl font-semibold mb-6 text-center">
        ✨ Recommendations for "{{ selectedVideo.title }}"
      </h2>

      <div v-if="recommendations.length === 0" class="empty-state">
        <p>No recommendations found.</p>
      </div>

      <div v-else class="recommendation-grid">
        <el-card v-for="(rec, idx) in recommendations" :key="idx" shadow="hover" class="recommendation-card">
          <div class="recommendation-content">
            <div class="thumbnail-container">
              <a :href="rec.url" target="_blank" rel="noopener noreferrer">
                <img :src="rec.thumbnailUrl" :alt="rec.title" class="recommendation-thumbnail" />
              </a>
            </div>
            <div class="recommendation-info">
              <h3 class="recommendation-title">
                <a :href="rec.url" target="_blank" rel="noopener noreferrer">{{ rec.title }}</a>
              </h3>
              <p class="recommendation-description">{{ rec.description }}</p>
              <div class="recommendation-source">Source: {{ rec.source }}</div>
              <el-button type="primary" size="small" @click="window.open(rec.url, '_blank')">
                Watch on {{ rec.source }}
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
  
  <!-- Add AI Chatbot for User -->
  <ChatBot userType="user" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ChatBot from '@/components/ChatBot.vue'
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
    console.log(`Fetching recommendations for: "${videoTitle}"`);
    
    // Go through the API gateway for recommendations
    const response = await axios.get(`http://localhost:3000/api/recommendation/recommend`, {
      params: { title: videoTitle }
    });
    
    console.log('Recommendation response:', response.data);
    
    // Check if we have valid response data
    if (Array.isArray(response.data) && response.data.length > 0) {
      // Map the response to the required format for display
      recommendations.value = response.data.map((rec) => {
        // Ensure all required fields exist
        return {
          title: rec.title || `Video related to ${videoTitle}`,
          description: rec.description || 'No description available',
          // Use a sample video for display
          downloadUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          // Use the actual thumbnail from YouTube or a placeholder
          thumbnailUrl: rec.thumbnailUrl || 'https://via.placeholder.com/320x180.png',
          url: rec.url || '#',
          source: rec.source || 'YouTube'
        };
      });
    } else {
      // Fallback recommendations if the response is empty or invalid
      recommendations.value = [
        {
          title: `Video recommendations for ${videoTitle}`,
          description: 'Explore more content related to this topic',
          downloadUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          thumbnailUrl: 'https://via.placeholder.com/320x180.png',
          url: 'https://youtube.com',
          source: 'YouTube'
        }
      ];
    }
    
    // Add console logging for debugging
    console.log('Processed recommendations:', recommendations.value);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    
    // Provide fallback recommendations on error
    recommendations.value = [
      {
        title: `Related to ${videoTitle}`,
        description: 'Our recommendation system is currently unavailable, but you might enjoy this related content',
        downloadUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnailUrl: 'https://via.placeholder.com/320x180.png',
        url: '#',
        source: 'Sample'
      }
    ];
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
.logout-btn {
  margin-bottom: 20px;
  width: auto;
}

.video-gallery-card {
  width: 100%;
  max-width: 1200px;
  padding: 30px;
  background: white;
  border-radius: 12px;
}

.loading-section {
  text-align: center;
  padding: 50px 0;
}

.empty-state {
  text-align: center;
  padding: 50px 0;
  color: #6b7280;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

.recommendation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

.video-card {
  padding: 15px;
  transition: transform 0.3s;
  text-align: center;
}

.video-card:hover {
  transform: translateY(-5px);
}

.video-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
}

.video-player {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
}

.recommendation-section {
  width: 100%;
  max-width: 1000px;
  margin-top: 60px;
  padding: 30px;
}

.recommendation-card {
  padding: 15px;
  transition: transform 0.3s;
  margin-bottom: 20px;
}

.recommendation-card:hover {
  transform: translateY(-5px);
}

.recommendation-content {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.thumbnail-container {
  flex: 0 0 180px;
}

.recommendation-thumbnail {
  width: 180px;
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
}

.recommendation-info {
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
}

.recommendation-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.recommendation-title a {
  color: #333;
  text-decoration: none;
}

.recommendation-title a:hover {
  color: #1890ff;
  text-decoration: underline;
}

.recommendation-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recommendation-source {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}

.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 18px;
}
</style>
