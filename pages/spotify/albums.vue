<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const query = ref('')
  const results = ref([])
  
  const { $searchSpotify } = useNuxtApp()
  const router = useRouter() 
  const hover_album = ref({})

  definePageMeta({
    middleware: [
    'auth'
    ]
  })

  const search = async () => {
    results.value = []
    if (query.value) {
      const result = await $searchSpotify(query.value, 'album')
      results.value = result
    }else{
      hover_album.value = {}
    }
  }

  function goTo(album) {
    router.push(`/spotify/album/${album.id}`)
  }

  function changeHoverAlbum(album) {
    hover_album.value = album
  }
</script>

<template>
  <section class='container-search'>
    <div class='container-results'>
      <input class='input-search' v-model="query" placeholder="Buscar en Spotify" @keyup="search" />
      
      <article class='container-albums' v-if="results.albums">
        <ul>
          <li v-for="album in results.albums.items" :key="album.id" @click="() => goTo(album)" @mouseenter="() => changeHoverAlbum(album)">{{ album.name }}</li>
        </ul>
      </article>

      <article v-else>
        <i>Escribe un album para obtener resultados</i>
      </article>
    </div>
    
    <div class='container-hover-album'>
      <article class='hover-album' v-if="hover_album.name" @click="() => goTo(hover_album)">
        <div class='container-img' v-if="hover_album.images">
          <img :src='hover_album.images[0].url' :alt='hover_album.name'>
        </div>
        
        <div class='container-data'>
          <b>{{ hover_album.name }}</b>
          <span>{{ hover_album.release_date }}</span>
        </div>

        <div class='container-artists'>
          <span v-for="artist of hover_album.artists" :key="artist.name">
            {{ artist.name }}
            <span v-if="hover_album.artists.indexOf(artist) < hover_album.artists.length - 1"> · </span> 
          </span>
        </div>
      </article>

      <article v-else>
        <i>Posicionate encima de un album para ver sus datos</i>
      </article>
    </div>
  </section>
</template>

<style scoped lang='scss'>
  @import '@/assets/style.scss';

  .container-search{
    @include layoutSearchSpotify();

    .container-hover-album{
      //size
      width: 50%;

      // display
      @include flex(column, center, flex-start);
      align-self: center;

      .hover-album{
        // size
        width: 40%;

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

          *{
            word-break: break-all;
          }
        }
      }
    }
  }
</style>