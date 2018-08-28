const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isDEV = process.env.NODE_ENV === 'development'

const config = {
    mode:'development',
    entry:path.join(__dirname,'../src/index.js'),
    output:{
        filename:'[name].js',
        chunkFilename:'[name].js',
        path:path.join(__dirname,'../dist'),
        publicPath:'/',
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader: 'babel-loader',
                exclude:path.join(__dirname,'../node_modules')
            },
            {
                test: /\.css$/,
                exclude: path.join(__dirname, '../node_modules'),
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            import:true,
                            importLoaders:1
                        }
                    },
                ]
            },
            {
                test:/\.less$/,
                use:[
                    { loader:  'style-loader'},
                    { loader: 'css-loader'},
                    { loader:'less-loader'}
                ]
            },
            {
                test: /\.(css|less|s[ac]ss)$/,
                include: path.join(__dirname, '../node_modules'),
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options:{
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|otf|ttf)$/i,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: '[path][name].[ext]',
                        outputPath: 'assets/'
                    }
                }]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'../src/index.html')
        })
    ]
}
if (isDEV) {
    config.entry = {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, '../src/index.js')]
    },
        config.devServer = {
            port: 7000,
            contentBase: path.join(__dirname, '../dist'),
            hot: true,
            publicPath: "/",
            historyApiFallback: {
                index: '/index.html'
            },
        }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())

}
module.exports = config;