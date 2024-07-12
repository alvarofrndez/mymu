<script setup>
    import { ref } from 'vue'
    
    const query = ref('')
    const results = ref([])
    
    const { $searchSpotify } = useNuxtApp()
    
    const search = async () => {
      results.value = []
      if (query.value) {
        const result = await $searchSpotify(query.value, 'artist')
        results.value = result
      }
    }
</script>

<template>
    <div>
      <input v-model="query" placeholder="Buscar en Spotify" @keyup="search" />
  
      <div v-if="results.artists">
        <h3>Resultados:</h3>
        <ul>
          <li v-for="item in results.artists.items" :key="item.id">{{ item.name }}</li>
        </ul>
      </div>
    </div>
</template>