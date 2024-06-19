import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const clientId = config.public.spotifyClientId
    const clientSecret = config.public.spotifyClientSecret
    const redirectUri = config.public.spotifyRedirectUri

    const auth_url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-private user-read-email`

    let access_token = ''

    const getToken = async (code: string) => {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri
            })
        })
        const data = await response.json()
        access_token = data.access_token
        return access_token
    }

    const apiCall = async (endpoint: string, options = {}) => {
        const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
        ...options,
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
        })
        return response.json()
    }

    const searchSpotify = async (query: string, type: string) => {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    }

    nuxtApp.provide('spotifyAuthUrl', auth_url)
    nuxtApp.provide('getSpotifyToken', getToken)
    nuxtApp.provide('spotifyApi', apiCall)
    nuxtApp.provide('searchSpotify', searchSpotify)
})