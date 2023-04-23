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

//获取电影信息
export function getAllMovieBaseInfo(){
    return axios({
        url:'movie/getAllMovieBaseInfo',
        method:'get',
    })
}

//跟根据电影id获取电影信息
export function getMovieInfoById(id){
    return axios({
        url:`movie/getMovieInfoById?id=${id}`,
        method:'get'
    })
}

//用户评分
export function userMovieScore(data){
    return axios({
        url:`movie/userMovieScore`,
        method:'post',
        data:data,
    })
}

//查询当前用户对电影评分
export function getUserMovieScore(data){
    return axios({
        url:'movie/getUserMovieScore',
        method:'post',
        data:data
    })
}

//查询当前电影是否被用户关注
export function queryConcernMovie(data){
    return axios({
        url:'userwant/queryConcernMovie',
        method:'post',
        data:data
    })
}

//关注修改
export function updateUserMovieConcern(data){
    return axios({
        url:'userwant/updateUserMovieConcern',
        method:'post',
        data:data
    })
}

