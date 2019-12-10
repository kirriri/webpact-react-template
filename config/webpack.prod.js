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
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
            // cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**/*']
        }),
    ]
}