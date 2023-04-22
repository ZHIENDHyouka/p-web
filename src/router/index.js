import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/view/Login";
import Home from "@/view/Home"
import Movie from "@/view/MoviePreview"
import Search from "@/view/Search";

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        hidden:true
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/movie',
                name: '首页',
                component: Movie,
            },
            {
                path: '/search',
                name: '电影查找',
                component: Search,
            }
        ]
    },

]

export default new VueRouter({
    routes
})
