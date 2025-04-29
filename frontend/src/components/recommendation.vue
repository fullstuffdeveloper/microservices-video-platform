<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">🎬 Recommended Videos</h1>
    <ul>
      <li v-for="video in recommendations" :key="video.title" class="mb-2">
        <a :href="video.url" class="text-blue-500 underline" target="_blank">{{ video.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const recommendations = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('/api/recommend/recommend')
    recommendations.value = response.data
  } catch (error) {
    console.error('Failed to fetch recommendations:', error)
  }
})
</script>
