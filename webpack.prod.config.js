'use strict'

const webpack = require('webpack')
    , path = require('path')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    , autoprefixer = require('autoprefixer')
    , GitRevisionPlugin = require('git-revision-webpack-plugin')
    , ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: [
        'es6-promise',
        'whatwg-fetch',
        path.resolve(__dirname, 'src', 'index.js')
    ],
    devtool: 'source-map',
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
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader?sourceMap!postcss-loader!resolve-url-loader!sass-loader?sourceMap')
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
            'VERSION': JSON.stringify(new GitRevisionPlugin().version()),
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                dead_code: true
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('styles/styles.css'),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'template.html')
        }),
    ],
}
