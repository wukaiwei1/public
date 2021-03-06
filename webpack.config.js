const path = require("path")
// 引入自动生成 html 的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 自动删除webpack目录下的dist文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// vue插件
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    //解决一下警告
    mode: 'development',
    entry: "./src/main.js", // 入口
    output: {
        path: path.resolve(__dirname, "dist"), // 出口路径 绝对路径
        filename: "bundle.js" // 出口文件名
    },
    plugins: [
        // 自动生成html文件
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html"
        }),
        // 删除的是ouput path 里配置的那个输出文件的文件夹
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ],
    devServer: {
        port: 3000, // 端口号
        open: true
    },
    // loader 加载器配置
    module: {
        rules: [ // loader的规则
            {
                test: /\.css$/, // 匹配所有的css文件
                // loader 执行的顺序： use数组里从右向左运行
                // 先用 css-loader 让webpack能够识别 css 文件的内容并打包
                // 再用 style-loader 将样式, 把css插入到dom中
                use: ["style-loader", "css-loader"]
            },
            { // 配置处理less
                test: /\.less$/, // 匹配以 less结尾的文件
                // css-loader 把css 文件转换成 webpack 可以识别的文件
                // style-loader 把css代码 插入到dom中
                // loader 执行 从右往左
                // less-loader 将less 文件转换成 webpack可以识别的代码
                // less 讲 less 语法 转换成 css
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            // 图片处理
            {
                test: /\.(png|jpg|gif)$/i,
                // 自动选择，大于2k的图片用直接复制到dist文件下，小于8k的转换为base64格式
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 2 * 1024,
                    },
                },
                generator: {
                    filename: '[hash:6][txt]'
                }
            },
            // 字体处理
            {// 字体图标 不配置也可以  css loader 也会处理的
                // webpack 5
                test: /\.(eot|svg|ttf|woff|woff2)$/, // 匹配所有的字体图标的文件
                type: 'asset', // 文件直接输出
                generator: { // 生产器
                    filename: 'font-[name].[hash:6][ext]'
                },
                parser: { // 解析器 规则
                    dataUrlCondition: { // dataUrl的情况
                        maxSize: 1 * 1024,
                        // maxSize 限制最大值
                    },
                },
            },
            // 高版本js语法打包成低版本js语法
            {
                test: /\.js$/,
                exclude: /(node_modules)/, // 排除在外 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'] // 预设:转码规则(用bable开发环境本来预设的)
                    }
                }
            },
            // 处理vue文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    }
}