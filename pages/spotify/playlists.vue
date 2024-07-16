<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    
    const query = ref('')
    const results = ref([])
    
    const { $searchSpotify } = useNuxtApp()
    const router = useRouter() 
    const hover_playlist = ref({})
    
    const search = async () => {
      results.value = []
      if (query.value) {
        const result = await $searchSpotify(query.value, 'album')
        results.value = result
      }else{
        hover_playlist.value = {}
      }
    }

    function goTo(playlist) {
      router.push(`/spotify/artist/${playlist.id}`)
    }

    function changeHoverPlaylist(playlist) {
      hover_playlist.value = playlist
    }
</script>

<template>
  <section class='container-search'>
      <div class='container-results'>
        <input class='input-search' v-model="query" placeholder="Buscar en Spotify" @keyup="search" />
        
        <article class='container-playlists' v-if="results.albums">
          <ul>
            <li v-for="playlist in results.albums.items" :key="playlist.id" @click="() => goTo(playlist)" @mouseenter="() => changeHoverPlaylist(playlist)">{{ playlist.name }}</li>
          </ul>
        </article>

        <article v-else>
          <i>Escribe una canción para obtener resultados</i>
        </article>
      </div>
      
      <div class='container-hover-playlist'>
        <article class='hover-playlist' v-if="hover_playlist.name" @click="() => goTo(hover_playlist)">
          <div class='container-img' v-if="hover_playlist.album.images">
            <img :src='hover_playlist.album.images[0].url' :alt='hover_playlist.name'>
          </div>
          
          <div class='container-data'>
            <b>{{ hover_playlist.name }}</b>
            <div>
              <span>{{ hover_playlist.duration_ms }}</span>
              <span> · </span>
              <span>{{ hover_playlist.album.release_date }}</span>
            </div>
          </div>

          <div class='container-artists'>
            <span v-for="artist of hover_playlist.artists" :key="artist.name">
              {{ artist.name }}
              <span v-if="hover_playlist.artists.indexOf(artist) < hover_playlist.artists.length - 1"> · </span> 
            </span>
          </div>

          <audio controls>
              <source :src="hover_playlist.preview_url">
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

      .container-playlists{
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

    .container-hover-playlist{
      //size
      width: 50%;

      // display
      @include flex(column, center, flex-start);
      align-self: center;

      .hover-playlist{
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