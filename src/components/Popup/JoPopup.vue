<template>
    <!-- 弹出框背景区 -->
    <section class="jo-popup-box theme-pop">
        <!-- 弹出框列表区 -->
        <section class="jo-popup-list">
            <slot name="normal-list"></slot>
            <slot name="more-list"></slot>
            <slot name="setting"></slot>
        </section>
    </section>
</template>
<script setup>
    defineProps(['width'])
    defineOptions({
        name: 'JPopup'
    })
</script>
<style scoped lang="scss">
    // 弹出框背景区（width用于指定此处大小）
    .jo-popup-box {
        padding: 1rem 0;
        max-width: v-bind(width);
        border-radius: 1.5rem;
        backdrop-filter: blur(5rem);
        transition: .2s;
    }
    // 弹出框列表区（此处指定最大高度，更改滚动条）
    .jo-popup-list {
        padding: 0 1rem;
        max-height: 34.5rem;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
    }

    // ::-webkit-scrollbar    //滚动条整体部分
    // ::-webkit-scrollbar-button   //滚动条两端的按钮
    // ::-webkit-scrollbar-track   // 外层轨道
    // ::-webkit-scrollbar-track-piece    //内层轨道，滚动条中间部分（除去）
    // ::-webkit-scrollbar-thumb //滚动条里面可以拖动的那个
    // ::-webkit-scrollbar-corner   //边角
    // ::-webkit-resizer   ///定义右下角拖动块的样式
</style>