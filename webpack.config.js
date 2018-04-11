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
				test: /\.(scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: "css-loader", options: {} }, // translates CSS to CommonJS
					{ loader: "postcss-loader", options: {} },
					// {
					// 	loader: "postcss-loader",
					// 	options: {
					// 		ident: "postcss",
					// 		plugins: (loader) => [
					// 			require('autoprefixer')({ browsers: ['defaults']})
					// 		]
					// 	}
					// },
					{ loader: "sass-loader", options: {} } // compiles Sass to CSS
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