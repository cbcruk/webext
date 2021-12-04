import browser from 'webextension-polyfill'

export const icons = new Map([
  ['active', 'icon-toolbar'],
  ['default', 'icon-toolbar-gray'],
])

const statusMap = new Map()

export async function renderIcon(type) {
  const imageName = icons.get(type)
  const prevStatus = statusMap.get('status')

  if (prevStatus !== type) {
    await browser.action.setIcon({
      path: `${imageName}.png`,
    })

    statusMap.set('status', type)
  }
}
