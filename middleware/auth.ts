import { useUserStore } from "@/stores/user"

export default defineNuxtRouteMiddleware((to, from) => {
    const user_s = useUserStore()

    if(to.path == '/'){
        if(user_s.user == null){
            return navigateTo('/login')
        }else{
            return navigateTo('/home')
        }
    }

    if (from.path !== '/login' && from.path !== '/' && user_s.user == null) {
        return abortNavigation()
    }
})