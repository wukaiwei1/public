const path = require("path")
// 引入自动生成 html 的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 自动删除webpack目录下的dist文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


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
            }
        ]
    }
}