import request from '@/utils/request';

const api = {
    list: '/selectAllNotPage',
    heart: '/selectByKind/1',
    techologylist: '/selectByKind/2',
    policylist: '/selectByKind/3',
    upload: '/insert',
    articleid: '/selectAllQueryById',
    keywords: '/selectByQuery',
    submitComment: '/insert',
    deleteArticle: '/delete'

};
//getHeartList getTechologyList getPolicyList getkeywords
export default api;
export function getAllList(parameter) {
    return request({
        url: api.list,
        method: 'get',
        params: parameter
    });
}

export function getHeartList(parameter) {
    return request({
        url: api.heart,
        method: 'get',
        params: parameter
    });
}
export function getTechologyList(parameter) {
    return request({
        url: api.techologylist,
        method: 'get',
        params: parameter
    });
}
export function getPolicyList(parameter) {
    return request({
        url: api.policylist,
        method: 'get',
        params: parameter
    });
}
export function upload(parameter) {
    return request({
        url: api.upload,
        method: 'post',
        data: parameter
    });
}
export function submitComment(parameter) {
    return request({
        url: api.submitComment,
        method: 'post',
        data: parameter
    });
}
export function getDetail(id, parameter) {
    return request({
        url: api.articleid + '/' + id,
        method: 'get',
        params: parameter
    });
}
export function deleteArticle(id, parameter) {
    return request({
        url: api.deleteArticle + '/' + id,
        method: 'get',
        params: parameter
    });
}
export function getkeywords(parameter) {
    return request({
        url: api.keywords,
        method: 'post',
        data: parameter
    });
}

// export function getRoleList(parameter) {
//     return request({
//         url: api.role,
//         method: 'get',
//         params: parameter
//     });
// }

// export function getServiceList(parameter) {
//     return request({
//         url: api.service,
//         method: 'get',
//         params: parameter
//     });
// }

// export function getPermissions(parameter) {
//     return request({
//         url: api.permissionNoPager,
//         method: 'get',
//         params: parameter
//     });
// }

// export function getOrgTree(parameter) {
//     return request({
//         url: api.orgTree,
//         method: 'get',
//         params: parameter
//     });
// }

// id == 0 add     post
// id != 0 update  put
// export function saveService(parameter) {
//     return request({
//         url: api.service,
//         method: parameter.id === 0 ? 'post' : 'put',
//         data: parameter
//     });
// }

// export function saveSub(sub) {
//     return request({
//         url: '/sub',
//         method: sub.id === 0 ? 'post' : 'put',
//         data: sub
//     });
// }