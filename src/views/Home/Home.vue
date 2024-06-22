<template>
    <section class="home" id="home">
        <jo-row>
            <jo-col col="3">
                <sidebar-left></sidebar-left>
            </jo-col>
            <jo-col col="6">
                <app-main></app-main>
            </jo-col>
            <jo-col col="3">
                <sidebar-right></sidebar-right>
            </jo-col>
        </jo-row>
    </section>
</template>
<script setup>
    import AppMain from '@/views/Home/layout/AppMain.vue'
    import SidebarLeft from '@/views/Home/layout/SideBarLeft.vue'
    import SidebarRight from '@/views/Home/layout/SideBarRight.vue'
    
</script>
<style scoped lang="scss">
    .home {
        height: calc(100vh - $body-padding);
    }
</style>