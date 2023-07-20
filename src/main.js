import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
Vue.config.productionTip = false
import echarts from 'echarts'
Vue.use(echarts)
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts//封装一下
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
