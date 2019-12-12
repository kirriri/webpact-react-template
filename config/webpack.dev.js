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
        // hotOnly: true,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        name: '[name]_[hash:5].[ext]',
                        outputPath: 'static/images/',
                        public: '../',
                        limit: 10240
                    }
                }
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}