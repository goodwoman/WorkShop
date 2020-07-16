import urequest from '@/utils/urequest';

const userApi = {
    getYzm: '/getYzm',
    login: '/yzmLogin',
    TokenLogin: '/sso/tokenLogin',
    Logout: '/sso/logout',
    CheckToken: '/sso/checkToken',
    ChangePassword: '/sysUser/changePassword',
    // get my info
    UserMenu: '/sysUser/getMenu'
};

export function getYzm(parameter) {
    return urequest({
        url: userApi.getYzm + " /?phonenum=" + parameter,
        method: 'get',
    });
}
export function login(phone, code) {
    return urequest({
        url: userApi.login + "/?phonenum=" + phone + "&yzm=" + code,
        method: 'post',
    });
}

export function tokenLogin(parameter) {
    return urequest({
        url: userApi.TokenLogin,
        method: 'post',
        data: parameter
    });
}

export function changePassword(parameter) {
    return urequest({
        url: userApi.ChangePassword,
        method: 'post',
        data: parameter
    });
}

export function logout() {
    return urequest({
        url: userApi.Logout,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    });
}

export function checkToken() {
    return urequest({
        url: userApi.CheckToken,
        method: 'get'
    });
}

export function getCurrentUserNav() {
    return urequest({
        url: userApi.UserMenu,
        method: 'get'
    });
}