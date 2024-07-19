<script setup>
    import { useRoute } from 'vue-router'
    import { onMounted, ref } from 'vue'

    const route = useRoute()
    let type = ref(undefined)

    onMounted(async () => {
        type.value = route.path.split('/')[1]
    })

    definePageMeta({
        layout: [
        'main'
        ]
    })

</script>

<template>

    <div class='global-container'>
        <Menu-spotifytesting class='menu-global-container-open' v-if="type == 'spotify'"/>
        <main>
            <div class='top'></div>
            <section>
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, ex. Nisi sed id officiis molestiae provident, voluptates eaque reiciendis ducimus dolores omnis, aliquid veritatis delectus, quod repellat blanditiis laudantium repudiandae.
                Laborum fuga voluptate explicabo pariatur dolor cupiditate alias eius impedit veritatis eum earum accusantium, necessitatibus dicta ipsum. A, similique? Ut reiciendis nihil at numquam? Enim quisquam sint nam voluptatum tempore?
                Necessitatibus, porro natus sit dolores blanditiis id nulla corporis, maxime eveniet corrupti sunt dolore ratione sapiente. Enim, cupiditate delectus voluptatibus, unde est dolore incidunt, aspernatur quasi ullam temporibus nulla. Illo.
                Nobis et molestiae dolore atque ad itaque, excepturi unde doloremque. Repellat nihil dolores totam temporibus, corporis nobis nemo deserunt architecto minus! Voluptatibus ab a ut praesentium quos debitis facilis quas!
                Corrupti animi necessitatibus blanditiis quae veniam sed amet deserunt maxime, dicta dolor itaque sunt natus recusandae minus expedita molestiae consequatur a qui vitae sapiente fugiat at sint. Iste, tempora dolore.
                Itaque adipisci blanditiis architecto illum illo doloremque ipsum, amet placeat minima odit nulla libero ab a, rerum vero dignissimos. Quas odit porro iste quasi molestias eius minus reprehenderit explicabo. Velit.
                Placeat, laborum architecto aliquid aspernatur sed possimus quod minima reprehenderit officiis aliquam, quibusdam delectus provident aut totam, repellat ea exercitationem blanditiis doloremque veritatis deserunt neque ipsa fugit adipisci. Officiis, possimus!
                Maxime quaerat tenetur consectetur velit repudiandae placeat architecto fugit praesentium cumque voluptatibus voluptates, facere alias! Aperiam, illum itaque. Aspernatur itaque modi magnam sequi dicta consequuntur maiores minima, corrupti molestias quibusdam?
                Error dolore harum ut mollitia. Obcaecati, libero nihil! Hic deleniti sunt explicabo obcaecati sequi cumque quam tempore non sapiente ex, illo nobis autem fugit nostrum architecto fugiat error. Quis, numquam!
                Neque non eos in sunt magnam, cupiditate dicta recusandae perferendis vero libero fuga facilis, quasi impedit alias officia eligendi sapiente consequatur eius provident repudiandae. Consequatur, totam. Sit placeat magni id!
                Maxime eligendi tenetur laboriosam accusantium at non distinctio id, reprehenderit quasi provident dolorum animi magnam voluptates voluptatem numquam mollitia, praesentium enim perspiciatis dolore facere! Quisquam blanditiis autem id magnam aliquid.
                Voluptatibus suscipit omnis beatae, cum accusamus illo! Vero veritatis eius necessitatibus omnis suscipit tempora sed dolorem perspiciatis dolore in minus, ut ab voluptas possimus exercitationem molestiae asperiores eveniet qui deserunt.
                Dicta molestiae eum, nemo reprehenderit delectus dolorum error placeat eveniet at officia voluptatum officiis pariatur cumque ullam nam aliquam, corrupti molestias totam! Dicta deserunt eaque, doloremque similique voluptatem aperiam ad.
                Ratione, sunt. Corrupti, totam! Error nulla velit magnam. Minus molestias incidunt sint, mollitia provident veritatis. Sed suscipit voluptatum dolorum. Saepe, eius! Officia ipsum distinctio at soluta quam totam rem? Architecto.
                Doloremque voluptatibus, facilis, odit numquam tempora provident culpa ut laborum cumque delectus itaque quas nobis veniam fugit explicabo quasi! Cupiditate laboriosam totam placeat at quod, quos labore porro accusamus aut.
                Provident, quae. Vero corrupti ullam laborum iusto dolorum dignissimos deleniti earum tempora quisquam incidunt minima unde quam, temporibus alias totam itaque corporis quasi ab repudiandae voluptatem aut ipsam ipsum! Possimus!
                Consequatur, consequuntur eos, quae, architecto iure odio unde a qui facere molestias enim! Quo veritatis sapiente omnis atque error? Aliquid velit ratione exercitationem corporis amet reiciendis quis debitis ea atque!
                Harum aperiam minus quod veniam neque quisquam facere. Sapiente sequi commodi harum reprehenderit laboriosam, a voluptatibus rem veniam tempore sunt alias magni modi vitae obcaecati deleniti minima maxime, dolorum consequuntur?
                Vero nostrum dolorum eveniet doloribus, quae fuga tempora quas. Necessitatibus tempore totam fugit labore consequuntur ex, esse molestiae porro, officiis veritatis laboriosam nesciunt dolore voluptatem reiciendis pariatur laudantium a tempora.
                Esse a distinctio mollitia debitis, ipsam, dolores molestiae dicta, ducimus non ea temporibus! Esse quibusdam soluta, numquam nam quod consectetur quisquam ea veniam eligendi, accusantium dignissimos ullam pariatur ducimus! Nostrum.
                Quibusdam enim esse ratione assumenda similique? Vel eius ipsam facilis omnis magnam nulla. Cum expedita, suscipit saepe magni aspernatur dolore nesciunt soluta amet nulla velit ullam fugit beatae incidunt quaerat?
                Ullam necessitatibus blanditiis natus voluptas, deleniti sapiente facilis cum, consectetur aliquid labore, assumenda odio exercitationem aut? Deleniti voluptatum soluta, adipisci voluptatem dolor at suscipit, architecto non laboriosam tempore sint expedita.
                Nihil culpa nostrum omnis mollitia fuga laborum aperiam, perferendis voluptas exercitationem sequi eligendi repellendus similique facilis reprehenderit sunt nulla eveniet hic, distinctio unde minima corporis! Id, laborum. At, ut hic.
                Sapiente quaerat quas amet aperiam totam molestias itaque minus et nam quasi! Distinctio sed quidem neque itaque blanditiis modi delectus? Vel necessitatibus similique culpa voluptatem repellendus molestiae nihil corporis nam.
                Id consequuntur natus adipisci? Illum modi assumenda obcaecati asperiores, eius, laboriosam voluptas aliquid reiciendis dolorum, delectus mollitia? Exercitationem eaque ex sint eligendi blanditiis. Et dolorum neque ipsum natus maxime recusandae?
                Qui consequatur voluptatum perferendis corrupti officia doloribus! Autem officiis voluptatum facere asperiores molestiae, adipisci aperiam libero tempore quaerat eligendi inventore beatae nostrum sapiente neque omnis ex dolor ipsam sequi natus?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Delectus sint cum molesctias cumque dolore quo soluta voluptas. Nostrum deleniti pariatur minima sint quibusdam alias tempora accusantium architecto animi non distinctio earum impedit, a temporibus consequuntur commodi illum at?
                Quae totam asperiores repellendus modi quidem rem voluptatibus consectetur id sequi soluta, magnam sunt necessitatibus consequatur, fugit voluptates eius fugiat minima enim ipsum mollitia aspernatur veritatis? Distinctio nemo qui voluptatem?
                anditiis voluptas delectus rem aperiam deleniti fugit doloribus, repellendus voluptatum distinctio repellat autem illum eum eligendi, facilis, sint est in temporibus aliquid. Eligendi dicta aliquid ratione optio, rerum incidunt.
                </span>
            </section>
            <div class='bot'></div>
        </main>
    </div>

