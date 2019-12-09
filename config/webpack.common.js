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
        return (isDevelopment ? [] : [
        ]).concat(
            [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: type,
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
        const sassLoader = (isDevelopment ? [] : [
            MiniCssExtractPlugin.loader
        ]).concat([
            {
                loader: "sass-loader"
            }
        ])
        return getStyleLoader(type).concat(sassLoader)
    }

    return {
        //development cheep-module-eval-source-map
        //production cheep-module-source-map
        entry: {
            main: './app/src/index.js'
        },
        output: {
            // publicPath: 'www.cdn.com/',远程引入时填写前缀
            filename: 'js/[name]_[hash:5].js',
            chunkFilename: 'js/[name]_[contenthash].js',
            path: path.resolve(__dirname, '../build')
        },
        resolve: {
            alias: {
                '@components': path.resolve(__dirname, '../app/src/components')
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
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            name: '[name]_[hash:5].[ext]',
                            outputPath: 'static/images/',
                            limit: 10240
                        }
                    }
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
                    collapseWhitespace: env === 'pr',
                },
                hash: true,
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[name].chunk.css'
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