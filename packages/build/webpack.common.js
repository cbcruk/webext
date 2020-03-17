const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SizePlugin = require('size-plugin')

module.exports = {
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
  ]
}
