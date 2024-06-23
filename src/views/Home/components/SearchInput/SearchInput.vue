<template>
    <div class="search">
        <!-- 搜索框（整体） -->
        <section class="search-input theme-searchInput" ref="searchInput">
            <!-- 左侧搜索引擎图标 -->
            <div class="search-input-i" @click.stop="">
                <div class="search-input--icon" @click="popSearchUrlList" :title="thisUrlName">
                    <jo-load-img :src="thisUrlIcon" class="url-icon"/>
                </div>
                <!-- 弹出框 -->
                <transition name="popSearch">
                    <search-url-list v-show="isSwitch" class="search-pop"></search-url-list>
                </transition>
            </div>
            <!-- 输入框 -->
            <input ref="inputArea" type="text" placeholder="刻搜，下一刻......"
                    v-model="keyword" @keydown.enter="toSearch" 
                    @focus="addClass" @blur="removeClass">
            <!-- 右侧搜索图标 -->
            <div class="search-input--icon" @click="toSearch">
                <el-icon class="search" size="20"><i-ep-Search/></el-icon>
            </div>
        </section>  
    </div>
    <teleport to='#app'>
        <jo-mask v-if="wallpaper.length > 0" :state="showMask" index="0" bgColor="rgba(90, 90, 90, .3)" blur="2rem"></jo-mask>
    </teleport>
</template>
<script setup>
    import { storeToRefs } from 'pinia'
    import { useSearchUrlStore } from '@/stores/searchUrl'
    import { useCloseBlockStore } from '@/stores/closeBlock'
    import { useThemeStore } from '@/stores/theme'
    import SearchUrlList from './SearchUrlList.vue'

    /** 
     * store 
    */
    const { currentUrl } = storeToRefs(useSearchUrlStore())
    const { wallpaper } = storeToRefs(useThemeStore())
    // 弹出框store
    const closeBlockStore = useCloseBlockStore()
    const { compareCurrentPop, setCurrentPop } = closeBlockStore

    /**
     *  遮罩
     */
    const showMask = ref(false)

    /**
     *  搜索框样式
     */
    const searchInput = ref(null)
    const inputArea = ref(null)
    const addClass = () => {
        searchInput.value.classList.add('theme-searchInput-click')
        inputArea.value.setAttribute('placeholder', '')
        showMask.value = true
    }
    const removeClass = () => {
        searchInput.value.classList.remove('theme-searchInput-click')
        inputArea.value.setAttribute('placeholder', '刻搜，下一刻......')
        showMask.value = false
    }

    /**
     *  搜索
     */
    const keyword = ref('')                                   // 搜索的关键字
    const thisUrl = computed(() => currentUrl.value.url)      // 当前网址
    const thisUrlIcon = computed(() => currentUrl.value.icon) // 当前网址图标
    const thisUrlName = computed(() => currentUrl.value.name) // 当前网址名称
    const toSearch = () => {                                  // 搜索事件
        location.assign(thisUrl.value + keyword.value)
    }

    /**
     *  弹框
     */
    const isSwitch = ref(false)                               // 弹框显示 控制变量
    const popName = 'searchEngine'                            // 弹框名称
    const popSearchUrlList = () => {                          // 弹出搜索引擎列表
        // 如果该弹框不是当前弹框，则设置该弹框为当前弹框，否则设置当前弹框为空（用于重复点击按钮时关闭弹框）
        !compareCurrentPop(popName) ? setCurrentPop(popName) : setCurrentPop('')
    }
    // 监听closeBlockStore的state
    closeBlockStore.$subscribe(() => {
        if (compareCurrentPop(popName)) {  // 若比较成功，则弹出弹框，否则不弹出
            isSwitch.value = true
        }else {
            isSwitch.value = false
        }
    })


    defineOptions({
        name: 'SearchInput'
    })
</script>
<style scoped lang="scss">
    // 搜索框父级
    .search {
        width: 100%;
        
        // 搜索框
        &-input {
            padding: 0 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: .2s;

            // 右侧搜索图标
            .url-icon {
                width: 2rem;
                height: 2rem;
            }
            // 输入框
            input {
                width: 100%;
                height: 7.4rem;
                color: inherit;
                outline: none;
                border: none;
                box-shadow: none;
                border-radius: 2rem;
                background-color: transparent;
                text-align: center;
                font-size: 1.9rem;
                flex-grow: 1;

                &::placeholder {
                    color: $input-placeholder-color;
                }
            }
            // 左侧搜索引擎图标
            &--icon {
                width: 3.5rem;
                height: 3.5rem;
                border-radius: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                transition: .2s;

                &:hover {
                    transform: scale(1.2);
                    background-color: rgba(215, 215, 215, 0.5);
                }
                &:active{
                    transform: scale(1.1);
                }
            }
        }

        // 弹出框父级
        &-input-i {
            position: relative;
        }
        // 弹出框
        &-pop {
            position: absolute;
            top: 120%;
            left: -120%;
        }
    }
    
    // 搜索引擎列表动画
    .popSearch-enter-active {
        transform-origin: center top;
        animation: urlList .3s;
    }
    .popSearch-leave-active {
        transform-origin: center top;
        animation: urlList .3s reverse;
    }
    @keyframes urlList {
        0% {
            opacity: 0;
            transform: scale(.1) translateY(-1.5rem);
        }
        100% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
</style>