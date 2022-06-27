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
    ]
}