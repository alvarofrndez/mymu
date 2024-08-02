import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const clientId = config.public.spotifyClientId
    const clientSecret = config.public.spotifyClientSecret
    const redirectUri = config.public.spotifyRedirectUri

    const scoped_permisions = `
        user-follow-read 
        user-follow-modify
        user-modify-playback-state 
        user-read-playback-state 
        user-read-currently-playing 
        user-read-private 
        user-read-email 
        user-library-read
        user-library-modify
        playlist-read-private
        playlist-modify-public
        playlist-modify-private
    `

    const auth_url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scoped_permisions}`

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
            throw new Error(`Error al hacer peticion: ${errorText}`)
        }

        try{
            const data = await response.json()
            return data
        }catch(err){
            return true
        }
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

        try{
            const data = await response.json()
            return data
        }catch(err){
            return true
        }
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

    const isPlaylistSaved = async (id: any) => {
        return apiCall(`playlists/${id}/followers/contains`)
    }

    const savePlaylist = async (id: any) => {
        const options = {
            method: 'PUT'
        }
        return apiCall(`playlists/${id}/followers`, options)
    }

    const unsavePlaylist = async (id: any) => {
        const options = {
            method: 'DELETE'
        }
        return apiCall(`playlists/${id}/followers`, options)
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

    const getTrack = async (track: any) => {
        return apiCall(`tracks/${track}`)
    }

    const isArtistOrUserSaved = async (object: any, type: any) => {
        let url_object = ''

        object.map((track:any) => {
            object.indexOf(track) == 0 ? url_object += track : url_object += ',' + track 
        })

        return apiCall(`me/following/contains?type=${type}&ids=${url_object}`)
    }

    const saveArtistOrUser = async (id: any, type: any) => {
        const options = {
            method: 'PUT'
        }
        return apiCall(`me/following?type=${type}&ids=${id}`, options)
    }

    const unsaveArtistOrUser = async (id: any, type: any) => {
        const options = {
            method: 'DELETE'
        }
        return apiCall(`me/following?type=${type}&ids=${id}`, options)
    }

    const isSaved = async (object: any, type: any) => {
        let url_object = ''

        object.map((track:any) => {
            object.indexOf(track) == 0 ? url_object += track : url_object += ',' + track 
        })

        return apiCall(`me/${type}/contains?ids=${url_object}`)
    }

    const save = async (id: any, type: any) => {
        const options = {
            method: 'PUT'
        }
        return apiCall(`me/${type}?ids=${id}`, options)
    }

    const unsave = async (id: any, type: any) => {
        const options = {
            method: 'DELETE'
        }
        return apiCall(`me/${type}?ids=${id}`, options)
    }

    // EXPORTS
    nuxtApp.provide('spotifyAuthUrl', auth_url)
    nuxtApp.provide('getSpotifyToken', getToken)

    nuxtApp.provide('spotifyApi', apiCall)
    nuxtApp.provide('spotifyApiFullUrl', apiCallFullUrl)

    nuxtApp.provide('searchSpotify', searchSpotify)

    nuxtApp.provide('getUserPlaylists', getUserPlaylists)
    nuxtApp.provide('getPlaylist', getPlaylist)
    nuxtApp.provide('isPlaylistSaved', isPlaylistSaved)
    nuxtApp.provide('savePlaylist', savePlaylist)
    nuxtApp.provide('unsavePlaylist', unsavePlaylist)

    nuxtApp.provide('getUserAlbums', getUserAlbums)
    nuxtApp.provide('getAlbum', getAlbum)

    nuxtApp.provide('getFollowedArtists', getFollowedArtists)
    nuxtApp.provide('getArtist', getArtist)

    nuxtApp.provide('getTrack', getTrack)

    nuxtApp.provide('isArtistOrUserSaved', isArtistOrUserSaved)
    nuxtApp.provide('saveArtistOrUser', saveArtistOrUser)
    nuxtApp.provide('unsaveArtistOrUser', unsaveArtistOrUser)

    nuxtApp.provide('isSaved', isSaved)
    nuxtApp.provide('save', save)
    nuxtApp.provide('unsave', unsave)
})