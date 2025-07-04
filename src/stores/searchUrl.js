import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 *  全局管理搜索引擎（需持久化管理）
 *  @param { urls } Array 内置的搜索引擎
 */
export const useSearchUrlStore = defineStore('searchUrl', () => {
    const urls = ref([
        {
            url: 'https://www.bing.com/search?q=',
            icon: 'https://www.bing.com/favicon.ico',
            name: '必应',
        },
        {
            url: 'https://www.google.com/search?q=',
            icon: '/google.png',
            name: '谷歌',
        },
        {
            url: 'https://www.baidu.com/s?ie=utf-8&word=',
            icon: 'https://www.baidu.com/favicon.ico',
            name: '百度',
        },
        {
            url: 'https://github.com/search?type=repositories&q=',
            icon: '/github-mark.png',
            name: 'Github',
        },
        {
            url: 'https://so.youku.com/search_video/q_',
            icon: 'https://so.youku.com/favicon.ico',
            name: '优酷',
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
    // 删除搜索引擎
    const delUrl = url => {
        customUrls.value = customUrls.value.filter(v => v.url !== url)
        // 若删除的是当前正在使用的引擎，则把引擎切换至百度
        if (url === currentUrl.value.url) {
            changeUrl(
                {
                    url: 'https://www.baidu.com/s?ie=utf-8&word=',
                    icon: 'https://www.baidu.com/favicon.ico',
                    name: '百度',
                }
            )
        }
        ElMessage({
            type: 'success',
            message: '删除成功',
        })
    }
    // 检测是否有重复的域名
    const checkRepeat = url => {
        const hostname = new URL(url).hostname                               // 获取域名
        const newUrl = urls.value.concat(customUrls.value)                   // 合并两个数组
        console.log(newUrl);
        const res = newUrl.filter(v => new URL(v.url).hostname === hostname) // 过滤数组
        return res.length !== 0 ? false : true
    }
    // 检测当前搜索引擎
    const checkCurrentEngnie = url => {
        return url.url === currentUrl.value.url
    }

    return { urls, customUrls, currentUrl, changeUrl, addUrl, delUrl, checkRepeat, checkCurrentEngnie }
}, {
    persist: {
        paths: ['customUrls', 'currentUrl']
    }
})