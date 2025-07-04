<template>
    <section class="search-engine">
        <h4>预设引擎</h4>
        <ul class="url-list theme-modal-block">
            <li class="theme-modal-block-item" v-for="list in urls" :key="list.url" @click="changeEngine(list)">
                <jo-load-img :src="list.icon"/>
                <p class="name">{{ list.name }}</p>
                <p class="url">{{ list.url }}</p>
                <!-- 当前选中引擎的图标 -->
                <div class="check" v-show="checkCurrentEngnie(list)"><el-icon size="2rem"><i-ep-CircleCheckFilled /></el-icon></div>
            </li>
        </ul>
        <nav>
            <h4>自定义引擎</h4>
            <el-icon size="2rem" @click="isToAdd = !isToAdd"><i-ep-CirclePlusFilled /></el-icon>
            <el-icon size="2rem" style="margin-left: .5rem;" @click="hasDel = !hasDel"><i-ep-Remove /></el-icon>
        </nav>
        <p v-if="customUrls.length == 0">暂无自定义引擎</p>
        <ul class="url-list theme-modal-block">
            <li class="theme-modal-block-item" v-for="list in customUrls" :key="list.url" @click="changeEngine(list)">
                <!-- 删除按钮 -->
                <transition name="del">
                    <el-icon v-show="hasDel" class="url-list-remove" size="2rem" @click.stop="openConfirmModal(list.url)"><i-ep-RemoveFilled /></el-icon>
                </transition>
                <jo-load-img :src="list.icon"/>
                <p class="name">{{ list.name }}</p>
                <p class="url">{{ list.url }}</p>
                <!-- 当前选中引擎的图标 -->
                <div class="check" v-show="checkCurrentEngnie(list)"><el-icon size="2rem"><i-ep-CircleCheckFilled /></el-icon></div>
            </li>
        </ul>
    </section>
    <add-engine v-model="isToAdd" />
    <message-confirm 
        v-model="isToDel" 
        title="请确认" 
        message="是否要删除该搜索引擎？"
        @confirm="toDel"
        @cancel="resetDel"
    />
</template>
<script setup>
    import { storeToRefs } from 'pinia'
    import { useSearchUrlStore } from '@/stores/searchUrl'
    import AddEngine from '@/views/Home/components/ModalContent/AddEngine.vue'

    /** 
     * store 
    */
    const { urls, customUrls } = storeToRefs(useSearchUrlStore())
    const { delUrl, changeUrl, checkCurrentEngnie } = useSearchUrlStore()


    const isToAdd = ref(false) // 是否开启添加自定义引擎页面
    const isToDel = ref(false) // 是否开启删除提示框
    const hasDel = ref(false)  // 是否进行删除引擎
    const urlToDel = ref('')  // 即将删除的url
    // 更换搜索引擎
    const changeEngine = urlList => changeUrl(urlList)
    // 打开删除确认框
    const openConfirmModal = url => {
        urlToDel.value = url
        isToDel.value = !isToDel.value
    }
    // 重置删除值
    const resetDel = () => urlToDel.value = ''
    // 删除搜索引擎
    const toDel = () => {
        delUrl(urlToDel.value)
        resetDel()
        console.log(urlToDel.value);
    }

    defineOptions({
        name: 'SearchEngine'
    })
</script>
<style scoped lang="scss">
    .search-engine {
        width: 100%;
        padding: 0 2rem;
        @media only screen and (max-width: 600px) {
            & {
                padding: 0 0 0 1rem;
            }
        }
        nav {
            margin-bottom: .5rem;
            display: flex;
            align-items: center;
            &>h4 {
                margin-right: 1rem;
                margin-bottom: 0;
            }
            i {
                transition: .1s;
            }
            i:hover {
                transform: scale(1.2);
            }
        }
        h4 {
            margin-bottom: .5rem;
            font-size: 1.8rem;
            font-weight: 500;
        }
        .url-list {
            margin-bottom: 2rem;
            list-style: none;
            border-radius: 1rem;
            overflow: hidden;
            transition: .2s;

            &-remove {
                display: block;
                margin-right: 1rem;
                transition: .2s;

                &:hover {
                    transform: scale(1.2);
                }
            }

            li {
                cursor: pointer;
                padding: 1rem 1.5rem;
                display: flex;
                align-items: center;
                position: relative;
                transition: .2s;

                // 引擎图标
                img {
                    width: 2.2rem;
                    height: 2.2rem;
                }
                p {
                    font-size: 1.6rem;
                    margin-left: 1.2rem;
                    white-space: nowrap;
                }
                // url文字
                .url {
                    margin-left: 3rem;
                    font-size: 1.4rem;
                    opacity: .6;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                // 当前选中引擎的图标
                .check {
                    margin-left: auto;
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
    .del-enter-active {
        animation: leftToRight .2s;
    }
    .del-leave-active {
        animation: leftToRight .2s reverse;
    }
    @keyframes leftToRight {
        0% {
            opacity: 0;
            transform: translateX(-2rem);
        }
        100% {
            transform: translateX(0);
        }
    }
</style>