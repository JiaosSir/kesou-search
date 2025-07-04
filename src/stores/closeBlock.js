import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 *  全局管理弹出框的关闭（在弹出框打开情况下，点击页面其它部分关闭弹出框）
 *  @param { currentPop } String 当前打开的弹出框
 */
export const useCloseBlockStore = defineStore('closeBlock', () => {
    const currentPop = ref('')
    // 比较弹出框是否是当前已打开的弹出框
    const compareCurrentPop = popName => popName === currentPop.value ? true : false
    // 设置当前打开的弹出框
    const setCurrentPop = popName => {
        currentPop.value = popName
    }
    
    return {
        currentPop,
        setCurrentPop,
        compareCurrentPop,
    }
})
