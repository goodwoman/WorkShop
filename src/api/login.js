import urequest from '@/utils/urequest';

const userApi = {
    getYzm: ':/getYzm',
    login: ':/yzmLogin',
    register: '/register',
    getstars: '/star',
    getlike: '/like'
        // get my info
};

export function getYzm(parameter) {
    return urequest({
        url: userApi.getYzm + "?phonenum=" + parameter,
        method: 'get',
    });
}
export function login(phone, code) {
    return urequest({
        url: userApi.login + "?phonenum=" + phone + "&yzm=" + code,
        method: 'post',
    });
}
export function getMyStar() {
    return urequest({
        url: userApi.login + "/?phonenum=" + phone + "&yzm=" + code,
        method: 'post',
    });
}
export function register(parameter) {
    return urequest({
        url: userApi.register,
        method: 'post',
        data: parameter
    });
}