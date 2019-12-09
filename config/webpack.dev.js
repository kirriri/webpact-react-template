const path = require('path')
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    //development cheep-module-eval-source-map
    devtool: 'cheep-module-eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../build'),
        open: true,
        port: 8080,
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}