import { html } from 'htm/preact'
import { css } from 'emotion'
import useNotification from './useNotification'
import Loading from './Loading'
import Notifications from './Notifications'

function App() {
  const { isFetching, notifications } = useNotification()

  return html`
    <div class=${css(styles.container)}>
      ${isFetching
        ? html`
            <${Loading} />
          `
        : html`
            <${Notifications} notifications="${notifications}" />
          `}
    </div>
  `
}

const styles = {
  container: {
    width: 300,
    boxShadow: '2px 4px 10px 0 rgba(0, 0, 0, .4)',
    fontSize: 13,
    lineHeight: 1.4,
    letterSpacing: '-0.06em',
    fontFamily: 'sans-serif'
  }
}

export default App
