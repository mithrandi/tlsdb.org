'use strict'

const webpack = require('webpack')
    , path = require('path')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    , autoprefixer = require('autoprefixer')

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'es6-promise',
        'whatwg-fetch',
        path.resolve(__dirname, 'src', 'index.js')
    ],
    devtool: 'cheap-module-source-map',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    resolve: {
        alias: {
            root: path.resolve(__dirname, 'src'),
            npm: path.resolve(__dirname, 'node_modules'),
            style_root: path.resolve(__dirname, 'styles'),
        },
    },
    postcss: [
        autoprefixer({
            browsers: ['last 3 versions'],
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /[\/\\]node_modules[\/\\]/,
                include: path.resolve(__dirname, 'src'),
                loaders: ['babel-loader'],
            },
            {
                test: /\.json$/,
                exclude: /[\/\\]node_modules[\/\\]/,
                include: path.resolve(__dirname, 'src'),
                loaders: ['json-loader'],
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader?sourceMap',
                    'postcss-loader',
                    'resolve-url-loader',
                    'sass-loader?sourceMap'
                ],
            },
            {
                test: /\.(woff|woff2)$/,
                loaders: ['url-loader?limit=10000'],
                options: {
                    name: 'fonts/[hash].[ext]',
                    limit: 5000,
                    mimetype: 'application/font-woff',
                },
            },
            {
                test: /\.(ttf|eot|svg)$/,
                loaders: ['file-loader'],
                options: {
                    name: 'fonts/[hash].[ext]',
                },
            },
        ]
    },
    devServer: {
        inline: true,
        hot: true,
        contentBase: './public',
        historyApiFallback: true,
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'template.html')
        }),
    ],
}
