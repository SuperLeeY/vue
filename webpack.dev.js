const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

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
                use: ['style-loader', 'css-loader']
            }
		]
	},
	plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/src/pages/index.html'),
            filename: '/pages/index.html'
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.js', '.vue', '.css'],
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    devServer: {
        host: '10.222.32.52',
        port: '8080',
        open: true,
        inline: true
    }
};