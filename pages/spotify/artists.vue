<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const query = ref('')
  const results = ref([])
  
  const { $searchSpotify } = useNuxtApp()
  const router = useRouter()
  const hover_artist = ref({})

  definePageMeta({
    middleware: [
    'auth'
    ]
  })

  const search = async () => {
    results.value = []
    if (query.value) {
      const result = await $searchSpotify(query.value, 'artist')
      results.value = result
    }else{
      results.value = {}
    }
  }

  function goTo(artist) {
    router.push(`/spotify/artist/${artist.id}` )
  }

  function changeHoverArtist(artist) {
    hover_artist.value = artist
  }
</script>

<template>

<section class='container-search'>
    <div class='container-results'>
      <input class='input-search' v-model="query" placeholder="Buscar en Spotify" @keyup="search" />
      
      <article class='container-artists' v-if="results.artists">
        <ul>
          <li v-for="artist in results.artists.items" :key="artist.id" @click="() => goTo(artist)" @mouseenter="() => changeHoverArtist(artist)">{{ artist.name }}</li>
        </ul>
      </article>

      <article v-else>
        <i>Escribe un artista para obtener resultados</i>
      </article>
    </div>
    
    <div class='container-hover-artist'>
      <article class='hover-artist' v-if="hover_artist.name" @click="() => goTo(hover_artist)">
        <div class='container-img' v-if="hover_artist.images">
          <img :src='hover_artist.images[0].url' :alt='hover_artist.name'>
        </div>
        
        <div class='container-data'>
          <b>{{ hover_artist.name }}</b>
          <span>{{ hover_artist.followers.total }} seguidores</span>
        </div>

        <div class='container-artists'>
          <span v-for="genre of hover_artist.genres" :key="genre">
            {{ genre }}
            <span v-if="hover_artist.genres.indexOf(genre) < hover_artist.genres.length - 1"> · </span> 
          </span>
        </div>
      </article>

      <article v-else>
        <i>Posicionate encima de un artista para ver sus datos</i>
      </article>
    </div>
  </section>
</template>

<style scoped lang='scss'>
  @import '@/assets/style.scss';

  .container-search{
    @include layoutSearchSpotify();

    .container-hover-artist{
      //size
      width: 50%;

      // display
      @include flex(column, center, flex-start);
      align-self: center;

      .hover-artist{
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