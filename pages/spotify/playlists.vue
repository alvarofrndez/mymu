<script setup>
    import { ref } from 'vue'
    
    const query = ref('')
    const results = ref([])
    
    const { $searchSpotify } = useNuxtApp()
    
    const search = async () => {
        if (query.value) {
            const data = await $searchSpotify(query.value, 'artist') // Puedes cambiar 'track' por 'album', 'artist', etc.
            console.log(data)
        }
    }
</script>

<template>
    <div>
      <input v-model="query" placeholder="Buscar en Spotify" @keyup.enter="search" />
      <button @click="search">Buscar</button>
  
      <div v-if="results">
        <h3>Resultados:</h3>
        <ul>
          <li v-for="item in results" :key="item.id">{{ item.name }}</li>
        </ul>
      </div>
    </div>
</template>