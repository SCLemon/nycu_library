const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: './',
    devServer:{
        https:true,
        proxy: {
            '/verify': {
                target: 'http://127.0.0.1:3999',
            },
            '/info': {
                target: 'http://127.0.0.1:3999',
            },
            '/reset': {
                target: 'http://127.0.0.1:3999',
            },
            '/list': {
                target: 'http://127.0.0.1:3999',
            },
        }
    },
})