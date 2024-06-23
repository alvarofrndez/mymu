<script setup>
    import { useRoute } from 'vue-router'
    import { onMounted, ref } from 'vue'

    const route = useRoute()
    let type = ref(undefined)

    onMounted(async () => {
        type.value = route.path.split('/')[1]
    })

</script>

<template>
    <Menu-spotify v-if="type == 'spotify'"/>
    <main class="container">
        <slot></slot>
    </main>
</template>