const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    //development cheep-module-eval-source-map
    //production cheep-module-source-map
    devtool: 'cheep-module-eval-source-map',
    entry: {
        main: './app/src/index.js'
    },
    output: {
        // publicPath: 'www.cdn.com/',远程引入时填写前缀
        filename: 'js/[name]_[hash:5].js',
        chunkFilename: 'js/[name]_[contenthash].js',
        path: path.resolve(__dirname, './build')
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../build'),
        open: true,
        port: 8080,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            }, 
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash:5].[ext]',
                        outputPath: 'images/',
                        limit: 10240
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
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
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
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
                        
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
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
              default: {
                minChunks: 2,
                priority: -20,   // 优先级
                reuseExistingChunk: true
              }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin({
            // verbose: true,
            // cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**/*']
        }),
        new HtmlWebpackPlugin({
            template: 'app/public/index.html',
            minify: {
                collapseWhitespace: true,
            },
            hash: true,
        }),
    ]
}