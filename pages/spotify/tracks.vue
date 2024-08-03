<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useFloatModalStore } from '@/stores/float-modal'

  const query = ref('')
  const results = ref([])
  
  const { $searchSpotify } = useNuxtApp()
  const router = useRouter() 
  const float_modal_s = useFloatModalStore()

  definePageMeta({
    middleware: [
    'auth'
    ]
  })

  const search = async () => {
    results.value = []
    if (query.value) {
      const result = await $searchSpotify(query.value, 'track')
      results.value = result
    }
  }

  function goTo(e, url) {
    float_modal_s.hide()
    e.stopPropagation()
    router.push(url)
  }

</script>

<template>
    <section class='container-search'>
      <div class='container-results'>
        <input class='input-search' v-model="query" placeholder="Buscar en Spotify" @keyup="search" />
        
        <article class='container-tracks' v-if="results.tracks">
          <ul>
            <li v-for="track in results.tracks.items" :key="track.id" @click="(e) => goTo(e, `/spotify/track/${track.id}`)" class='container-track'>
              <article class='track' @click="() => goTo(track)">
                <div class='container-img' v-if="track.album.images">
                  <img :src='track.album.images[0].url' :alt='track.name'>
                </div>
                
                <div class='container-data'>
                  <b>{{ track.name }}</b>
                  <div>
                    <span>{{ track.duration_ms }}</span>
                    <span> · </span>
                    <span>{{ track.album.release_date }}</span>
                  </div>
                </div>

                <div>
                  <span v-for="artist of track.artists" :key="artist.name">
                    <span 
                      @mouseover='(e) => float_modal_s.show(e, artist)' 
                      @mouseleave='float_modal_s.hide()'
                      @click='(e) => goTo(e, `/spotify/artist/${artist.id}`)'>
                      {{ artist.name }}
                    </span>
                    <span v-if="track.artists.indexOf(artist) < track.artists.length - 1"> · </span> 
                  </span>
                </div>

                <audio controls>
                    <source :src="track.preview_url">
                    Tu navegador no soporta el audio
                </audio>
              </article>
            </li>
          </ul>
        </article>

        <article v-else>
          <i>Escribe una canción para obtener resultados</i>
        </article>
      </div>
    </section>
</template>

<style scoped lang='scss'>
  @import '@/assets/style.scss';

  .container-search{
    @include layoutSearchSpotify();

    .container-track{

      // display
      @include flex(column, center, flex-start);
      align-self: center;

      .track{
        // size
        width: min-content;

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

          div{
            // display
            @include flex(row, center, center, .5rem);

            // decoration
            color: $h-c-black-gray;
          }

          *{
            word-break: break-all;
          }
        }
      }
    }
  }
</style>