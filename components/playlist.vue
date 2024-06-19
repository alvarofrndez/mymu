<script setup>
    import { defineProps } from 'vue';

    const {playlist} = defineProps({
        playlist: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <article v-if="playlist">
        <h3>{{ playlist.name }}</h3>
        <p>{{ playlist.href }}</p>

        <img :src="playlist.images[0].url" alt="" v-if="playlist.images[0]">
    </article>
</template>