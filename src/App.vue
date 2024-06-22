<template>
    <router-view name="Home"></router-view>
    <jo-mask :state="modalState"></jo-mask>
    <transition name="modal">
        <jo-modal v-show="modalState"></jo-modal>
    </transition>
</template>
<script setup>
    import { storeToRefs } from 'pinia'
    import { useThemeStore } from '@/stores/theme'
    import { useCloseBlockStore } from '@/stores/closeBlock'
    import { useModalStore } from '@/stores/modal'
    import { useSettigsStore } from '@/stores/settings'
    /** 
     * store 
    */
    const { theme, wallpaper } = storeToRefs(useThemeStore())
    const { modalState } = storeToRefs(useModalStore())
    const { disableWallpaper } = storeToRefs(useSettigsStore())
    const { changeTheme } = useThemeStore()
    const { setCurrentPop } = useCloseBlockStore()

    
    /** 
     * 初始化主题
    */
    changeTheme(theme.value)
    // 监听 useThemeStore 的state
    watch(
        wallpaper,
        newValue => {
            document.body.style.backgroundImage =  `url(${newValue})`},
        {
            immediate: true
        }
    )
    watchEffect(() => {
        console.log(disableWallpaper.value);
        if(disableWallpaper.value) {    // 开启壁纸禁用
            wallpaper.value = ''        // 清空壁纸
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