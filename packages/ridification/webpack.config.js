const merge = require('@cbcruk/webext-build/merge')

module.exports = (_env, { mode }) =>
  merge(mode, {
    entry: {
      background: './source/background',
      options: './source/options',
      popup: './source/popup',
      auth: './source/auth'
    }
  })
