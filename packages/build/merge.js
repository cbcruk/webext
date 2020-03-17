const webpackMerge = require('webpack-merge')
const common = require('./webpack.common')
const dev = require('./webpack.dev')
const prod = require('./webpack.prod')

function merge(mode, config) {
  const isDevelopment = mode === 'development'
  const devOrProd = isDevelopment ? dev : prod

  return webpackMerge(common, devOrProd, config)
}

module.exports = merge
