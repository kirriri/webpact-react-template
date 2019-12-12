const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const productionConfig = require('./webpack.prod')
const developmentConfig = require('./webpack.dev')
const merge = require('webpack-merge')
const path = require('path')

const generateConfig = env => {
    
    const isDevelopment = env === 'development'

    const scriptLoader = [
        'babel-loader'
    ].concat(isDevelopment
        ? []
        : []
    )

    const getStyleLoader = type => {
        return (isDevelopment ? [
            {
                loader: 'style-loader'
            }
        ] : [
            {
                loader: MiniCssExtractPlugin.loader
            }
        ]).concat(
            [
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: type,
                        url: false
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            require('autoprefixer'),
                            require('precss'),
                            require('postcss-flexbugs-fixes')
                        ],
                        browser: ['last 10 versions']
                    }
                    
                }
            ]
        )
    }

    const getSassStyleLoader = type => {
        return getStyleLoader(type).concat([{loader: "sass-loader"}])
    }

    return {
        //development cheep-module-eval-source-map
        //production cheep-module-source-map
        entry: {
            main: './app/src/index.js'
        },
        resolve: {
            alias: {
                '@components': path.resolve(__dirname, '../app/src/components'),
                // './static': '../public/static'
            }
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: [path.resolve(__dirname, '../app/src')],
                    exclude: /node_modules/,
                    use: scriptLoader
                }, 
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        outputPath:'static/fonts/',
                        name: '[name]_[hash:5].[ext]'
                    }
                },
                {
                    test: /\.css$/,
                    use: getStyleLoader(1)
                },
                {
                    test: /\.scss$/,
                    use: getSassStyleLoader(2)
                }
            ]
        },
        optimization: {
            usedExports: true,
            runtimeChunk: {
                name: 'runtime'
            },
            splitChunks: {
                chunks: "all",
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,  // 匹配node_modules目录下的文件
                        priority: -10   // 优先级
                    },
                }
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'app/public/index.html',
                minify: {
                    collapseWhitespace: env === 'production',
                },
                hash: true,
            }),
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].css',
                chunkFilename: 'static/css/[name].chunk.css'
            })
        ]
    }
}

module.exports = () => {
    const env = process.env.NODE_ENV
    let config = env === 'development'
        ? developmentConfig
        : productionConfig
    return merge(generateConfig(env), config)
}