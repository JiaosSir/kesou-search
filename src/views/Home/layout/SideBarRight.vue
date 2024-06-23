<template>
    <section class="sidebar-right">
        <theme-button style="margin-right: 3rem;"/>
        <user-settings style="margin-right: 5rem;"></user-settings>
    </section>
</template>
<script setup>
    import ThemeButton from '@/views/Home/components/ThemeButton/ThemeButton.vue'
    import UserSettings from '@/views/Home/components/UserSettings/UserSettings.vue'

    defineOptions({
        name: 'SideBarRight'
    })
</script>
<style scoped lang="scss">
    .sidebar-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        z-index: 1;
    }
</style>