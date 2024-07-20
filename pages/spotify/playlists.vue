<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const query = ref('')
  const results = ref([])
  
  const { $searchSpotify } = useNuxtApp()
  const router = useRouter() 
  const hover_playlist = ref({})

  definePageMeta({
    middleware: [
    'auth'
    ]
  })
  
  const search = async () => {
    results.value = []
    if (query.value) {
      const result = await $searchSpotify(query.value, 'playlist')
      results.value = result
    }else{
      hover_playlist.value = {}
    }
  }

  function goTo(playlist) {
    router.push(`/spotify/playlist/${playlist.id}`)
  }

  function changeHoverPlaylist(playlist) {
    hover_playlist.value = playlist
  }
</script>

<template>
  <section class='container-search'>
      <div class='container-results'>
        <input class='input-search' v-model="query" placeholder="Buscar en Spotify" @keyup="search" />
        
        <article class='container-playlists' v-if="results.playlists">
          <ul>
            <li v-for="playlist in results.playlists.items" :key="playlist.id" @click="() => goTo(playlist)" @mouseenter="() => changeHoverPlaylist(playlist)">{{ playlist.name }}</li>
          </ul>
        </article>

        <article v-else>
          <i>Escribe una playlist para obtener resultados</i>
        </article>
      </div>
      
      <div class='container-hover-playlist'>
        <article class='hover-playlist' v-if="hover_playlist.name" @click="() => goTo(hover_playlist)">
          <div class='container-img' v-if="hover_playlist.images">
            <img :src='hover_playlist.images[0].url' :alt='hover_playlist.name'>
          </div>
          
          <div class='container-data'>
            <b>{{ hover_playlist.name }}</b>
            <span>Creado por: {{ hover_playlist.owner.display_name }}</span>
          </div>

          <span>{{ hover_playlist.tracks.total }} canciones</span>
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
    @include layoutSearchSpotify();

    .container-hover-playlist{
      //size
      width: 50%;

      // display
      @include flex(column, center, flex-start);
      align-self: center;

      .hover-playlist{
        // size
        width: 40%;

        // display
        @include flex(column, center, flex-start, 1rem);

        // margin
        padding: 2rem;

        // decoration
        background-color: $h-c-black-opacity;
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

          *{
            word-break: break-all;
          }
        }
      }
    }
  }
</style>