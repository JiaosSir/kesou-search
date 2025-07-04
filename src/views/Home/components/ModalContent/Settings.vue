<template>
    <section class="settings">
        <!-- 选项栏 -->
        <div class="settings-items">
            <ul>
                <li v-for="item in list" :key="item.content">
                    <p>{{ item.content }}</p>
                    <jo-switch v-model="item.value" turnOnBgcolor="#7559ff"></jo-switch>
                </li>
            </ul>
        </div>
    </section>
</template>
<script setup>
	import { useSettigsStore } from '@/stores/settings'
	import { storeToRefs } from 'pinia'

	/**
     *   store
     */
	const { enableEnterAnimate } = storeToRefs(useSettigsStore())

    /**
     *   选项栏
     */
    const list = ref([
        {
            content: '入场动画',
            value: enableEnterAnimate
        }
    ])
    defineOptions({
        name: 'Wallpaper'
    })
</script>
<style scoped lang="scss">
.settings {
    width: 100%;
    padding: 0 2rem;
    // 选项栏
    &-items {
        ul {
            list-style: none;
            margin: 4rem 0;
            li {
                font-size: 1.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
}
</style>