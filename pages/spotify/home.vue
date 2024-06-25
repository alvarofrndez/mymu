<script setup>
  import { ref, onMounted } from 'vue'
  import { useNuxtApp } from '#app'

  const { $getUserPlaylists, $getFollowedArtists } = useNuxtApp()

  let playlists = ref(null)
  let followed_artists = ref(null)

  definePageMeta({
    middleware: [
      'auth'
    ]
  })

  onMounted(async () => {
    getPlaylists()
    getFollowedArtists()
  })

  async function getPlaylists() {
    try {
      playlists.value = (await $getUserPlaylists())
    } catch (error) {
      console.error('Error al obtener las playlists', error)
    }
  }

  async function getFollowedArtists() {
    try {
      followed_artists.value = (await $getFollowedArtists())
    } catch (error) {
      console.error('Error al obtener los artistas seguidos', error)
    }
  }
</script>

<template>
  <div class='container'>
    <template v-if="playlists && followed_artists">
      <Spotify-playlists :playlists="playlists" />
      <Spotify-Followedartists :followed_artists="followed_artists" />
    </template>
    <template v-else>
      <p>Cargando...</p>
    </template>
  </div>
</template>
  
<style scoped lang='scss'>
  @import '@/assets/style.scss';

  .container{
    border: 1px solid black;
    // size
    width: 90%;

    // decoration
    margin-top: 2.5%;
    margin-bottom: 2.5%;

    @include flex(column, flex-start, center, 2rem);
  }

</style>