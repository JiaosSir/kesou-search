<template>
    <section class="jo__btn--switch-theme">
        <!-- 左侧图标 -->
        <el-icon class="light-icon" size="1.8rem"><i-ep-Sunrise /></el-icon>
        <!-- 切换按钮 -->
        <jo-switch 
            v-model="state" 
            turnOnBgcolor="#7543ff" turnOffBgcolor="#bba3ff"
            turnOnBorderColor="#fff" turnOffBorderColor="#7441ff"
            turnOffBtnColor="#f6efff"
            @click="switchTheme" 
        />
        <!-- 右侧图标 -->
        <el-icon class="dark-icon" size="1.8rem"><i-ep-MoonNight /></el-icon>
        <!-- 遮罩 -->
        <transition name="mark">
            <div class="mark" v-show="wallpaper.length == 0 ? state : false"></div>
        </transition>
    </section>
</template>

<script setup>
    import { storeToRefs } from 'pinia'
    import { useThemeStore } from '@/stores/theme'

    const { changeTheme } = useThemeStore()
    const { theme, wallpaper } = storeToRefs(useThemeStore())

    const state = ref(false)                                                 // 按钮开关状态
    const LightIconOpacity = computed(() => state.value ? 0 : 1)             // 明亮主题图标透明度
    const DarkIconOpacity = computed(() => state.value ? 1 : 0)              // 暗黑主题图标透明度
    // 更改主题
    const switchTheme = () => {
        // 壁纸不存在
        if(wallpaper.value.length == 0) {
            if(state.value) {
                setTimeout(() => {
                    changeTheme('dark')
                }, 200)
            }else {
                setTimeout(() => {
                    changeTheme('light')
                }, 50)
            }
        // 壁纸存在
        } else {
            if(state.value) {
                changeTheme('dark')
            }else {
                changeTheme('light')
            }
        }
        
    }

    onBeforeMount(() => {
        // 初始化按钮状态
        if (theme.value === 'dark') {
            state.value = true
        }
    })
    defineOptions({
        name: 'ThemeButton'
    })
</script>

<style scoped lang="scss">
    .jo__btn--switch-theme {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        position: relative;
        z-index: 0;

        // 切换主题时扩大的圈
        .mark {
            position: absolute;
            top: 0;
            left: 4rem;
            z-index: -99;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            background-color: #151515;
        }

        // 左侧图标
        .light-icon {
            margin-right: .5rem;
            color: #6c1fe7;
            opacity: v-bind(LightIconOpacity);
            transition: .2s;
        }
        // 右侧图标
        .dark-icon {
            margin-left: .6rem;
            color: #e4d6ff;
            opacity: v-bind(DarkIconOpacity);
            transition: .2s;
        }
    }
    .mark-enter-active {
        animation: markAppear .5s linear forwards;
    }
    .mark-leave-active {
        animation: markDisappear .5s linear forwards;
    }
    @keyframes markAppear {
        0% {
            opacity: 0;
            transform: scale(1);
        }
        100% {
            opacity: 1;
            transform: scale(190);
        }
    }
    @keyframes markDisappear {
        0% {
            opacity: 1;
            transform: scale(190);
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: .7;
            transform: scale(1);
        }
    }
</style>