<template>
    <jo-popup width="13rem">
        <!-- 内置引擎 -->
        <template #normal-list>
            <ul class="url-list">
                <li :class="`theme-pop-item ${checkCurrentEngnie(list) ? 'theme-pop-strong-item' :''}`" v-for="list in urls" :key="list.url" @click="changeEngine(list)">
                    <jo-load-img :src="list.icon"/>
                    <p>{{ list.name }}</p>
                </li>
            </ul>
        </template>
        <!-- 自定义引擎 -->
        <template #more-list>
            <ul class="url-list split-line">
                <li :class="`theme-pop-item ${checkCurrentEngnie(list) ? 'theme-pop-strong-item' :''}`" v-for="list in customUrls" :key="list.url" @click="changeEngine(list)">
                    <jo-load-img :src="list.icon"/>
                    <p>{{ list.name }}</p>
                </li>
            </ul>
        </template>
        <!-- 设置项 -->
        <template #setting>
            <ul class="url-list split-line">
                <li class="setting theme-pop-item" @click="toAdd">
                    <el-icon size="18"><i-ep-Tools/></el-icon>
                    <p>自定义</p>
                </li>
            </ul>
            <add-engine v-model="isToAdd"></add-engine>
        </template>
    </jo-popup>
</template>
<script setup>
    import { storeToRefs } from 'pinia'
    import { useSearchUrlStore } from '@/stores/searchUrl'
    import { useCloseBlockStore } from '@/stores/closeBlock'
    import AddEngine from '@/views/Home/components/ModalContent/AddEngine.vue'
    
    /** 
     * store 
    */
    const { urls, customUrls } = storeToRefs(useSearchUrlStore())
    const { changeUrl, checkCurrentEngnie } = useSearchUrlStore()
    const { setCurrentPop } = useCloseBlockStore()


    const isToAdd = ref(false) // 是否开启添加自定义引擎页面
    // 更换搜索引擎
    const changeEngine = urlList => changeUrl(urlList)
    const toAdd = () => {
        isToAdd.value = !isToAdd.value // 开启引擎模态框
        setCurrentPop('')              // 关闭弹出框
    }

    defineOptions({
        name: 'SearchUrlList'
    })
</script>
<style scoped lang="scss">
    // 列表
    .url-list {
        list-style: none;

        li {
            cursor: pointer;
            padding: .5rem 1rem;
            margin-bottom: .5rem;
            border-radius: .5rem;
            display: flex;
            align-items: center;
            position: relative;
            transition: .08s;
            
            &:hover {
                &>:first-child{
                    transform-origin: center center;
                    transform: scale(1.25);
                    transition: .4s;
                }
            }

            // 引擎图标
            img {
                width: 1.8rem;
                height: 1.8rem;
            }
            p {
                font-size: 1.4rem;
                margin-left: 1.2rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        // 去除设置项下边距
        .setting {
            margin-bottom: 0;
        }
    }
</style>