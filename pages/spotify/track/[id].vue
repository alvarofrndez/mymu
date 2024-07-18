<script setup>
    import { useRoute } from 'vue-router'

    const route = useRoute()

    definePageMeta({
        middleware: [
        'auth'
        ]
    })

    onMounted(async () => {
        console.log(route.params.id)
        // playlist.value = await $getPlaylist(route.params.id)
        // getTotalTime()
    })

</script>

<template>
    
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

</style>