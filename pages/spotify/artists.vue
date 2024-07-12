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
        const result = await $searchSpotify(query.value, 'artist')
        results.value = result
      }
    }

    function goTo(artist) {
      router.push(`/spotify/artist/${artist.id}` )
    }
</script>

<template>
    <div>
      <input v-model="query" placeholder="Buscar en Spotify" @keyup="search" />
  
      <div v-if="results.artists">
        <h3>Resultados:</h3>
        <ul>
          <li v-for="artist in results.artists.items" :key="artist.id" @click="() => goTo(artist)">{{ artist.name }}</li>
        </ul>
      </div>
    </div>
</template>