</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';


    .global-container{
        // size
        width: 100%;
        height: 100%;

        // position
        position: relative;

        // display
        @include flex();

        background-color: #111;

        .menu-global-container-open, .menu-global-container-close{
            // size
            width: 100%;
            height: 15%;

            // position
            position: fixed;
            left: 0;
            top: 0;
            z-index: 10000;

            // display
            @include flex(row, center, space-evenly);

            // decoration
            background-color: $h-c-black-opacity;

            // transition
            transition: height .5s;
        }

        .menu-global-container-close{
            // size
            height: 1%;
            
            // position
            position: fixed;
            top: 2%;
            z-index: 100;

            background-color: transparent;
        }

        main{
            position: absolute;
            // size
            width:70%;
            height:70%;

            // decoration
            background-color: #171717;
            border-radius: 10px;
            box-shadow: 0px 0px 38px 0px #121212;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                width: 0px; 
            }

            *{
                color: #fff !important;
            }

            div{
                width: 100%;
                height: 2rem;
                background-color: #171717;
                z-index: 100;
            }

            .top{
                position: sticky;
                top: 0;
            }

            .bot{
                position: sticky;
                bottom: 0;
            }

            section{
                overflow-y: hidden;

                padding-left: 2rem;
                padding-right: 2rem;

                @include flex(row, flex-start, center);
            }
        }
    }
</style>