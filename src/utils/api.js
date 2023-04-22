import { axios } from './request'
//登陆
export function login(param) {
    return axios({
        url: "login/user",
        method: 'post',
        data: param,
    })
}

//注册
export function register(data){
    return axios({
        url:"user/add",
        method:'post',
        data:data,
    })
}

