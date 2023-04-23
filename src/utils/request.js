import axios from 'axios'
import {Loading,Message} from "element-ui";

const baseURL = 'api'
// 创建 axios 实例
const service = axios.create({
    baseURL: baseURL, // 请求地址前缀，将自动加在 url 前面
    timeout: 3000 // 请求超时时间
})

let loading=null // 将loading设置为全局  请求与响应一起使用

// 添加请求拦截器
service.interceptors.request.use(function (config) {

    // let token=localStorage.getItem('token') // 本地存储获取token
    // if(token){  //如果token存在
    //     config.headers.token=token
    // }
    // 给每次请求添加id值
    // if(config.method=='get'){
    //     config.params.requestId=Math.floor(Math.random()*999)
    // }else{
    //     config.data.requestId=Math.floor(Math.random()*999)
    // }
    // 在发送请求之前做些什么
    loading =Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (res) {
    loading.close();
    if (res.status&&res.status==200){
        if (res.data.code==500||res.data===401||res.data.code==403){
            Message.error({message:res.data.message});
            return;
        }
    }
    if (res.data.message) Message.success({message:res.data.message});
    return res.data;
}, function (error) {
    loading.close();
    if (error.response.data.message) Message.error({message:error.response.data.message});
    return;
});


export { service as axios }
