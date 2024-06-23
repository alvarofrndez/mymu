export default defineNuxtRouteMiddleware((to, from) => {
    const route_list = [
        '/spotify/login',
        '/apple-music/login',
        '/amazon-music/login',
        '/soundcloud/login',
        '/youtube-music/login'
    ]

    let can_pass = false

    for(let route of route_list){
        if(to.path == route){
            can_pass = true
        }
    }

    if(!can_pass)
        return abortNavigation()
})