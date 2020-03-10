const merge = require('@cbcruk/webext-build/merge')

module.exports = merge({
  entry: {
    background: './source/background',
    options: './source/options',
    popup: './source/popup',
    auth: './source/auth'
  }
})
