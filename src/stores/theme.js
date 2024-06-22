import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 *  全局管理主题变更（需持久化管理）
 *  @param { theme } String 主题名称
 *  @param { wallpaper } String 壁纸地址
 */
export const useThemeStore = defineStore('theme', () => {
    const theme = ref('light')
    const wallpaper = ref('')
    const changeTheme = t => {
        theme.value = t
        document.documentElement.setAttribute('data-theme', t)
    }
    const changeWallpaper = src => {
        console.log(src);
        wallpaper.value = src
    }
    const clearWallpaper = () => wallpaper.value = ''

    return { theme, wallpaper, changeTheme, changeWallpaper, clearWallpaper }
}, {
    persist: true
})
