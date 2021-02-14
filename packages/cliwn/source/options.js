import { html, render } from 'htm/preact'
import { injectGlobal } from 'emotion'
import { renderCount } from '@cbcruk/webext-lib/badge'
import App from './options/App'

function main() {
  renderCount(0)

  injectGlobal`
    :root {
      --color-primary: #bb86fc;
      --color-primary-variant: #3700b3;
      --color-secondary: #03dac6;
      --color-background: #121212;
      --color-surface: #121212;
      --color-error: #cf6679;
      --color-font-title: rgba(255, 255, 255, 0.87);
      --color-font-body: rgba(255, 255, 255, 0.6);
      --color-outline: rgba(255, 255, 255, 0.12);
    }

    *,
    *::before,
    *::after {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    body {
      background-color: var(--color-background);
      font-size: calc(14 / (16/14) * 1px);
      font-family: sans-serif;
      line-height: 1.4;
      letter-spacing: -0.06em;
    }
  `

  render(html`<${App} /> `, document.getElementById('app'))
}
main()
