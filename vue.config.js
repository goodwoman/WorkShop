module.exports = {
    // 修改的配置 配置 proxy 服务器代理
    // "/api/getok.php"
    // http://122.51.238.153/getok.php
    devServer: {
        proxy: {
            //  如果你的地址 以 /api 开头 他就会请求到 http://122.51.238.153
            '/article': {
                target: 'http://10.200.5.244:10001/',
                changeOrigin: true, // changeOrigin为true 本地会虚拟一个服务器接受你的请求并代你发送；
                // ws: true,
                // pathRewrite: {
                //     '^/article': '' // 请求的时候 /api就会替换成 ''
                // }
            },
            '/file': {
                target: 'http://10.200.5.244:10003/',
                changeOrigin: true, // changeOrigin为true 本地会虚拟一个服务器接受你的请求并代你发送；
                // ws: true,
                // pathRewrite: {
                //     '^/article': '' // 请求的时候 /api就会替换成 ''
                // }
            },
            '/wpg/user': {
                target: 'http://10.200.5.209:8001/',
                changeOrigin: true,
            },
            '/comment': {
                target: 'http://10.200.5.244:10002/',
                changeOrigin: true,
            }
        }
    }
}