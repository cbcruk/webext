import { html, render } from 'htm/preact'
import { injectGlobal } from 'emotion'
import App from './popup/App'
import localStore from '@cbcruk/webext-lib/local-store'
import { openTab } from '@cbcruk/webext-lib/tabs-service'

async function main() {
  const isSuccess = await localStore.get('success')

  if (!isSuccess) {
    await openTab('https://ridibooks.com/account/login')
    return
  }

  const unreadCount = await localStore.get('unreadCount')
  const notifications = await localStore.get('notifications')

  if (unreadCount > 0 || !notifications) {
    openTab('https://ridibooks.com/notification/?from=ext')
  } else {
    injectGlobal`
      *,
      *::before,
      *::after {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
    `

    render(html` <${App} /> `, document.getElementById('app'))
  }
}

main()
