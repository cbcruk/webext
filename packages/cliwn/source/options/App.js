import { html } from 'htm/preact'
import useKeywords from './hooks/useKeywords'
import { Remove } from './Icons'
import * as styles from './style'

function App() {
  const { keywords, handleSubmit, handleDelete } = useKeywords()

  return html`<div class=${styles.container}>
    <form onSubmit=${handleSubmit}>
      <label for="keyword">키워드 추가</label>
      <input id="keyword" name="keyword" type="text" />
    </form>

    <div>
      ${keywords.map(
        (keyword) => html`<div key=${keyword}>
          ${keyword}
          <button
            type="button"
            class=${styles.remove}
            onClick=${() => handleDelete(keyword)}
          >
            <${Remove} />
          </button>
        </div>`
      )}
    </div>
  </div>`
}

export default App
