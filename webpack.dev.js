/**
 * Created by Tesla on 2017/11/21/0021.
 */

let webpack = require('webpack'),
	path = require('path'),
	merge = require('webpack-merge'),
	base = require('./webpack.base.js');

module.exports = merge(base, {
	module: {
		rules: [
			{
				test: /(\.scss|\.css)$/,
				use: [{
					loader: "style-loader" // 将 JS 字符串生成为 style 节点
				}, {
					loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
				}, {
					loader: "sass-loader" // 将 Sass 编译成 CSS
				}],
				exclude: /node_modules/
			}
		]
	},
	devServer : {
		contentBase: './src/',
		host: '192.168.1.103',
		port: 3000,
		hot: true,
		compress: true
	} ,
	devtool: "cheap-source-map",
	plugins:[
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		new webpack.HotModuleReplacementPlugin()
	]

});
