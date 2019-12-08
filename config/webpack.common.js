const productionConfig = require('./webpack.prod')
const developmentConfig = require('./webpack.dev')
const merge = require('webpack-merge')

const generateConfig = env => {
    
}

module.exports = env => {
    let config = env === 'development'
        ? developmentConfig
        : productionConfig
    return merge(generateConfig(env), config)
}