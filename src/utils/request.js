// 对 axios 进行集中管理（对axios二次封装）
import axios from "axios";
// 导入Vue
import Vue from "vue";
import Toast from "@/plugin/Toast";  //之前写的toast插件
Vue.use(Toast);
//设置默认：请求域名，超时时间
const request = axios.create({
    baseURL: "http://localhost:8080", //默认请求域名
    timeout: 5000, //请求超时  请求5秒还没好，就返回失败
});

//对请求进行拦截，添加加载提示  token   config请求配置
request.interceptors.request.use(function (config) {
    // console.log(config);
    // console.log("请求加载中...");
    Toast.show("加载中...", 5000);  // 显示加载提示
    //返回配置 
    return config;
//拦截响应头 ，关闭加载提示，（ajax 结束）
request.interceptors.response.use(
    function (res) {
        // console.log("加载结束....");
        Toast.hide();  // 请求结束，关闭加载提示
        return res;
    },
    function (err) {
        Toast.hide();
        return err;
    }
)
})