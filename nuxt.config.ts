// https://nuxt.com/docs/api/configuration/nuxt-config
import dotenv from 'dotenv'

dotenv.config()

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', "@nuxt/icon"],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  css: [
    '@/assets/style.scss',
  ],
  runtimeConfig: {
    public: {
      spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
      spotifyRedirectUri: process.env.SPOTIFY_CALLBACK_URL,
      spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET
    },
  },
  app: {
    head: {
      title: 'mymu',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Lleva un registro total de tu uso de spotify' }
      ]
    }
  }
})