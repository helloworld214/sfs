/**
 * Created by Tesla on 2017/11/21/0021.
 */

let path = require('path'),
	webpack = require('webpack'),
	merge = require('webpack-merge'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	base = require("./webpack.base");

module.exports =merge(base, {
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [{
					loader:'html-loader',
					options:{
						minimize: false,
						htmlLoader: {
							ignoreCustomFragments: [/\{\{.*?\}\}/],
							root: path.resolve(__dirname, './src/images/'),
							attrs: ['img:src']
						}
					}
				}],
				exclude: /node_modules/
			},
			{
				include: path.resolve(__dirname, './src/scss'),
				test: /\.scss$/,
				use: ExtractTextPlugin.extract(
					{
						fallback: 'style-loader',
						use: [
							'css-loader',
							"sass-loader"
						],
						publicPath: '../'
					}
				)
			},
			{
				include: [path.resolve(__dirname, './src/css')],
				test: /\.css$/,
				use: ExtractTextPlugin.extract(
					{
						fallback: 'style-loader',
						use: [
							'css-loader'
						],
						publicPath: '../'
					}
				)
			}
		]
	},
	devtool: 'source-map',
	plugins: [
		new CleanWebpackPlugin(['build']),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
		}),
		new ExtractTextPlugin('css/style.css'),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings:false
			},
			except: ['$super', '$', 'exports', 'require']
		}),
		new webpack.LoaderOptionsPlugin({minimize:true})
	]
});
