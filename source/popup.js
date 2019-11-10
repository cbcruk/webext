import { html, render } from 'htm/preact'
import { injectGlobal } from 'emotion'
import App from './popup/App'

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
