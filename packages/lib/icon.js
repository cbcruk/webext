import browser from 'webextension-polyfill'

export const icons = new Map([
  ['active', 'icon-toolbar'],
  ['default', 'icon-toolbar-gray']
])

export async function renderIcon(type) {
  const imageName = icons.get(type)

  await browser.browserAction.setIcon({
    path: `${imageName}.png`
  })
}
