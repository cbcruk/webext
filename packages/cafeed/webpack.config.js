const merge = require('@cbcruk/webext-build/merge')

module.exports = merge({
  entry: {
    background: './source/background',
    popup: './source/popup'
  }
})
