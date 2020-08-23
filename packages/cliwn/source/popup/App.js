import { html } from 'htm/preact'
import Loading from './Loading'
import Row from './Row'
import useSold, { RequestStatus } from './hooks/useSold'
import * as styles from './style'

function App() {
  const { posts, status } = useSold()
  const isLoading = status === RequestStatus.Loading
  const isSuccess = status === RequestStatus.Success

  return html`
    <div class=${styles.container}>
      ${isLoading && html`<${Loading} />`}
      ${isSuccess &&
      posts.map((row) => html`<${Row} key=${row.board_sn} ...${row} />`)}
    </div>
  `
}

export default App
