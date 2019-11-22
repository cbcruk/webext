const icons = ['icon-toolbar-gray', 'icon-toolbar']

export function renderIcon(isDisabled) {
  browser.browserAction.setIcon({
    path: `${icons[~~isDisabled]}.png`
  })
}
