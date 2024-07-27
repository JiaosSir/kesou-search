export const useAddSearchUrl = url => {
    if (!url) {
        return {
            url: '',
            icon: ''
        }
    }
    try {
        const u = new URL(url)
        const reg = /(&|\?)[^=&]+=test(&|$)/       // 匹配带有test的参数字段
        if (u.hash) {                              // hash模式
            const str = u.hash.match(reg)
            if (str) {
                const sliceStart = str.input.indexOf('?')           // 匹配“？”
                const searchParam = str.input.slice(0, sliceStart + 1)  // 取得“？”之前的字符（包含“？”）
                return {
                    url: u.origin + u.pathname + searchParam + str[0].replace(str[1], '').replace(str[2], '').replace('test', ''),
                    icon: u.origin + '/#/favicon.ico'
                }
            }else {
                return {
                    url: '',
                    icon: ''
                }
            }
            
        } else {                                   // history模式
            const str = u.search.match(reg)        // 匹配结果
            if (str) {
                return {
                    url: u.origin + u.pathname + '?' + str[0].replace(str[1], '').replace(str[2], '').replace('test', ''),
                    icon: u.origin + '/favicon.ico'
                }
            }else {
                return {
                    url: '',
                    icon: ''
                }
            }
        }
    }catch {
        return {
            url: '',
            icon: ''
        }
    }
}