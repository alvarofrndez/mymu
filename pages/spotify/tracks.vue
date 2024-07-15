<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const query = ref('')
  const results = ref([])
  
  const { $searchSpotify } = useNuxtApp()
  const router = useRouter() 
  const hover_track = ref({})
  
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

  function changeHoverTrack(track) {
    hover_track.value = track
  }

  // hover_track.album.album_type
  // hover_track.album.images[0]
  // hover_track.album.released_date
  // hover_track.album.name v-if album_type == album || album_type == compilation 
  // hover_track.artists v-for artist.name
  // hover_track.duration_ms
  // hover_track.name
  // hover_track.preview_url
</script>

<template>
    <section class='container-search'>
      <div class='container-results'>
        <input class='input-search' v-model="query" placeholder="Buscar en Spotify" @keyup="search" />
        
        <article class='container-tracks' v-if="results.tracks">
          <ul>
            <li v-for="track in results.tracks.items" :key="track.id" @click="() => goTo(track)" @mouseenter="() => changeHoverTrack(track)">{{ track.name }}</li>
          </ul>
        </article>

        <article v-else>
          <i>Escribe una canción para obtener resultados</i>
        </article>
      </div>
      
      <div class='container-hover-track'>
        <article class='hover-track' v-if="hover_track.name">
          {{ hover_track.name }}
          {{ hover_track.duration_ms }}
          <img :src='hover_track.album.images[2].url' :alt='hover_track.name'>
          {{ hover_track.album.released_date }}
          <audio controls>
              <source :src="hover_track.preview_url">
              Tu navegador no soporta el audio
          </audio>
          <div>
            <span v-for="artist of hover_track.artists">{{ artist.name }}</span>
          </div>
        </article>

        <article v-else>
          <i>Posicionate encima de una cancón para ver sus datos</i>
        </article>
      </div>
    </section>
</template>

<style scoped lang='scss'>
  @import '@/assets/style.scss';

  .container-search{
    @include displayContainerSpotify();

    // display
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    .container-results{
      //size
      width: 50%;

      // display
      @include flex(column, center, flex-start, 3rem);

      .input-search{
        width: 50%;
      }

      .container-tracks{
        // size
        min-width: 50%;

        // display
        @include flex(column, flex-start, flex-start, 2rem);

        ul{

          // display
          @include flex(column, flex-start, flex-start, 1rem);

          // margin
          margin: 0;
          padding: 0;

          // decoration
          list-style: none;

          li{
            // decoration
            cursor: pointer;
          }
        }
      }
    }

    .container-hover-track{
      //size
      width: 50%;

      // display
      @include flex(column, center, flex-start);
    }
  }

</style>