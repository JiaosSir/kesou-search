import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 *  全局管理搜索引擎（需持久化管理）
 *  @param { urls } Array 内置的搜索引擎
 */
export const useSearchUrlStore = defineStore('searchUrl', () => {
    const urls = ref([
        {
            url: 'https://www.baidu.com/s?ie=utf-8&word=',
            icon: 'https://www.baidu.com/favicon.ico',
            name: '百度',
        },
        {
            url: 'https://www.bing.com/search?q=',
            icon: 'https://www.bing.com/favicon.ico',
            name: '必应',
        },
        {
            url: 'https://www.google.com/search?q=',
            icon: '/src/assets/google.png',
            name: '谷歌',
        },
        {
            url: 'https://www.sogou.com/web?query=',
            icon: 'https://www.sogou.com/favicon.ico',
            name: '搜狗',
        },
    ])
    // 自定义的搜索引擎
    const customUrls = ref([])
    // 当前的搜索引擎
    const currentUrl = ref(JSON.parse(JSON.stringify(urls.value[0])))
    // 改变搜索引擎
    const changeUrl = urlList => {
        currentUrl.value = urlList
    }
    // 新增搜索引擎
    const addUrl = urlList => customUrls.value.unshift(urlList)
    // 检测是否有重复的域名
    const checkRepeat = url => {
        const hostname = new URL(url).hostname                               // 获取域名
        const newUrl = urls.value.concat(customUrls.value)                   // 合并两个数组
        const res = newUrl.filter(v => new URL(v.url).hostname === hostname) // 过滤数组
        return res.length !== 0 ? false : true
    }

    return { urls, customUrls, currentUrl, changeUrl, addUrl, checkRepeat }
}, {
    persist: {
        paths: ['customUrls', 'currentUrl']
    }
})