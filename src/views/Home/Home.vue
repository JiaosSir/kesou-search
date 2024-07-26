<template>
    <section class="home" id="home">
        <!-- 导航栏 -->
        <jo-row>
            <jo-col col="12">
                <jo-nav class="small-nav">
                    <theme-button style="margin-right: 3rem;" />
                    <user-settings class="small-settings"></user-settings>
                </jo-nav>
            </jo-col>
        </jo-row>

        <jo-row class="normal-screen">
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

        <jo-row class="small-screen">
            <jo-col col="1">
                <sidebar-left></sidebar-left>
            </jo-col>
            <jo-col col="10">
                <app-main></app-main>
            </jo-col>
            <jo-col col="1">
                <sidebar-right></sidebar-right>
            </jo-col>
        </jo-row>
    </section>
</template>
<script setup>
import AppMain from '@/views/Home/layout/AppMain.vue'
import SidebarLeft from '@/views/Home/layout/SideBarLeft.vue'
import SidebarRight from '@/views/Home/layout/SideBarRight.vue'
import ThemeButton from '@/views/Home/components/ThemeButton/ThemeButton.vue'
import UserSettings from '@/views/Home/components/UserSettings/UserSettings.vue'

</script>
<style scoped lang="scss">
.home {
    height: calc(100vh - $body-padding-tb);
}

.normal-screen {
    display: flex;
}

.small-screen {
    display: none;
}
.small-settings {
    margin-right: 5rem;
}

@media only screen and (max-width: 992px) {
    .normal-screen {
        display: none;
    }

    .small-screen {
        display: flex;
        pointer-events: none;
    }

    .small-nav {
        justify-content: space-between;
    }
    .small-settings {
        margin-right: 0;
    }
}
</style>