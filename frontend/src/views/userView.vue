// src/pages/UserPage.vue
<template>
  <div class="min-h-screen p-8">
    <h1 class="text-2xl font-bold mb-6">User Dashboard - Watch Videos</h1>

    <div v-if="videos.length === 0">No videos available yet.</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(video, index) in videos" :key="index" class="border rounded p-4">
        <h2 class="text-lg font-semibold mb-2">{{ video.title }}</h2>
        <video controls class="w-full">
          <source :src="video.url" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const videos = ref([])

onMounted(() => {
  // TODO: Fetch videos from backend content service
  videos.value = [
    {
      title: 'Sample Video 1',
      url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    },
    {
      title: 'Sample Video 2',
      url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    },
  ]
})
</script>

<style scoped></style>
