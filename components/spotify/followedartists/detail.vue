<script setup>
    import { defineProps } from 'vue';

    const {followed_artist} = defineProps({
        followed_artist: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <article v-if="followed_artist">
        <h3>{{ followed_artist.name }}</h3>
        <p>{{ followed_artist.href }}</p>
    </article>
</template>