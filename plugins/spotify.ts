import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const clientId = config.public.spotifyClientId
    const clientSecret = config.public.spotifyClientSecret
    const redirectUri = config.public.spotifyRedirectUri

    const auth_url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-private user-read-email user-follow-read playlist-read-private user-modify-playback-state user-read-playback-state user-read-currently-playing`

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
        
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Error al obtener el token: ${errorText}`)
        }

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

        if (!response.ok) {
            const errorText = await response.text()
            console.log(`https://api.spotify.com/v1/${endpoint}`)
            throw new Error(`Error al hacer peticion: ${errorText}`)
        }

        return response.json()
    }

    const apiCallFullUrl = async (endpoint: string, options = {}) => {
        const response = await fetch(endpoint, {
        ...options,
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Error al hacer peticion: ${errorText}`)
        }

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

    const getUserPlaylists = async () => {
        return apiCall('me/playlists')
    }

    const getPlaylist = async (playlist: any) => {
        return apiCall(`playlists/${playlist}`)
    }

    const getUserAlbums = async () => {
        return apiCall('me/albums')
    }

    const getAlbum = async (album: any) => {
        return apiCall(`albums/${album}`)
    }

    const getFollowedArtists = async () => {
        return apiCall('me/following?type=artist')
    }

    const getArtist = async (artist: any) => {
        return apiCall(`artists/${artist}`)
    }

    // EXPORTS
    nuxtApp.provide('spotifyAuthUrl', auth_url)
    nuxtApp.provide('getSpotifyToken', getToken)

    nuxtApp.provide('spotifyApi', apiCall)
    nuxtApp.provide('spotifyApiFullUrl', apiCallFullUrl)

    nuxtApp.provide('searchSpotify', searchSpotify)

    nuxtApp.provide('getUserPlaylists', getUserPlaylists)
    nuxtApp.provide('getPlaylist', getPlaylist)

    nuxtApp.provide('getUserAlbums', getUserAlbums)
    nuxtApp.provide('getAlbum', getAlbum)

    nuxtApp.provide('getFollowedArtists', getFollowedArtists)
    nuxtApp.provide('getArtist', getArtist)
})