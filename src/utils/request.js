import axios from "axios"

let loading = null                          // 加载动画实例
// 创建实例时配置默认值
const Axios = axios.create({
    baseURL: 'http://localhost:8088',
    timeout: 5000,
})

// 创建实例后修改默认值
// Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    loading = ElLoading.service({           // 开启加载动画
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    return config
}, function (error) {
    // 对请求错误做些什么
    loading.close()                         // 关闭加载动画
    ElNotification({                        // 弹出提示框
        type: 'warning',
        title: '网络开小差了',
        message: "请检查一下网络设置！",
        position: 'bottom-left',
    })
    return Promise.reject(error)
})

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    loading.close()                         // 关闭加载动画
    return response
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    loading.close()                         // 关闭加载动画
    ElNotification({                        // 弹出提示框
        type: 'error',
        title: '请求出错',
        message: "请稍后再试吧",
        position: 'bottom-left',
    })
    return Promise.reject(error)
})

export default Axios