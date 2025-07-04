import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'

/**
 *  全局模态框管理
 */
export const useModalStore = defineStore('modal', () => {
    const modalState = ref(false)  // 状态
    const modalTitle = ref(null)   // 标题
    const modalContent = shallowRef(null)  // 内容（模版）
    const changeModalState = () => modalState.value = !modalState.value    // 变更状态
    const setModal = (title, component) => {                               // 初始化
        modalTitle.value = title
        modalContent.value = component
    }
    const changeTitle = title => {                                         // 修改标题
        modalTitle.value = title
    }
    
    return { modalState, modalTitle, modalContent, changeModalState, setModal, changeTitle }
})
