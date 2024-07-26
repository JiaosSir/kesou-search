<template>
    <section class="jo-nav">
        <slot></slot>
    </section>
</template>
<script setup>
    defineOptions({
        name: 'SideBarRight'
    })
</script>
<style scoped lang="scss">
    .jo-nav {
        position: relative;
        padding: .5rem 0;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        z-index: 2;
    }
</style>