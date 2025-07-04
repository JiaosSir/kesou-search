import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 *  全局管理设置项（需持久化管理）
 */
export const useSettigsStore = defineStore('settings', () => {
    const disableWallpaper = ref(false)   // 禁用壁纸

    return { disableWallpaper }
}, {
    persist: true
})
