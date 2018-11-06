const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function entries (globPath) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename;

    for(var i=0;i<files.length;i++){
    	entry = files[i];
    	dirname = path.dirname(entry);
    	basename = path.basename(entry, '.js');
    	entries[basename] = dirname + '/' + basename + '.js';
    }

    return entries;
}

module.exports = {
	entry: entries('./src/containers/*.js'),
	output: {
        path: path.join(__dirname, '/dist/'),
        publicPath: '/dist/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js'
	},
	module: {
		rules: [
            { 
				test: /\.js$/, 
				exclude: /node_modules/,
				use: [
					{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['env', { modules: false}]
                            ]
                        }
                    }
				]
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: ['vue-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader']
                })
            }
		]
	},
	plugins: [
        new ExtractTextPlugin('/css/[name].css'),
        new Uglify(),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(['dist'])
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'common',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    minChunks: 1
                }
            }
        },
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.css']
    }
};