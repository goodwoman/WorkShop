import Vue from 'vue'
import VueRouter from 'vue-router'
import HeaderPage from '../views/HeaderPage'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'HeaderPage',
        component: HeaderPage
    },
    {
        path: '/edit',
        name: 'Edit',
        meta: {
            requireAuth: true
        },
        component: () =>
            import ('../views/FullTextEdit.vue')
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: () =>
            import ('../views/ArticleDetail')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login')
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('../views/Register')
    }
]

const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    })
    // router.beforeEach((to, from, next) => {
    //     console.log("路由正被拦截")
    //     console.log()
    //         // this.$emit('changeUrl', to)
    //     next();
    // })

export default router