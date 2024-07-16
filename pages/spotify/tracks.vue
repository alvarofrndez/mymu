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
    }else{
      hover_track.value = {}
    }
  }

  function goTo(track) {
    router.push(`/spotify/track/${track.id}`)
  }

  function changeHoverTrack(track) {
    hover_track.value = track
  }

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
        <article class='hover-track' v-if="hover_track.name" @click="() => goTo(hover_track)">
          <div class='container-img' v-if="hover_track.album.images">
            <img :src='hover_track.album.images[0].url' :alt='hover_track.name'>
          </div>
          
          <div class='container-data'>
            <b>{{ hover_track.name }}</b>
            <div>
              <span>{{ hover_track.duration_ms }}</span>
              <span> · </span>
              <span>{{ hover_track.album.release_date }}</span>
            </div>
          </div>

          <div class='container-artists'>
            <span v-for="artist of hover_track.artists" :key="artist.name">
              {{ artist.name }}
              <span v-if="hover_track.artists.indexOf(artist) < hover_track.artists.length - 1"> · </span> 
            </span>
          </div>

          <audio controls>
              <source :src="hover_track.preview_url">
              Tu navegador no soporta el audio
          </audio>
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
    // size
    min-height: 80%;
    align-self: center;

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
      align-self: center;

      .hover-track{
        // size
        width: min-content;

        // display
        @include flex(column, center, flex-start, 1rem);

        // margin
        padding: 2rem;

        // decoration
        background-color: $h-c-white-opacity;
        border-radius: 15px;
        cursor: pointer;

        .container-img{
          // size
          width: 150px;
          height: 150px;

          // display
          @include flex();

          img{
            // size
            width: 100%;
            height: 100%;
          }
        }

        .container-data{
          // display
          @include flex(column, center, center, .5rem);

          div{
            // display
            @include flex(row, center, center, .5rem);

            // decoration
            color: $h-c-black-gray;
          }
        }
      }
    }
  }
</style>