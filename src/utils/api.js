import { axios } from './request'
export function login(param) {
    return axios({
        url: "login/login",
        method: 'post',
        data: param,
    })
}
