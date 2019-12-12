const { CleanWebpackPlugin } = require ('clean-webpack-plugin')
const path = require('path')

module.exports = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    output: {
		filename: 'js/[name].[contenthash].js',
        chunkFilename: 'js/[name].[contenthash].js',
        path: path.resolve(__dirname, '../build')
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'images/[name].[ext]',
                            outputPath: 'static/',
                            publicPath: '../',
                            limit: 10240
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
            // cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**/*']
        }),
    ]
}