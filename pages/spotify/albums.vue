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
      const result = await $searchSpotify(query.value, 'album')
      results.value = result
    }else{
      album.value = {}
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
      
      <article class='container-albums' v-if="results.albums">
        <ul>
          <li v-for="album in results.albums.items" class='container-album' :key="album.id" @click="(e) => goTo(e, `/spotify/album/${album.id}`)">
            <article class='album' v-if="album.name" @click="() => goTo(album)">
              <div class='container-img' v-if="album.images">
                <img :src='album.images[0].url' :alt='album.name'>
              </div>
              
              <div class='container-data'>
                <b>{{ album.name }}</b>
                <span>{{ album.release_date }}</span>
              </div>

              <div>
                <span v-for="artist of album.artists" :key="artist.name">
                  <span 
                    @mouseover='(e) => float_modal_s.show(e, artist)' 
                    @mouseleave='float_modal_s.hide()'
                    @click='(e) => goTo(e, `/spotify/artist/${artist.id}`)'>
                    {{ artist.name }}
                  </span>
                  <span v-if="album.artists.indexOf(artist) < album.artists.length - 1"> · </span> 
                </span>
              </div>
            </article>
          </li>
        </ul>
      </article>

      <article v-else>
        <i>Escribe un album para obtener resultados</i>
      </article>
    </div>
    
    <div >
      
    </div>
  </section>
</template>

<style scoped lang='scss'>
  @import '@/assets/style.scss';

  .container-search{
    @include layoutSearchSpotify();

    .container-album{
      //size
      width: 30%;

      // display
      @include flex(column, center, flex-start);
      align-self: center;

      .album{
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