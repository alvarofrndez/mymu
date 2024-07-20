<script setup>
    import { onMounted, defineProps } from 'vue'

    const {data} = defineProps({
        data: {
            type: Object,
            required: true
        }
    })

    onMounted(async () => {
        const ball = document.getElementsByClassName('ball-' + data.index)[0]

        ball.style.left = Math.floor(Math.random() * ((window.innerWidth - 151) - 151) + 151) + 'px'
        setInterval(() => {
            if(data.index % 2 == 0)
                ball.style.left = ball.style.left.slice(0, -2) + 10 + 'px'
            else
                ball.style.left -= ball.style.left.slice(0, -2) - 10 + 'px'
        }, 100)
    })
</script>

<template>

    <div :class="'ball ball-' + data.index ">

    </div>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';


    .ball{
        // size
        width: 150px;
        height: 150px;

        // position
        position: absolute;

        background-color: black;
    }
</style>