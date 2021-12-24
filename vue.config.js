let path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './', // 基本路径
    outputDir: 'dist', // 输出文件目录
    lintOnSave: true, // eslint-loader 是否在保存的时候检查
    // assetsDir: "static", //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    runtimeCompiler: true,  // 是否使用包含运行时编译器的 Vue 构建版本
    // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
    parallel: require("os").cpus().length > 1,
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件，一般情况不建议打开

    // 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
    },
    pwa: {}, // PWA 插件相关配置
    // 配置 webpack-dev-server 行为。
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器  http://172.11.11.22:8888/rest/XX/
        hotOnly: true, // 热更新
        proxy: {
            '/api/translate': {
                target: 'https://translate.google.cn',
                changeOrigin: true, //是否跨域
                secure: true,  // 如果是https接口，需要配置这个参数
                ws: false, //如果要代理 websockets，配置这个参数
                pathRewrite: {
                    '^/api/translate': ''
                }
            }
        }
    },
    // 第三方插件配置 https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
    pluginOptions: {}
}