const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader", // translates CSS to CommonJS
						options: {} 
					}, 
					{
						loader: "sass-loader", // compiles Sass to CSS
						options: {}
					}
				]
			},
			{
				test: /\.mp3$/,
				use: {
					loader: "file-loader"
				}
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		}),
		new MiniCssExtractPlugin({
			filename: "main.css"
		})
	]
};

module.exports = config;