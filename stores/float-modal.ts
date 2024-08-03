import { defineStore } from 'pinia'
import { ref } from 'vue'
import ModalComponentsArtist from '@/components/modal/components/artist.vue'
import ModalComponentsAlbum from '@/components/modal/components/album.vue'

export const useFloatModalStore = defineStore('floatmodal', () => {
    const modal_component:any = ref(null)
    const modal_props = ref('')
    const modal_styles = ref({})
    const can_show = ref(true)
    const is_visible = ref(false)
    const data_charged = ref('hidden')

    function show(e: any, data: any){
        setModalData(true, data)
        setModalStyles(e)
    }

    function hide(){
        setModalData(false, {})
        data_charged.value = 'hidden'
    }

    function setModalData(visible: any, data: any){
        is_visible.value = visible
        modal_props.value = data

        if(!data.type){
            modal_component.value = ''
            return
        }

        switch (data.type){
            case 'artist':
                modal_component.value = ModalComponentsArtist
                break
            case 'album':
                modal_component.value = ModalComponentsAlbum
                break
        }
    }

    function setModalStyles(e: any){
        modal_styles.value = {
            top: `${e.y}px`,
            left: `${e.x + 10}px`
        }
    }
  
    return { modal_component, modal_props, modal_styles, can_show, is_visible, data_charged, show, hide }
})