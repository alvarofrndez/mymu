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
      const result = await $searchSpotify(query.value, 'artist')
      results.value = result
    }
  }

  function goTo(e, url) {
    e.stopPropagation()
    router.push(url)
  }
</script>

<template>

<section class='container-search'>
    <div class='container-results'>
      <input class='input-search' v-model="query" placeholder="Buscar en Spotify" @keyup="search" />
      
      <article class='container-artists' v-if="results.artists">
        <ul>
          <li v-for="artist in results.artists.items" class='container-artist' :key="artist.id" @click='(e) => goTo(e, `/spotify/artist/${artist.id}`)'>
            <article class='artist' @click="() => goTo(artist)">
              <div class='container-img' v-if="artist.images">
                <img :src='artist.images[0].url' :alt='artist.name'>
              </div>
              
              <div class='container-data'>
                <b>{{ artist.name }}</b>
                <span>{{ artist.followers.total }} seguidores</span>
              </div>

              <div>
                <span v-for="genre of artist.genres" :key="genre">
                  {{ genre }}
                  <span v-if="artist.genres.indexOf(genre) < artist.genres.length - 1"> · </span> 
                </span>
              </div>
            </article>
          </li>
        </ul>
      </article>

      <article v-else>
        <i>Escribe un artista para obtener resultados</i>
      </article>
    </div>
  </section>
</template>

<style scoped lang='scss'>
  @import '@/assets/style.scss';

  .container-search{
    @include layoutSearchSpotify();

    .container-artist{
      //size
      width: 30%;

      // display
      @include flex(column, center, flex-start);
      align-self: center;

      .artist{
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