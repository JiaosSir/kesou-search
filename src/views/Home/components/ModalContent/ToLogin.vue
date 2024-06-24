<template>
    <section class="login-box">
        <h1>登录</h1>
        <p class="remind">手机号</p>
        <input class="input" type="text" >
        <p class="remind">密码</p>
        <input class="input" type="password">
        <div class="noticy">
            <p class="toggle1">
                <span>忘记密码</span>
            </p>
            <p class="toggle2">没有账号？<span>去注册</span></p>
        </div>
        <button @click="onSubmit">登录</button>
    </section>
</template>
<script setup>
// import { reactive } from "vue";
    defineOptions({
        name: 'ToLogin'
    })
    // const data = reactive({
    //     telNumber:'',
    //     pwd:''
    // })  
    // console.log(data.telNumber);
    // const onSubmit = ()=>{
// 网络请求先不要碰，要对axios做个二次封装，到时候有关网络请求的要写在api里面
// 继续写页面捏，写新的，或者  要不你帮我写axios二次封装，不会百度   util里面
// 文件名叫啥都行，我一般用request.js
    // }
</script>
<style scoped lang="scss">
    .login-box{
        width: 50rem;
        height: 35rem;
        padding: 2rem;
        margin: 1rem auto;
        border: 1px solid #828181;
        border-radius: 1rem;
        h1{
            font-size: 2.5rem;
            padding-bottom: 1rem;
        }

        .remind{
            font-size: 1.3rem;
            padding-left: 2rem;
            color: rgba(130, 129, 129, 0.845);
        }
        .input{
            width: 42rem;
            height: 3.5rem;
            padding: 1rem;
            margin-left: 1.8rem;
            margin-bottom: 1rem;
            background-color: rgba(130, 129, 129, 0.384);;
            border: none;
            border-radius: .5rem;
        }
        .input:focus{
            outline-color: #8e5aff7c;
            background-color: #8e5aff26;
        }
        .noticy{
            display: flex;
            justify-content: space-between;
            margin-top: 2rem;
            .toggle1{
                color: #8F5AFF;
                font-size: 1.3rem;
                padding-left: 1.5rem;
                padding-bottom: 2rem;
            }
            span{
                color: #8F5AFF;
                font-size: 1.3rem;
            }
            .toggle2{
                font-size: 1.3rem;
                padding-right: 1.5rem;
                padding-bottom: 2rem;
            }
        }
        button{
            width: 42rem;
            height: 5rem;
            font-size: 1.5rem;
            color: #ffffff;
            background-color: #8F5AFF;
            border: none;
            border-radius: .5rem;
            margin-left: 1.8rem;
        }
    }

</style>