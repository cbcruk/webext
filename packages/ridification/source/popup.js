import { html, render } from 'htm/preact'
import { injectGlobal } from 'emotion'
import App from './popup/App'
import localStore from '@cbcruk/webext-lib/local-store'
import { openTab } from '@cbcruk/webext-lib/tabs-service'

async function init() {
  const isSuccess = await localStore.get('success')

  if (!isSuccess) {
    openTab('https://ridibooks.com/account/login')
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

    render(
      html`
        <${App} />
      `,
      document.getElementById('app')
    )
  }
}
init()
