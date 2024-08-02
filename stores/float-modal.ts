import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFloatModalStore = defineStore('floatmodal', () => {
    const modal = ref(null)
    const modal_styles = ref({})
    const can_show = ref(true)
    const is_visible = ref(false)

    function show(e: any, data: any){
        is_visible.value = true
        setModalStyles(e)
    }

    function hide(){
        is_visible.value = false
    }

    function setModalStyles(e: any){
        modal_styles.value = {
            top: `${e.y}px`,
            left: `${e.x + 10}px`,
            position: 'absolute'
        }
    }
  
    return { modal_styles, can_show, is_visible, show, hide }
})