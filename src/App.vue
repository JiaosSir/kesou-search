<template>
    <div class="app">
        <router-view name="Home"></router-view>
        <jo-mask :state="modalState"></jo-mask>
        <transition name="modal">
            <jo-modal v-if="modalState"></jo-modal>
        </transition>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { useCloseBlockStore } from '@/stores/closeBlock'
import { useModalStore } from '@/stores/modal'
import { useSearchUrlStore } from '@/stores/searchUrl'
import { useSettigsStore } from '@/stores/settings'
/** 
 * store 
*/
const { theme, wallpaper } = storeToRefs(useThemeStore())
const { modalState } = storeToRefs(useModalStore())
const { urls, currentUrl } = storeToRefs(useSearchUrlStore())
const { disableWallpaper } = storeToRefs(useSettigsStore())
const { changeTheme } = useThemeStore()
const { setCurrentPop } = useCloseBlockStore()


/** 
 * 初始化主题
*/
changeTheme(theme.value)
// 监听 useThemeStore 的state
watch(
    theme,
    themeV => {
        // 明暗主题下更换Github图标
        urls.value.forEach(v => {
          if(v.name.includes('Github')) {
            v.icon = themeV === 'light' ? '/github-mark.png' : '/github-mark-white.png'
          }
        })
        // 初始化加载
        if (currentUrl.value.name.includes('Github')) {
          currentUrl.value.icon = themeV === 'light' ? '/github-mark.png' : '/github-mark-white.png'
        }
    },
    {
        immediate: true
    }
)
watch(
    wallpaper,
    newValue => {
        document.body.style.backgroundImage = `url(${newValue})`
    },
    {
        immediate: true
    }
)
watchEffect(() => {
    if (disableWallpaper.value) {    // 开启壁纸禁用
        wallpaper.value = ''         // 清空壁纸
    }
})

/**
 *  关闭弹框（全局变量）
 */
document.documentElement.onclick = () => setCurrentPop('')

</script>
<style lang="scss">
.modal-enter-active,
.modal-leave-active {
    transition: .1s;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0
}

.modal-enter-to,
.modal-leave-from {
    opacity: 1
}
</style>