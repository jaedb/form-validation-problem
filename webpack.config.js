process.traceDeprecation = true;
module.exports = (env, argv) => {

	var development_mode = (argv.mode === 'development');

	var webpack = require('webpack');
	var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
	var MiniCssExtractPlugin = require("mini-css-extract-plugin")
	var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

	var node_dir = __dirname + '/node_modules';
	var output_dir = __dirname +"/dist"

	var config = {
		mode: process.env.NODE_ENV,
		context: __dirname,
		entry: "./src/js/index.js",

		// Include source maps in non-production build.
		// All loaders need to produce sourcemaps, this line ultimately defines
		// the resultant buildout.
		devtool: (development_mode ? 'source-map' : false),
		output: {
			path: output_dir,
			filename: (development_mode ? 'index.js' : 'index.min.js')
		},
		module: {
			rules: [
				{
					test: require.resolve('jquery'),
	        		exclude: [
	        			/node_modules/
	        		],
					use: 'expose-loader?jQuery!expose?$'
				},
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								url: false,
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				}
			]
		},
		plugins: [
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.ProvidePlugin({
			    $: "jquery",
			    jQuery: "jquery",
			    "window.jQuery": "jquery"
			}),
			new MiniCssExtractPlugin({
				path: output_dir,
				filename: (development_mode ? 'index.css' : 'index.min.css'),
				sourceMap: true
			})
		],
		optimization: {
			minimize: !development_mode,
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
					sourceMap: true
				}),
				new OptimizeCSSAssetsPlugin({})
			]
		},
	};

	return config;
}