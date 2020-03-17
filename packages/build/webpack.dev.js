const ExtensionReloader = require('webpack-extension-reloader')

module.exports = {
  plugins: [
    new ExtensionReloader({
      reloadPage: true,
      entries: {
        extensionPage: 'popup'
      }
    })
  ]
}
