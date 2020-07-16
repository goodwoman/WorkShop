import axios from 'axios';
// import store from '@/store';
import storage from 'store';
import notification from 'ant-design-vue/es/notification';
import { VueAxios } from './axios';
// import { ACCESS_TOKEN, JWT_TOKEN_EXPIRED } from '@/store/mutation-types';
const ACCESS_TOKEN = 'Access-Token';
const JWT_TOKEN_EXPIRED = 'jwt_token_expired';

const logout = () => {
    // store.dispatch('Logout').then(() => {
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 1500);
    // });
};
axios({
    headers: {
        'Content-Type': 'application/json'
    }
})

// 创建 axios 实例
const urequest = axios.create({
    // API 请求的默认前缀
    baseURL: "/wpg/user 8001",
    timeout: 6000, // 请求超时时间,
    contentType: 'application/json'

});

// 异常拦截处理器
const errorHandler = (error) => {
    if (error.response) {
        const data = error.response.data;
        if (error.response.status === 403) {
            notification.error({
                message: '拒绝访问',
                description: data.message,
            });
        }
        if (error.response.status === 401) {
            notification.error({
                message: '未授权，请登录',
                description: '授权失败，请重新登录',
            });
            logout();
        }
    }
    return Promise.reject(error);
};

// request interceptor
urequest.interceptors.request.use((config) => {  
    config.headers  =   {     // authorization: store.state.admin.token
             // 'Content-Type': 'application/x-www-form-urlencoded'
             'Content-Type':   'application/json;charset=UTF-8'   };
    console.log("正在拦截请求")
    console.log(config)
    return config;
}, errorHandler);

// response interceptor
urequest.interceptors.response.use((response) => {
    console.log(response);
    return response
        // let dataAxios = response.data;
        // const { status, errorCode } = dataAxios;

    // if (status === 'complete') {
    //     return dataAxios;
    // } else if (errorCode === JWT_TOKEN_EXPIRED) {
    //     notification.error({
    //         message: '请求出错',
    //         description: 'token 失效，退出重新登录',
    //     });
    //     logout();
    // } else {
    //     notification.error({
    //         message: '请求出错',
    //         description: dataAxios.errorMessage,
    //     });
    // }
}, errorHandler);

const installer = {
    vm: {},
    install(Vue) {
        Vue.use(VueAxios, urequest);
    },
};

export default urequest;

export { installer as VueAxios, urequest as axios };