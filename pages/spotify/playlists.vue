<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const query = ref('')
  const results = ref([])
  
  const { $searchSpotify } = useNuxtApp()
  const router = useRouter() 

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
    }
  }

  function goTo(playlist) {
    router.push(`/spotify/playlist/${playlist.id}`)
  }
</script>

<template>
  <section class='container-search'>
      <div class='container-results'>
        <input class='input-search' v-model="query" placeholder="Buscar en Spotify" @keyup="search" />
        
        <article class='container-playlists' v-if="results.playlists">
          <ul>
            <li v-for="playlist in results.playlists.items" class='container-playlist' :key="playlist.id" @click="() => goTo(playlist)">
              <article class='playlist' @click="() => goTo(playlist)">
                <div class='container-img' v-if="playlist.images">
                  <img :src='playlist.images[0].url' :alt='playlist.name'>
                </div>
                
                <div class='container-data'>
                  <b>{{ playlist.name }}</b>
                  <span>Creado por: {{ playlist.owner.display_name }}</span>
                </div>

                <span>{{ playlist.tracks.total }} canciones</span>
              </article>  
            </li>
          </ul>
        </article>

        <article v-else>
          <i>Escribe una playlist para obtener resultados</i>
        </article>
      </div>
    </section>
</template>

<style scoped lang='scss'>
  @import '@/assets/style.scss';

  .container-search{
    @include layoutSearchSpotify();

    .container-playlist{
      //size
      width: 30%;

      // display
      @include flex(column, center, flex-start);
      align-self: center;

      .playlist{
        // size
        width: 100%;

        // display
        @include flex(column, center, flex-start, 1rem);

        // margin
        padding: 1rem;

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