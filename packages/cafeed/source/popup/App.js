import { html } from 'htm/preact'
import { css } from 'emotion'
import useMarketFeeds from './useMarketFeeds'
import Feed from './Feed'
import Loading from './Loading'
import { palette } from './colors'

function App() {
  const { feeds, status } = useMarketFeeds()
  const isLoading = status === 'loading'

  return html`
    <div class=${css(styles.container)}>
      ${isLoading &&
        html`
          <${Loading} />
        `}
      ${feeds.map(
        feed => html`
          <${Feed} key=${feed.articleId} ...${feed} />
        `
      )}
    </div>
  `
}

const styles = {
  container: {
    overflow: 'auto',
    width: 300,
    height: 400,
    backgroundColor: palette.background,
    boxShadow: '2px 4px 10px 0 rgba(0, 0, 0, .4)',
    fontSize: 13,
    lineHeight: 1.4,
    letterSpacing: '-0.06em',
    fontFamily: 'sans-serif',
    color: 'rgba(255, 255, 255, 0.6)'
  }
}

export default App
