<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    
    const query = ref('')
    const results = ref([])
    
    const { $searchSpotify } = useNuxtApp()
    const router = useRouter() 
    
    const search = async () => {
      results.value = []
      if (query.value) {
        const result = await $searchSpotify(query.value, 'track')
        results.value = result
      }
    }

    function goTo(track) {
      router.push(`/spotify/track/${track.id}` )
    }
</script>

<template>
    <div>
      <input v-model="query" placeholder="Buscar en Spotify" @keyup="search" />
  
      <div v-if="results.tracks">
        <h3>Resultados:</h3>
        <ul>
          <li v-for="track in results.tracks.items" :key="track.id" @click="() => goTo(track)">{{ track.name }}</li>
        </ul>
      </div>
    </div>
</template>