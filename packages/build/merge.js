const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const SizePlugin = require('size-plugin')
const webpackMerge = require('webpack-merge')

function merge(config) {
  return webpackMerge(
    {
      devtool: 'sourcemap',
      stats: 'errors-only',
      output: {
        path: path.join(process.cwd(), 'distribution'),
        filename: '[name].js'
      },
      plugins: [
        new SizePlugin(),
        new CopyWebpackPlugin([
          {
            from: '**/*',
            context: 'source',
            ignore: ['*.js']
          }
        ])
      ],
      optimization: {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              mangle: false,
              compress: false,
              output: {
                beautify: true,
                indent_level: 2 // eslint-disable-line camelcase
              }
            }
          })
        ]
      }
    },
    config
  )
}

module.exports = merge
