<script setup>
  definePageMeta({
    layout: [
      'selector'
    ]
  })

  const applications = [
    {
        name: 'spotify',
        color: '#1FDF64',
        url: '/spotify/login',
        logo: ''
    },
    {
        name: 'apple-music',
        color: '#D60017',
        url: '/apple-music/login',
        logo: ''
    },
    {
        name: 'amazon-music',
        color: '#25D1DA',
        url: '/amazon-music/login',
        logo: ''
    },
    {
        name: 'soundcloud',
        color: '#FF5500',
        url: '/soundcloud/login',
        logo: ''
    },
    {
        name: 'youtube-music',
        color: '#FF0000',
        url: '/youtube-music/login',
        logo: ''
    },
  ]
</script>

<template>
    <main class='selector-container' >
        <Selector-item v-for='application of applications' :key='application.name' :application='application'/>
    </main>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .selector-container{
        // size
        width: 100%;
        height: 100%;

        // display
        @include flex();

        @include backgroundSelector();
    }
</style>