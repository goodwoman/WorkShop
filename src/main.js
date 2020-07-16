import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'

Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})
router.beforeEach((to, from, next) => {
    //to即将进入的目标路由对象，from当前导航正要离开的路由， next : 下一步执行的函数钩子
    if (to.path === '/login') { next() } // 如果即将进入登录路由，则直接放行
    else { //进入的不是登录路由
        if (to.meta.requiresAuth && !sessionStorage.getItem('accessToken')) { next({ path: '/login' }) }
        //下一跳路由需要登录验证，并且还未登录，则路由定向到 登录路由
        else { next() }
    }
    //如果不需要登录验证，或者已经登录成功，则直接放行
})
Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')