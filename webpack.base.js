/**
 * Created by Tesla on 2017/11/21/0021.
 */

/**
 * Created by Tesla on 2017/11/3/0003.
 */

var path = require('path'),
	glob = require('glob'),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	publicDir = path.resolve(__dirname, 'build');

var setting = {
	entry: getEntries('./src/js'),

	output: {
		filename: 'js/[name].js',
		path: publicDir
	},

	module: {
		rules: [
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						name: 'images/[name].[ext]',
						limit: 1,
					}
				}]
			},
			{
				test: /\.woff(2)?(\?t=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: 'url-loader',
						options:
							{
								mimetype: 'application/font-woff',
								name: 'fonts/[name].[ext]',
								limit: 1,
							}
					}
				]
			},
			{
				test: /\.(ttf|eot|svg|otf)(\?t=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: 'url-loader',
						options:
							{
								mimetype: 'application/font-woff',
								name: 'fonts/[name].[ext]',
								limit: 1,
							}
					}
				],
				exclude: /node_modules/
			},
			{
				test: require.resolve('jquery'),
				use: [{
					loader: 'expose-loader',
					options: 'jQuery'
				},{
					loader: 'expose-loader',
					options: '$'
				}]
			}
		]
	},

	plugins: [
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, './src/css/article.css'),
				to: path.resolve(__dirname, './build/css/article.css')
			},
			{
				from: path.resolve(__dirname, './src/images'),
				to: path.resolve(__dirname, './build/images')
			},
			{
				from: path.resolve(__dirname, './src/oldbrowse'),
				to: path.resolve(__dirname, './build/oldbrowse')
			},
			{
				from: path.resolve(__dirname, './src/plugs'),
				to: path.resolve(__dirname, './build/plugs')
			},
			{
				from: path.resolve(__dirname, './src/video'),
				to: path.resolve(__dirname, './build/video')
			}
		]),
		new webpack.optimize.CommonsChunkPlugin({
			names: 'common',
			minChunks: 2
		})
	]
}

function getEntries(entryDir){
	var files = glob.sync(entryDir.replace(/\/$/, '') + '/*.js'),
		entries = {};
	files.forEach(function(path){
		var fileName = path.match(/\w+\.js/, 'g')[0].replace(/\.js/, '');
		entries[fileName] = path;
	});
	return entries;
}

getTemplate('./src');

function getTemplate(templateDir){
	var files = glob.sync(templateDir.replace(/\/$/, '') + '/*.html');
	files.forEach(function(item){
		var fileName = item.match(/\w+\.html/, 'g')[0].replace(/\.html/, '');
		var page = new HtmlWebpackPlugin({
			title: '歌中歌_',
			filename: fileName + '.html',
			template: item,
			inject: 'body',
			hash: true,
			chunks: ['common', fileName],
		});
		setting.plugins.push(page);
	});
}

module.exports = setting;