<template>
    <main class="app-main">
        <!-- 搜索框区 -->
        <transition name="search">
            <section class="search-area" key="search">
                <h1 class="theme-logo" :class="{ 'enter-ani--title': enableEnterAnimate }" v-if="enableEnterAnimate">刻搜，即刻搜索</h1>
                <search-input></search-input>
                <img src="/website-icon.png" alt="icon" :class="{ 'enter-ani--logo': enableEnterAnimate }" v-if="enableEnterAnimate">
            </section>
        </transition>
        <!-- 笔记区 -->
        <transition name="note">
            <section class="note-area" key="note"></section>
        </transition>
    </main>
</template>
<script setup>
    import { useSettigsStore } from '@/stores/settings'
    import SearchInput from '@/views/Home/components/SearchInput/SearchInput.vue'
    import { storeToRefs } from 'pinia'

    const { enableEnterAnimate } = storeToRefs(useSettigsStore())

    defineOptions({
        name: 'AppMain'
    })
</script>
<style scoped lang="scss">
    .app-main {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        // z-index: 2;

        // 搜索框区
        .search-area {
            width: 100%;
            margin-top: 25rem;
            position: relative;
            z-index: 0;

            h1 {
                width: max-content;
                transition: none;
                position: absolute;
                bottom: 100%;
                left: 50%;
                z-index: -1;
                transform: translate(-50%, 4.5rem);
                font-size: 12rem;
            }
            img {
                position: absolute;
                top: 100%;
                left: 50%;
                z-index: -1;
                transform: translate(-50%, -3.5rem);
                width: 25rem;
                filter: contrast(.7) saturate(.8) brightness(.8) hue-rotate(3deg);
            }
			.enter-ani {
				&--title {
					animation: enter-topToBottom .5s, 
                           leave-topToBottom .3s .95s ease-in-out forwards;
				}
				&--logo {
					animation: enter-bottomToTop .5s, 
                           leave-bottomToTop .3s .9s ease-in-out forwards;
				}
			}
            @media only screen and (max-width: 700px) {
                h1 {
                    font-size: calc(2rem + 4vw);
                    bottom: 200%;
                }
                img {
                    width: calc(2rem + 20vw);
                    top: 200%;
                }
            }
        }
        // 笔记区
        // .note {

        // }
    }
    @keyframes enter-topToBottom {
        from {
            transform: translate(-50%, -10rem) scale(1.1);
        }
        to {
            transform: translate(-50%, 4.5rem) scale(1);
        }
    }
    @keyframes leave-topToBottom {
        from {
            opacity: 1;
            transform: translate(-50%, 4.5rem);
        }
        to {
            opacity: 0;
            display: none;
            transform: translate(-75%, 8rem);
        }
    }
    @keyframes enter-bottomToTop {
        from {
            transform: translate(-50%, -10rem);
        }
        to {
            transform: translate(-50%, -3.5rem);
        }
    }
    @keyframes leave-bottomToTop {
        from {
            opacity: 1;
            transform: translate(-50%, -3.5rem);
        }
        to {
            opacity: 0;
            display: none;
            transform: translate(-25%, -8rem);
        }
    }
</style>