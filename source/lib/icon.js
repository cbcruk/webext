export const icons = new Map([
  ['active', 'icon-toolbar'],
  ['default', 'icon-toolbar-gray']
])

export function renderIcon(type) {
  const imageName = icons.get(type)

  browser.browserAction.setIcon({
    path: `${imageName}.png`
  })
}
