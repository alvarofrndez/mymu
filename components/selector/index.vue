<script setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const { $spotifyAuthUrl } = useNuxtApp()

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
        
    function navigateTo() {
        window.location.href = $spotifyAuthUrl
    }
</script>

<template>
    <main class='selector-container' >
        <section class='wrapped'>
            <article class='login'>
                <h2>¿Ya tienes acceso?</h2>
                <button @click="navigateTo">inicia sesión</button>
            </article>
            <article>
                <p>Para solicitar acceso envia un correo con tu email de la cuenta de spotify a alvarofdayala@gmail.com</p>
            </article>
        </section>
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

        // decoration
        background: $h-c-spotify-primary-07;
        background: linear-gradient(0deg, $h-c-spotify-primary-07 0%, $h-c-spotify-primary 50%);

        .wrapped{
            // size
            width: fit-content;
            height: fit-content;

            // display
            @include flex(column, center, flex-start, 2rem);

            // margin
            padding: 2rem;

            // decoration
            background-color: $h-c-black-opacity-light;
            border-radius: 15px;

            * {
                color: $h-c-white
            }

            .login{
                // display
                @include flex(column, center, center, .5rem);

                button{
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                }
            }
        }
    }
</style>