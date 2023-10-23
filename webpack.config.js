const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
      },
   devServer: {
     static: './dist',
     hot: true,
     port: 8085,
     open: true,
   },
   devtool: 'inline-source-map',
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin( {
            title: 'Development',
            template: './src/index.pug',
            filename: 'index.html'
        }),
        new TerserWebpackPlugin(),
        new CssMinimizerPlugin(),
        new ESLintPlugin({files: './src/*.js'}),
        new StylelintPlugin({files: './src/*.css}'})        
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: true,
                },
            }, 
                'css-loader'
            ]
        }, 
        {
            test: /\.pug$/, 
            loader: 'pug-loader',
            options: {
				pretty: true
			}
        }]
    },
    optimization: {
        minimize: false,
        minimizer: [new TerserWebpackPlugin(),new CssMinimizerPlugin()]
    },    
  };
