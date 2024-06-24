// 导入二次封装好的请求工具
import request from "@/utils/request";
function stringify(data) {
    var str = "";
    for (var k in data) {
        str += k + "=" + data[k] + "&";
    }
    // 不要最后一个&
    return str.slice(0, -1);
}
function GetHomePage(data) {
    return request.post(
        "/v1/home/page", //请求地址
        stringify(data), // 请求的数据
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } } //请求头
    );
}

export { GetHomePage };
